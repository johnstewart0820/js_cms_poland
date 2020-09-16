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
