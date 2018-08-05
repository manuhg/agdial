#!/usr/bin/zsh
set -x
cd ../content/Listings/Premium
echo $PWD
soffice --headless --convert-to txt:Text *.docx
[ -f ../../premium_data.txt ] && rm ../../premium_data.txt
cat *.txt > ../../premium_data.txt
ls *.txt
rm *.txt
ls