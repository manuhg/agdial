#!/usr/bin/python
#FIRST remome all <row> s

import xml.etree.ElementTree as et
#from functools import reduce

def pc(s):
	#PascalCase
	s=s.text.strip()
	return ' '.join(list(map(lambda w:w[0].upper()+w[1:],s.split(' ')))).strip()
	#return reduce(lambda s,x:(s+' '+x).strip(),list(map(lambda w:w[0].upper()+w[1:],s.split(' '))))

def entry(e):
	return list([pc(e[0]),list(map(lambda li:pc(li[0]),e[1]))])

def xml_to_list(xml_file):
    tree=et.parse(xml_file)
    root=tree.getroot()
    return list(map(entry,root[0][0][0]))