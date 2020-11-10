const Sites = {
    Main: 'MAIN',
    Tourism: 'TOURISM',
    Sport: 'SPORT',
    Culture: 'CULTURE',
};

const SITE = Sites.Sport;

const SITES_DOMAIN = {
    [Sites.Main]: "ustron.s3.netcore.pl",
    [Sites.Tourism]: "visit.ustron.s3.netcore.pl",
    [Sites.Sport]: "sport.ustron.s3.netcore.pl",
    [Sites.Culture]: "kultura.ustron.s3.netcore.pl",
};

const MAIN_DOMAINS = [
    'ustron.s3.netcore.pl',
    'ustron.pl',
];

export {Sites, SITE, SITES_DOMAIN, MAIN_DOMAINS};
