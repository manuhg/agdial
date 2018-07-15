#!/usr/bin/python
import re
import sys
# from functools import reduce

imgurl_base = 'https://img.agdial.in/images/'


def parse_file(fname):
    with open(fname) as f:
        data = f.read()
        data = re.sub('\\n|\\xa0', '', data)
        entries = list(filter(None, data.split('$$')))
        return entries


special_data = {'Website': r'((https?:\/\/)?([0-9a-z\.-]+)\.([a-z\.]{2,6})(\/[\/\-a-zA-Z0-9#\.\?\&\=]+\/?)?)',
                'Whatsapp': r'(+?[0-9 ]+{10,})', 'Youtube': r'(https:\/\/www\.youtu.+)'}


def extract_special_data(data_list):
    specials_dict = {}
    for data in data_list:
        for s in special_data.items():
            try:
                if re.search(s[0], data):
                    l = list(
                        filter(None, map(lambda x: x[0].strip() if x and x[0] else None, re.findall(s[1], data))))
                    if l:
                        specials_dict[s[0]] = l
                        data_list.remove(data)
            except Exception as e:
                print(e, 'at line ', sys.exc_info()[2].tb_lineno)

    return specials_dict


def parse_entry(entry):
    ed = entry.split('##')
    ns = list(filter(None, ed[0].split('/')))
    name = ns[-1]
    catcode = ''
    type_ = ''
    id = '-'.join(ns[0:-1])
    path = '-'.join(ns[0:-2])
    nsp = ns[-1].split(':')
    if len(nsp) > 1:
        name = nsp[0]
        catcode = nsp[1]
        pc = catcode.split('-')
        if len(pc) > 1:
            path = pc[0]
    id = id.strip()
    n_c = re.match('(.*)\[([^\]]+)\]', name)
    if n_c:
        n_c = n_c.groups()
        print(n_c)
        name = n_c[0]
        type_ = n_c[1]
    imgurl = imgurl_base+id+'.jpg'
    data_list = list(map(lambda x: x.strip(), ed[1:]))
    entry_dict = {"name": name, "path": path,
                  "image": imgurl, "content": data_list}
    specials = extract_special_data(data_list)
    if specials:
        print('\n\n\n', specials, '\n', data_list)
        entry_dict.update(specials)

    for v in locals().items():
        if v[0] in ['catcode', 'type_'] and v[1]:
            entry_dict.update({v[0]: v[1]})
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


def parse(filename):
    if(filename):
        return handle_entries(parse_file(filename))


def main():
    entries = parse('../content/alldata.txt')
    #print(list(map(lambda x: print(x), entries.items())))


# main()
