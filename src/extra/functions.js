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
