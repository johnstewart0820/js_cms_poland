import wrapInArray from "./wrapInArray";

export const addZeroIfNeeded = num => ( num < 10 ? `0${+num}` :  num );

export const removeHtmlTags = content => {
	content = content.replace(/<[^<>]+>/g, ' ');
	content = content.replace(/\s\s+/, ' ');
	return content;
};

export const isMobile = () => ( window.navigator.userAgent.toLowerCase().includes("mobi") );

export const getMobileDeviceOS = () => {
	const user_agent =  window.navigator.userAgent.toLowerCase();
	return user_agent.includes("mac os")
		? "ios"
		: user_agent.includes("android")
			? "android"
				: undefined;
};

export const isFunction = func => ( toString.call(func) === "[object Function]" )

export const getArticleLink = article => '/' + article.slug + ',' + article.id;

export const handleFilteringCategories = (args, categories) => {
    /**
     * Try to find category by ID, unless args.categories is an object (this
     * typically means that category was found during previous handling).
     * Note that if args.categories will be falsy (null, '', undefined),
     * API.getByConfig() will use CMS-configured categories due to a fail-safe.
     */
    if (args.categories && typeof args.categories !== 'object')
        args.categories = categories.find(category => String(category.id) === String(args.categories));

    return args;
};

/**
 * Prepares filters for API
 * @param {object} filters Object with keys and values to process
 * @param {array|string} excludes Array of keys to exclude from processing
 * @returns {string}
 */
export const prepApiFilters = (filters, excludes) => {
    const resultFilters = [];
    excludes = wrapInArray(excludes);

    Object.keys(filters).forEach(key => {
        if (excludes.includes(key))
            return;

        if (!filters[key])
            return;

        resultFilters.push({[key]: filters[key]});
    });

    return JSON.stringify(resultFilters);
};

/**
 * Prepends empty option to array of options
 * @param {object[]} options Array of options
 * @param {object} overrides Customisation of empty option
 * @returns {object[]}
 */
export const withDefaultOption = (options, overrides = {}) => ([
    {
        key: 0,
        value: '',
        label: 'Wszystkie',
        ...overrides,
    },
    ...options,
]);
