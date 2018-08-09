#!/usr/bin/zsh

if [ $# -gt 0 ]; then
	scp -P 17 ~/AgDial_assets/agimg/*  gk1000@img.agdial.in:/var/www/agimg/images/
else
	find ~/AgDial_assets/agimg/ -type f -name "*.jpg" -newerat $(date +%F) -exec scp -P 17 "{}" gk1000@img.agdial.in:/var/www/agimg/images/ \;
fi