import React from 'react';
import {API} from "../extra/API";
import MainHeaderSection from "../components/header/MainHeaderSection";
import LoopNewsPost from "../components/news/LoopNewsPost";
import Breadcrumbs from '../components/general/Breadcrumbs';
import Loader from "../components/general/Loader";
import LoopSearchForm from "../components/loop/LoopSearchForm";
import LoopSearchPostsContainer from "../components/loop/LoopSearchPostsContainer";
import Pagination from "../components/loop/Pagination";
import PageHeaderOrSlider from "../extra/PageHeaderOrSlider";
import Select from "../components/form/Select";
import {handleFilteringCategories} from "../extra/functions";

const OrderOptions = [
    {value: 'desc', label: 'Najbliższe aktualności'},
    {value: 'asc', label: 'Najstarszy aktualności'},
];

export default function TourismNews(props) {
    const acf = props.page.acf;
    const container = React.useRef(null);
    const [data, setData] = React.useState(null);
    const [filterArgs, setFilterArgs] = React.useState({
        page: 0,
        orderby: 'date',
        order: 'desc',
    });

    const fetchData = args => {
        setData(null);
        API.getByConfig(acf.field_information_module_news, args).then(response => setData(response.data));
    };

    // fetch posts when filterArgs change
    React.useEffect(() => {
        fetchData(filterArgs);
    }, [filterArgs]);

    const onFilterSubmit = args => {
        handleFilteringCategories(args, acf.field_news_filtering_categories);
        setFilterArgs({...filterArgs, ...args});
    };

    const onPageChange = page => {
        setFilterArgs({...filterArgs, page});
        window.scrollTo({top: container.current.getBoundingClientRect().top + window.scrollY});
    };

    const changeSort = e => setFilterArgs({...filterArgs, order: e.target.value});

    return (
        <>
            <MainHeaderSection>
                <Breadcrumbs breadcrumbs={[{label: "Visit.ustron.pl", to: "/"}, {label: props.page.title}]}/>
                <PageHeaderOrSlider page={props.page}/>
            </MainHeaderSection>

            <LoopSearchForm
                type="news"
                inputs={{
                    label: 'Kategoria',
                    name: 'categories',
                    options: acf.field_news_filtering_categories.map(category => ({
                        value: category.id,
                        label: category.name,
                    })),
                    Component: Select,
                }}
                heading="Filtr Kategorii"
                submitCallback={onFilterSubmit}
            />

            <LoopSearchPostsContainer
                onRef={ref => container.current = ref}
                extra_classes="news"
                heading="WSZYSTKIE AKTUALNOŚCI"
                sort_options={OrderOptions}
                sortOnChange={changeSort}
            >
                {!data && <Loader style={{width: "100%"}}/>}

                {!!data && (
                    <>
                        {data.contents.map(news => <LoopNewsPost key={news.id} {...news} />)}

                        <Pagination
                            active_page={data.pages.currentPage}
                            total_amount={data.pages.pageCount}
                            pageChangeCallback={onPageChange}
                        />
                    </>
                )}
            </LoopSearchPostsContainer>
        </>
    );
};