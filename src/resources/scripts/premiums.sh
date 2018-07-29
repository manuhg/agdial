#!/usr/bin/zsh
set -x
cd ../content/Listings/Premium
soffice --headless --convert-to txt:Text *.docx
cat *.txt > ../../premium_data.txt
rm *.txt