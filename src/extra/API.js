import axios from "axios";
import LocalStorage from "../constants/LocalStorage";
import wrapInArray from "./wrapInArray";

const API_URL = "https://api.ustron.s3.netcore.pl/";
const API = axios.create({
    baseURL: API_URL,
});

API.interceptors.request.use(config => {
    config.params = config.params || {}
    config.params.lang = config.params?.lang || localStorage.getItem(LocalStorage.Locale) || 'pl';
    return config;
});

API.getPosts = ({categories, ...rest}) => {
    if (Array.isArray(categories))
        categories = categories.join(',');

    return API.get('contents/posts', {params: {categories, ...rest}});
};

API.getPost = id => API.get('contents/posts/' + id);

API.getEvents = ({categories, ...rest}) => {
    if (Array.isArray(categories))
        categories = categories.join(',');

    return API.get('contents/events', {params: {categories, ...rest}});
};

API.getEvent = id => API.get('contents/events/' + id);

API.getOrganizers = () => API.get('contents/organizers');

API.getCustomField = field => API.get('contents/custom-fields/' + field);

API.getEntities = ({categories, ...rest}) => {
    categories = wrapInArray(categories);

    if (categories.length && typeof categories[0] !== 'object')
        throw new Error('Only full category objects are allowed in getEntities(), instead got ' + JSON.stringify(categories[0]));

    let isEvents = false;
    for (const category of categories) {
        if (category.post_type === 'events') {
            isEvents = true;
            break;
        }
    }

    return (isEvents ? API.getEvents : API.getPosts)({
        categories: categories.map(category => category.id),
        ...rest,
    });
};

/**
 * Uses getEntities but automatically configures itself from API config
 *
 * @typedef {{
 *     "field_section_title_visit": string,
 *     "field_section_categories_visit": [
 *         {
 *             "id": "40",
 *             "name": "Aktualności",
 *             "post_type": "news",
 *             "slug": "aktualnosci-4"
 *         }
 *     ],
 *     "field_section_sorting_visit": string,
 *     "field_section_order_visit": string,
 *     "field_section_posts_count_visit": string|number,
 *     "field_section_watch_all_entity": boolean|object,
 * }} Config
 *
 * @typedef {{
 *     categories: array,
 *     page: string|number,
 *     limit: string|number|undefined,
 *     order: string,
 *     orderby: string,
 *     query: string,
 * }} QueryArgs
 *
 * @param {Config|Config[]} config
 * @param {QueryArgs} args
 */
API.getByConfig = (config, args = {}) => {
    if ((Array.isArray(config) && config.length > 1) || typeof config !== 'object') {
        console.error(config);
        throw new Error('Cannot generate query params for config above');
    }

    config = Array.isArray(config) ? config[0] : config;
    // copy override args to prevent accidental direct state modification
    const overrides = {...args};

    /**
     * Fail-save to use default categories if overriding args.categories
     * have invalid value (null, '', undefined).
     * Note that empty arrays are still supported.
     */
    if (!overrides.categories)
        overrides.categories = config.field_section_categories_visit;

    config = {
        categories: config.field_section_categories_visit,
        page: 0,
        limit: config.field_section_posts_count_visit,
        order: config.field_section_order_visit,
        orderby: config.field_section_sorting_visit,
        ...overrides, // overrides previous keys
    };

    return API.getEntities(config);
};

const MOCK_API = axios.create({
    baseURL: "/mock/",
});

const router_basename = "/";
const google_key = "AIzaSyAIzltie_bA7wStuHCcimXBlbJG5kKPYos";

export {
    API,
    MOCK_API,
    router_basename,
    google_key,
};
