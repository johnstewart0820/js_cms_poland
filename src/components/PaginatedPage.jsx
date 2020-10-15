import React from "react";
import PropTypes from "prop-types";
import {API} from "../extra/API";
import {getArticleLink, handleFilteringCategories, prepApiFilters} from "../extra/functions";
import MainHeaderSection from "./header/MainHeaderSection";
import Breadcrumbs from "./general/Breadcrumbs";
import PageHeaderOrSlider from "../extra/PageHeaderOrSlider";
import Loader from "./general/Loader";
import LoopSearchForm from "./loop/LoopSearchForm";
import LoopSearchPostsContainer from "./loop/LoopSearchPostsContainer";
import Pagination from "./loop/Pagination";
import MapWithPinsFiltering from "./map/MapWithPinsFiltering";
import Parser from "html-react-parser";
import TitleText from "./general/TitleText";

const OrderOptions = [
    {value: 'desc', label: 'Najbliższe aktualności'},
    {value: 'asc', label: 'Najstarszy aktualności'},
];

const PaginatedPage = props => {
    const container = React.useRef(null);
    const [data, setData] = React.useState(null);
    const [filters, setFilters] = React.useState({page: 0});

    React.useEffect(() => {
        setData(null);
        API.getByConfig(props.config, {
            page: filters.page,
            order: filters.order,
            categories: filters.categories,
            filters: prepApiFilters(filters, ['categories', 'page', 'order', 'orderby']),
        }).then(res => {
            setData(res.data);
        }).catch(err => {
            console.error(err);
            setData(false);
        });
    }, [props.config, filters]);

    const onFilterSubmit = args => {
        const config = Array.isArray(props.config) ? props.config[0] : props.config;
        setFilters({...handleFilteringCategories(args, config.field_section_categories_visit), page: filters.page});
    }

    const onPageChange = page => {
        setFilters({...filters, page});
        window.scrollTo({top: container.current.getBoundingClientRect().top + window.scrollY});
    };

    const changeSort = e => setFilters({...filters, order: e.target.value});

    return (
        <>
            {!props.hideHeader && (
                <MainHeaderSection extra_classes={props.headerClasses}>
                    <Breadcrumbs breadcrumbs={props.breadcrumbs || [
                        {label: "Visit.ustron.pl", to: "/"},
                        {label: props.page.title, to: getArticleLink(props.page)},
                    ]}/>
                    <PageHeaderOrSlider page={props.page}/>
                </MainHeaderSection>
            )}

            {!!props.description && (
                <TitleText
                    heading={'Opis'}
                    text={Parser(props.description)}
                    extra_classes={props.descriptionClasses}
                />
            )}

            {(props.inputs !== undefined && !props.inputs) && <Loader/>}
            {!!props.inputs && (
                <LoopSearchForm
                    heading={props.filtersHeader}
                    inputs={props.inputs}
                    submitCallback={onFilterSubmit}
                />
            )}

            <LoopSearchPostsContainer
                onRef={el => container.current = el}
                extra_classes={props.containerClasses}
                heading={props.containerHeader}
                sort_options={OrderOptions}
                sortOnChange={changeSort}
            >
                {data === null && <Loader/>}

                {!!data?.contents && (
                    <>
                        {!data.contents.length && (
                            <h2 style={{textAlign: 'center', width: '100%'}}>
                                Brak treści dla podanych kryteriów
                            </h2>
                        )}
                        {data.contents.map(post => <props.itemComponent key={post.id} {...post} />)}

                        <Pagination
                            active_page={data.pages.currentPage}
                            total_amount={data.pages.pageCount}
                            pageChangeCallback={onPageChange}
                        />
                    </>
                )}
            </LoopSearchPostsContainer>

            {props.children}

            {!!props.mapId && <MapWithPinsFiltering map_id={props.mapId}/>}
        </>
    );
};

PaginatedPage.propTypes = {
    page: PropTypes.object.isRequired,
    config: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
    ]).isRequired,
    inputs: PropTypes.array,
    itemComponent: PropTypes.func.isRequired,
    breadcrumbs: PropTypes.array,
    filtersHeader: PropTypes.string,
    containerHeader: PropTypes.string,
    containerClasses: PropTypes.string,
    headerClasses: PropTypes.string,
    hideHeader: PropTypes.any,
    mapId: PropTypes.any,
};

export default PaginatedPage;
