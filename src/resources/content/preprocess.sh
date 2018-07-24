#!/usr/bin/zsh
soffice --headless --convert-to txt:Text *.docx
sed -i 1,1d *.txt
mkdir data
mv *.txt data/
cat data/*.txt > alldata.txt
cat data/*.txt | grep -E '/CAT/' | sed -E 's/\$\$\/CAT\///g;'|sed -r 's/([A-Z/]+)\/(.*)/\1 : \2/g;'|sed -r 's/\//-/g;'>data/nomenclature.txt
soffice --headless --convert-to docx data/nomenclature.txt