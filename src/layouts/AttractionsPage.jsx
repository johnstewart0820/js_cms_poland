import React from 'react';
import Breadcrumbs from "../components/general/Breadcrumbs";
import MainHeaderSection from "../components/header/MainHeaderSection";
import LoopSearchForm from "../components/loop/LoopSearchForm";
import LoopSearchPostsContainer from "../components/loop/LoopSearchPostsContainer";
import LoopAttractionPost from "../components/attractions/LoopAttractionPost";
import {API} from "../extra/API";
import Loader from "../components/general/Loader";
import PlanerContext from "../constants/PlanerContext";
import PageHeaderOrSlider from "../extra/PageHeaderOrSlider";
import Pagination from "../components/loop/Pagination";
import MapWithPinsFiltering from "../components/map/MapWithPinsFiltering";
import Select from "../components/form/Select";

const sort_options = [
    { value: 1, label: "Najbliższe aktualności" },
    { value: 2, label: "Najstarszy aktualności" },
];

const AttractionPage = props => {
    const acf = props.page.acf;
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState(null);
    const [filterArgs, setFilterArgs] = React.useState({page: 0});

    const attractionsType = acf.field_information_modules_attractions[0].field_section_categories_visit;
    const priceVariants = acf.field_prices_variant;
    const recommendedFor = acf.field_recommended_for;


    const getPosts = args => {
        setData(null);
        API.getByConfig( acf.field_information_modules_attractions, args).then(res => {
            setData(res.data);
            setLoading(false);
        });
    }

    React.useEffect(() => {
        getPosts(filterArgs);
    },[filterArgs]);

    const onFilterSubmit = args => {
        if (args.categories)
            args.categories = acf.field_information_modules_attractions[0].field_section_categories_visit.find(category => String(category.id) === String(args.categories));

        setFilterArgs({...filterArgs, ...args});
    }

    const onPageChange = page => setFilterArgs({...filterArgs, page});

    return (
        <>
            <MainHeaderSection extra_classes="subpage">
                <Breadcrumbs breadcrumbs={[{ label: "Visit.ustron.pl", to: "/" }, { label: "Noclegi" }]} />
                <PageHeaderOrSlider page={props.page}/>
            </MainHeaderSection>

            <LoopSearchForm
                type="what-to-visit"
                heading="FILTR KATEGORII"
                inputs={[
                    {
                        label: "Polecane dla",
                        name: "recommended_for",
                        options: recommendedFor?.map(option => ({
                            value: option,
                            label: option
                        })),
                        Component: Select
                    },
                    {
                        label: "Typ Atrakcji",
                        name: "type",
                        options: attractionsType?.map(option => ({
                            value: option.id,
                            label: option.name,
                        })),
                        Component: Select
                    },
                    {
                        label: "Przedział cenowy",
                        name: "price_range",
                        options: priceVariants?.map(option => ({
                            value: option,
                            label: option
                        })),
                        Component: Select
                    }
                ]}
                submitCallback={onFilterSubmit}
            />

            <LoopSearchPostsContainer
                heading={'ATRAKCJE'}
                sort_options={sort_options}
            >
                {loading && <Loader style={{ width: "100%" }}/>}
                {!!data && (
                    <>
                        {data.contents?.length > 0 && data.contents.map((item, index) => (
                            <LoopAttractionPost key={index} {...item}/>
                        ))}

                        <Pagination
                            active_page={data.pages.currentPage}
                            total_amount={data.pages.pageCount}
                            pageChangeCallback={onPageChange}
                        />
                    </>
                )}
                <MapWithPinsFiltering type="attractions" />
            </LoopSearchPostsContainer>
        </>
    )
}

export default AttractionPage;