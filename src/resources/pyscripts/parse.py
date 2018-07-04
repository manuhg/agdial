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


def parse_entry(entry):
    try:
        ed = entry.split('##')
        ns = list(filter(None, ed[0].split('/')))
        name = ns[-1]
        catcode = ''

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
        name = name.strip()
        catcode = catcode.strip()
        path = path.strip()
        imgurl = imgurl_base+id+'.jpg'
        # imgurl = imgurl_base
        # if path == 'cat':
        #     imgurl += id
        # else:
        #     imgurl += path
        # imgurl += '.jpg'
        data_list = list(map(lambda x: x.strip(), ed[1:]))
        if catcode:
            return {id: {"name": name, "catcode": catcode, "path": path, "image": imgurl, "content": data_list}}
        return {id: {"name": name,  "path": path, "image": imgurl, "content": data_list}}
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
    entries = parse('content/alldata.txt')
    print(list(map(lambda x: print(x), entries.items())))


main()
