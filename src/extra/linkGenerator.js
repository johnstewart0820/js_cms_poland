import Links from "../constants/Links";

export default function linkGenerator(entity) {
    switch (entity.post_type) {
        case 'page':
            return Links.Page(entity.id);

        default:
            // use /posts/:id as fallback?
            throw new Error(`Cannot generate link for post type [${entity.post_type}]`);
    }
}
