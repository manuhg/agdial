#!/usr/bin/zsh
set -x
cd ../content/Listings
soffice --headless --convert-to txt:Text *.docx
sed -i 1,1d *.txt
cat *.txt > ../all_listings.txt
rm *.txt
cd ..
cat all_listings.txt | grep -E '/CAT/' | sed -E 's/\$\$\/CAT\///g;s/\//-/g;'>temp.txt

CAT='CAT'
cat_nom="'/':'$CAT',"
rcat_nom="'$CAT':'',"


echo "nomenclature = {\n$cat_nom " > nomvar
cat temp.txt | sed -E 's/([A-Z\-]+)\-(.*)/"\2" : "\1",/g;' >>nomvar
echo "}" >> nomvar #cat be used for py also
echo "export const ">>nomenclature.js
cat nomvar >>nomenclature.js
echo ";\n" >> nomenclature.js

echo "export const rnom = {\n$rcat_nom ">>nomenclature.js
cat temp.txt | sed -E 's/([A-Z\-]+)\-(.*)/"\1" : "\2",/g;'  >>nomenclature.js

echo "};\nexport default rnom;" >>nomenclature.js
mv nomenclature.js ../

cat temp.txt | sed -E 's/([A-Z\-]+)\-(.*)/\1 : \2/g;' >nomenclature.txt
soffice --headless --convert-to docx nomenclature.txt
rm temp.txt nomvar nomenclature.txt

soffice --headless --convert-to txt:Text order.docx
mv order.txt ../scripts/order.py


#cat alldata.txt | grep -E '/CAT/' | sed -E 's/\$\$\/CAT\///g;s/([A-Z/]+)\/(.*)/\1 : \2/g;s/\//-/g;' >nomenclature.tx