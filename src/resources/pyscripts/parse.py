#!/usr/bin/python
import re
# from functools import reduce

imgurl_base = 'https://img.agdial.in/images/'


def parse_file(fname):
    with open(fname) as f:
        data = f.read()
        data = re.sub('\\n|\\xa0', '', data)
        entries = list(filter(None, data.split('$$')))
        return entries


special_data = {'Website': '((https?://)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)?/?)',
                'Whatsapp': '(+?[0-9 ]+{10,})', 'Youtube': '(https:\/\/www\.youtu.*)'}


def extract_special_data(str):
    map(lambda x: , special_data.items())
    re.search('Website', str)
    re.findall(, 'Website:dfgdfg.com,lll.com')


def parse_entry(entry):
    try:
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
            name = n_c[0]
            type_ = n_c[1]
        imgurl = imgurl_base+id+'.jpg'
        data_list = list(map(lambda x: x.strip(), ed[1:]))
        entry_dict = {"name": name, "path": path,
                      "image": imgurl, "content": data_list}
        for v in locals().items():
            if v[0] in ['catcode', 'type_'] and v[1]:
                entry_dict.update({v[0]: v[1]})
        entry_dict = dict(
            map(lambda x: (x[0], x[1].strip()) if type(x[1]) is str else x, entry_dict.items()))
        entry_dict = {id: dict(entry_dict.items())}
        return entry_dict
    except Exception as e:
        print(e, '\n at entry \n', entry)


def handle_entries(entries):
    # return reduce(lambda x, y: x.update(y), list(map(lambda e: parse_entry(e), entries)))
    entries = list(map(lambda e: parse_entry(e), entries))
    final_dict = {}
    for e in entries:
        final_dict.update(e)
    return final_dict


def parse(filename):
    if(filename):
        return handle_entries(parse_file(filename))


def main():
    entries = parse('../content/alldata.txt')
    print(list(map(lambda x: print(x), entries.items())))


main()
