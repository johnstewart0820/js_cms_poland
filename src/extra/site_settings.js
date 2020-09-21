const Sites = {
	Main: 'MAIN',
	Tourism: 'TOURISM',
};

const SITE = Sites.Tourism; // MAIN TOURISM SPORT CULTURE

const SITES_DOMAIN = {
	[Sites.Main]: "ustron.s3.netcore.pl",
	[Sites.Tourism]: "visit.ustron.s3.netcore.pl"
};

export { Sites, SITE, SITES_DOMAIN };
