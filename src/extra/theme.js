const contrast_key = "contrast_theme";

export const toggleContrastVersion = e => {
    e.preventDefault();

    isContrastThemeOn()
        ? turnOffContrastTheme()
        : turnOnContrastTheme()
}


export const isContrastThemeOn = () => ( localStorage.getItem( contrast_key ) === "1" );


export const turnOnContrastTheme = () => {
    localStorage.setItem( contrast_key, "1" );
    document.body.classList.add("contrast");
}


export const turnOffContrastTheme = () => {
    localStorage.removeItem( contrast_key);
    document.body.classList.remove("contrast");
}


export const toggleUnderlineLinks = e => {
    e.preventDefault();
    document.body.classList.toggle("links-underline");
}
