const Sites = {
    Main: 'MAIN',
    Tourism: 'TOURISM',
    Sport: 'SPORT',
};

const SITE = Sites.Sport; // MAIN TOURISM SPORT CULTURE

const SITES_DOMAIN = {
    [Sites.Main]: "ustron.s3.netcore.pl",
    [Sites.Tourism]: "visit.ustron.s3.netcore.pl",
    [Sites.Sport]: "sport.ustron.s3.netcore.pl",
};

export {Sites, SITE, SITES_DOMAIN};
