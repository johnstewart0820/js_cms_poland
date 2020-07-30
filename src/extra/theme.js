const contrast_key = "contrast_theme";

const toggleContrastVersion = (e) => {
	e.preventDefault();

	isContrastThemeOn()
		? turnOffContrastTheme()
		: turnOnContrastTheme()
}


const isContrastThemeOn = () => ( localStorage.getItem( contrast_key ) === "1" );

const turnOnContrastTheme = () => {
	localStorage.setItem( contrast_key, "1" );
	document.body.classList.add("contrast");
}

const turnOffContrastTheme = () => {
	localStorage.removeItem( contrast_key);
	document.body.classList.remove("contrast");
}


const toggleUnderlineLinks = () => {
	document.body.classList.toggle("links-underline");
} 

export { toggleContrastVersion, isContrastThemeOn, turnOnContrastTheme, toggleUnderlineLinks };