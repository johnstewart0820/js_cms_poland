import React from 'react';
import {withDefaultOption} from "../extra/functions";
import Select from "../components/form/Select";
import MainHeaderSection from "../components/header/MainHeaderSection";
import Breadcrumbs from "../components/general/Breadcrumbs";
import PageHeaderOrSlider from "../extra/PageHeaderOrSlider";
import LoopSearchForm from "../components/loop/LoopSearchForm";
import Loader from "../components/general/Loader";
import LoopGastronomyPost from "../components/gastronomy/LoopGastronomyPost";
import Pagination from "../components/loop/Pagination";
import LoopSearchPostsContainer from "../components/loop/LoopSearchPostsContainer";
import useEntities from "../hooks/useEntities";
import MapWithPinsFiltering from "../components/map/MapWithPinsFiltering";

const SportActivities = (props) => {
    const [activities] = useEntities(props.page.acf.field_active_categories);
    const container = React.useRef(null);
    const [filters, setFilters] = React.useState({
        page: 0,
    });

    const filteringCategories = React.useMemo(() => {
        let categories = props.page.acf.field_active_categories;
        let newFilters = [];

        categories.forEach(element => {
            newFilters.push({
               label: element.name,
               value: element.slug,
            });
        });

        return newFilters;
    },[filters]);

    const onFilterSubmit = args => setFilters({...args, page: filters.page});

    const onPageChange = page => {
        setFilters({...filters, page});
        window.scrollTo({top: container.current.getBoundingClientRect().top + window.scrollY});
    };

    return (
        <>
            <MainHeaderSection extra_classes="subpage">
                <Breadcrumbs breadcrumbs={[{label: "sport.ustron.pl ", to: '/'}, {label: "Aktywny wypoczynek "}]}/>
                <PageHeaderOrSlider page={props.page}/>
            </MainHeaderSection>

            <LoopSearchForm
                heading="filtr Kategorii"
                inputs={[{
                    label: 'Kategoria',
                    name: 'category_id',
                    selectImageColor: 'green',
                    options: withDefaultOption(filteringCategories || []),
                    Component: Select,
                }]}
                submit_label={'FILTRUJ'}
                submitCallback={onFilterSubmit}
            />

            <LoopSearchPostsContainer
                onRef={el => container.current = el}
                extra_classes="gastronomy"
                heading="spis lokali gastronomicznych"
            >
                {activities === null && <Loader/>}

                {!!activities?.contents && (
                    <>
                        {activities.contents.map(post => <LoopGastronomyPost key={post.id} {...post} />)}

                        <Pagination
                            active_page={activities.pages.currentPage}
                            total_amount={activities.pages.pageCount}
                            pageChangeCallback={onPageChange}
                        />
                    </>
                )}
            </LoopSearchPostsContainer>

            <MapWithPinsFiltering map_id={props.page.acf.field_active_map}/>
        </>
    )
}

export default SportActivities;