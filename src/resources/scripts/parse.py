#!/usr/bin/python
import re
import sys
from order import order
from functools import reduce
from country_list import countries_for_language

priority_countries = ['Nepal', 'India', 'China', 'Ukraine', 'Turkey']
countries = dict(countries_for_language('en'))
countries['US'] += ' of America'
del countries['UN']  # not needed
countries = list(
    map(lambda c: c.lower(), priority_countries+list(countries.values())))
# country_codes = list(countries.keys())
# countries = dict(list(zip(country_names, country_codes)))

imgurl_base = 'https://img.agdial.in/images/'
id_prefix = r'(id|prefix)\s*:\s*(.*)'
phone_regex = r'(([0-9\+ \-]+,?)+)'
special_data = {'Website': r'((https?\:\/\/)?([0-9a-z\.-]+)\.([a-z\.]{2,6})(\/[\/\-a-zA-Z0-9#\.\?\&\=]+\/?)?)',
                'Whatsapp': phone_regex, 'Youtube': r'((https:\/\/www\.youtu.+)+)',
                'Phone': phone_regex, 'customer care': phone_regex, 'Fax': phone_regex,
                'Email': r"(([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)\s*,?)+"}
excl_page_specials = ['Phone', 'customer care', 'Email',  'Fax']
tokens_patt = r'^([^:]+):\s*\[(.*)\]\s*$'
# whatsapp r'((+?[0-9 ]+{10,})+)'


def country_case(country):
    return ' '.join(list(map(lambda c: c.lower()[0].upper()+c.lower()[1:], country.lower().split(' '))))


def find_country(data):
    # data = data.replace(',', '')
    # data = data.replace('.', ' ')
    data = data.lower()
    for country in countries:
        if re.search(r'\b'+country+r'\b', data):
            return country_case(country)


def pl(line):
    try:
        return re.findall(tokens_patt, line)[0]
    except Exception:
        pass
        # print('Exception for premium entry, linestr : ', line)


def parse_pvals(pval):
    plines = filter(None, pval.split('\n'))
    dct = dict(list(filter(None, map(pl, plines))))
    # print(dct)
    return dct


def get_idprefix(pvals_tpl, pval):
    patt = id_prefix
    tpl = re.findall(patt, pval)[0] if re.search(patt, pval) else None

    if type(tpl) is tuple:
        if type(pvals_tpl) is tuple:
            return pvals_tpl, tpl
        return tpl
    return pvals_tpl

   # premium_vals = {
    #     r'\[image\s*:': [[r'\s*([0-9]+),?\s*', '<img class="pr_img" src="'+imgurl_base + img_pr + r'-\1.jpg" alt="'+img_pr+r'-\1"  />'],
    #                      [r'\[image\s*:|\]', '']],
    #     r'\[image-list\s*:': [[r'\s*([0-9]+),?\s*', '<img class="pr_lst_img" src="'+imgurl_base + img_pr + r'-\1.jpg" alt="'+img_pr+r'-\1"  />'],
    #                           [r'\[image-list\s*:', '<div class="pr_lst">'],
    #                           [r'\]', '</div>']],
    #     id_prefix: [[id_prefix, '']]
    # }


def parse_premium_entry(pr_entry):
    if len(pr_entry) <= 1:
        return
    entry_vals = list(
        filter(None, map(lambda x: x.strip(), pr_entry.split('##'))))

    id_and_prefix = dict(reduce(get_idprefix, entry_vals, None))

    if not id_and_prefix['id'] or not id_and_prefix['prefix']:
        return print("Invalid id or prefix: ", id_and_prefix)
    pr_entry = id_and_prefix
    pr_entry['image'] = imgurl_base+id_and_prefix['id']+'-w.jpg'
    content = list(
        filter(None, map(lambda entry_val: parse_pvals(entry_val), entry_vals)))
    pr_entry['content'] = content
    pr_entry = {id_and_prefix['id']: dict(pr_entry.items())}
    return pr_entry


def process_premium_data(file='../content/premium_data.txt'):
    with open(file) as f:
        pr_data = filter(None, map(lambda x: x.strip(), f.read().split('$$')))
        final_entries = list(filter(None, map(parse_premium_entry, pr_data)))
        final_dict = {}
        for e in final_entries:
            try:
                final_dict.update(e)
            except Exception as ea:
                print(ea, 'at line ', sys.exc_info()[2].tb_lineno)
        return final_dict


def extract_special_data(data_list, type_=None):
    specials_dict = {}
    to_remove = []
    for i in range(len(data_list)):
        for s in special_data.items():
            try:
                if re.search(s[0], data_list[i], flags=re.IGNORECASE):
                    testval = 0
                    testval += -2 if s[0] in excl_page_specials else 0
                    testval += 2 if type_ == 'premium' else 0
                    if testval >= 0:
                        l = list(
                            filter(None, map(lambda x: x[0].strip() if len(x) else None, re.findall(s[1], data_list[i], flags=re.IGNORECASE))))
                        specials_dict[s[0]] = list(
                            map(lambda x: x.strip('.'), l))
                        to_remove.append(i)
            except Exception as e:
                print(e, 'at line ', sys.exc_info()[2].tb_lineno)
                print(data_list[i], s[1], specials_dict)
    for i in sorted(to_remove, reverse=True):
        del data_list[i]
    return specials_dict


def parse_entry(entry):
    entry_data = entry.split('##')
    name_data = list(
        map(lambda x: x.strip(), filter(None, entry_data[0].split('/'))))
    name = name_data[-1]
    type_ = ''
    catcode = None
    country = None
    id = '-'.join(name_data[0:-1])
    path = '-'.join(name_data[0:-2])

    name_type = re.match(r'(.*)\[([^\]]+)\]', name)
    name = name_type.groups()[0] if name_type else name
    type_ = name_type.groups()[1] if name_type else type_

    imgurl = imgurl_base+id+'.jpg'
    if re.search('CAT', id):
        try:
            catcode = '-'.join(name_data[1:-1])
            tmp = '-'.join(name_data[1:-2])
            path = tmp if tmp else path
            serial_num = order.index(catcode)
            if type(serial_num) is int:
                id = 'CAT-' + "{:0>2}".format(serial_num+1) + '-' + catcode
        except Exception as e:
            print(e, 'at line ', sys.exc_info()[2].tb_lineno)

    data_list = list(map(lambda x: x.strip(), entry_data[1:]))
    entry_dict = {"id": id, "name": name, "path": path,
                  "type": type_, "image": imgurl, "content": data_list}
    if catcode:
        entry_dict.update({"catcode": catcode})
    else:
        try:
            #re.match(r'([A-Za-z &\. \-]+)',str).groups()[0].strip()
            # country = re.match(
                # r'([A-Za-z &\. \-]+)', data_list[0].split(',')[-1]).groups()[0].strip()
            country = find_country(' '.join(data_list))
        except Exception as ee:
            print('while looking for a country: ', ee,
                  'at line ', sys.exc_info()[2].tb_lineno)
            print(data_list[0],
                  '\n=============================================')

    specials = extract_special_data(data_list, type_)
    if specials:
        entry_dict.update(specials)
    if country:
        entry_dict.update({"country": country})

    entry_dict = dict(
        map(lambda x: (x[0], x[1].strip()) if type(x[1]) is str else x, entry_dict.items()))
    entry_dict = {id: dict(entry_dict.items())}
    return entry_dict


def handle_entries(entries):
    # return reduce(lambda x, y: x.update(y), list(map(lambda e: parse_entry(e), entries)))
    if not entries:
        print("error: No entries found!")
        return None
    entries = list(map(lambda e: parse_entry(e), entries))
    final_dict = {}
    for e in entries:
        try:
            final_dict.update(e)
        except Exception as ea:
            print(ea, 'at line ', sys.exc_info()[2].tb_lineno)

    return final_dict


def parse_file(fname):
    with open(fname) as f:
        data = f.read()
        data = re.sub('\\n|\\xa0', '', data)
        entries = list(filter(None, data.split('$$')))
        return entries


def parse(filename):
    if(filename):
        return handle_entries(parse_file(filename))


def main():
    process_premium_data()
    entries = parse('../content/all_listings.txt')
    list(map(lambda x: print(x, '\n\n'), entries.items()))


if __name__ == "__main__":
    main()
