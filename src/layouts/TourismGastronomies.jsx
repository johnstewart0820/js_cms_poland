import React from 'react';
import {API} from "../extra/API";
import MainHeaderSection from "../components/header/MainHeaderSection";
import LoopGastronomyPost from "../components/gastronomy/LoopGastronomyPost";
import Breadcrumbs from '../components/general/Breadcrumbs';
import Loader from "../components/general/Loader";
import LoopSearchForm from "../components/loop/LoopSearchForm";
import LoopSearchPostsContainer from "../components/loop/LoopSearchPostsContainer";
import Pagination from "../components/loop/Pagination";
import MapWithPinsFiltering from '../components/map/MapWithPinsFiltering';
import {getArticleLink, prepApiFilters, withDefaultOption} from "../extra/functions";
import PageHeaderOrSlider from "../extra/PageHeaderOrSlider";
import useCustomField from "../hooks/useCustomField";
import Select from "../components/form/Select";

export default function GastronomyPage(props) {

	 const acf = props.page.acf;
    const container = React.useRef(null);
    const recommendedFor = useCustomField('recomended_for');
    const pricesVariant = useCustomField('prices_variant');
    const facilities = useCustomField('facilities_restaurants');
    const [data, setData] = React.useState(null);
    const [filters, setFilters] = React.useState({
        page: 0,
    });

    React.useEffect(() => {
        setData(null);
        API.getByConfig(acf.field_information_modules_attractions, {
            page: filters.page,
            filters: prepApiFilters(filters, 'page'),
        })
            .then(res => setData(res.data))
            .catch(err => {
                console.error(err);
                setData(false);
            });
    }, [filters]);

    const onFilterSubmit = args => setFilters({...args, page: filters.page});

    const onPageChange = page => {
        setFilters({...filters, page});
        window.scrollTo({top: container.current.getBoundingClientRect().top + window.scrollY});
    };

    return (
        <>
            <MainHeaderSection extra_classes="subpage">
                <Breadcrumbs breadcrumbs={[
                    {label: "Visit.ustron.pl", to: "/"},
                    {label: props.page.title, to: getArticleLink(props.page)},
                ]}/>
                <PageHeaderOrSlider page={props.page}/>
            </MainHeaderSection>

            {(!recommendedFor || !pricesVariant || !facilities) && <Loader/>}
            {!!recommendedFor && !!pricesVariant && !!facilities && (
                <LoopSearchForm
                    type="gastronomy"
                    heading="GASTRONOMIA"
                    inputs={[recommendedFor, pricesVariant, facilities].map(field => ({
                        label: field.label,
                        name: field.key,
                        options: withDefaultOption(Object.keys(field.choices).map(key => ({value: key, label: field.choices[key]}))),
                        Component: Select,
                    }))}
                    submitCallback={onFilterSubmit}
                />
            )}

            <LoopSearchPostsContainer
                onRef={el => container.current = el}
                extra_classes="gastronomy"
                heading="spis lokali gastronomicznych"
            >
                {data === null && <Loader/>}

                {!!data?.contents && (
                    <>
                        {data.contents.map(post => <LoopGastronomyPost key={post.id} {...post} />)}

                        <Pagination
                            active_page={data.pages.currentPage}
                            total_amount={data.pages.pageCount}
                            pageChangeCallback={onPageChange}
                        />
                    </>
                )}
            </LoopSearchPostsContainer>

				{/* { !!acf?.field_attractions_map && <MapWithPinsFiltering map_id={ acf?.field_attractions_map }/> } */}
        </>
    );
};