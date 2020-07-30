const addZeroIfNeeded = (num) => ( num < 10 ? `0${+num}` :  num );

const removeHtmlTags = (content) => {
	content = content.replace(/<[^<>]+>/g, ' ');
	content = content.replace(/\s\s+/, ' ');
	return content;
};

const isMobile = () => ( window.navigator.userAgent.toLowerCase().includes("mobi") );

const getMobileDeviceOS = () => {
	const user_agent =  window.navigator.userAgent.toLowerCase();
	return user_agent.includes("mac os") 
		? "ios"
		: user_agent.includes("android")
			? "android"
				: undefined;
};

const isFunction = ( func ) => ( toString.call(func) === "[object Function]" )

export {
	addZeroIfNeeded,
	removeHtmlTags,
	isMobile,
	getMobileDeviceOS,
	isFunction
}