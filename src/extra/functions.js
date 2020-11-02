import wrapInArray from "./wrapInArray";
import LocalStorage from "../constants/LocalStorage";
import Questionnaire from "../components/questionnaire/Questionnaire";
import React from "react";
import Parser from "html-react-parser";


export const loadScript = ( src, parent_el ) => {
			
	const script = document.createElement('script');
	script.type = "text/javascript";
	script.async = true;
	script.src = src;

	const place = parent_el || document.body; 
	place.appendChild( script );
}

export const parserShortcodes = (body) => {
    if (body.includes('[[Poll/')) {
        const index = body.indexOf('[[Poll/');
        const indexPoll = index + 7;
        const description = body.replace(`[[Poll/${body[indexPoll]}]]`, "")

        return (<>
            <div>{Parser(description)}</div>
            <Questionnaire indexOfPoll={body[indexPoll]} body={body}/></>)
    } else return <div>{Parser(body)}</div>


}

export const openHoursIsEmpty = openHours =>{
    let fieldIsNotEmpty = false
    Object.values(openHours).map(hour => {
        if (hour !== "") fieldIsNotEmpty = true;
    })
    if (fieldIsNotEmpty === true) return true;
    else {
        return false;
    }
}


export const addZeroIfNeeded = num => (num < 10 ? `0${+num}` : num);

export const removeHtmlTags = content => {
    content = content.replace(/<[^<>]+>/g, ' ');
    content = content.replace(/\s\s+/, ' ');
    return content;
};

export const isMobile = () => (window.navigator.userAgent.toLowerCase().includes("mobi"));

export const getMobileDeviceOS = () => {
    const user_agent = window.navigator.userAgent.toLowerCase();
    return user_agent.includes("mac os")
        ? "ios"
        : user_agent.includes("android")
            ? "android"
            : undefined;
};

export const isFunction = func => (toString.call(func) === "[object Function]");

export const getArticleLink = article => {
    if (!article?.slug && !article?.id)
        return null;

    const locale = localStorage.getItem(LocalStorage.Locale) || 'pl';
    return `/${locale}/${article.slug},${article.id}`;
};

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

/**
 *
 * @param {string} to Email address
 * @param {{
 *     subject?: string,
 *     cc?: string|string[],
 *     bcc?: string|string[],
 *     body?: string,
 * }} args Link arguments such as subject, CC, BCC, etc
 * @return {string}
 */
export const getMailToLink = (to, args = {}) => {
    if (!to)
        return '#';

    let link = 'mailto:' + to;

    let isFirstParam = true;
    let queryString = '';
    const queryParams = {...args};
    Object.keys(queryParams).forEach(key => {
        let value = queryParams[key];

        if (Array.isArray(value))
            value = value.join(', ');

        if (isFirstParam)
            isFirstParam = false;
        else
            queryString += '&';

        queryString += key + '=' + value;
    });

    if (queryString)
        link += '?' + queryString;

    return link;
};

export const ucfirst = string => string.charAt(0).toUpperCase() + string.slice(1);
