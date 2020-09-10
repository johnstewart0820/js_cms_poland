import React from 'react';
import {API} from "../extra/API";
import MainHeaderSection from "../components/header/MainHeaderSection";
import LoopNewsPost from "../components/news/LoopNewsPost";
import Breadcrumbs from '../components/general/Breadcrumbs';
import Loader from "../components/general/Loader";
import PicturesSlider from "../components/slider/PicturesSlider";
import LoopSearchForm from "../components/loop/LoopSearchForm";
import LoopSearchPostsContainer from "../components/loop/LoopSearchPostsContainer";
import Pagination from "../components/loop/Pagination";

import {sample_slides as slides} from "../mock/slides_example";
import PageHeaderSection from "../components/header/PageHeaderSection";
import PageHeaderOrSlider from "../extra/PageHeaderOrSlider";

const sort_options = [
    {value: 1, label: "Najbliższe aktualności"},
    {value: 2, label: "Najstarszy aktualności"},
];

export default function TourismNews(props) {
    const acf = props.page.acf;
    const container = React.useRef(null);
    const [data, setData] = React.useState(null);

    const fetchData = args => {
        API.getPosts({
            categories: acf.field_events_category.map(category => category.id),
            ...args,
        }).then(response => setData(response.data));
    };

    React.useEffect(() => {
        fetchData({page: 0});
    }, []);

    const onFilterSubmit = args => {
        window.scrollTo({top: container.current.getBoundingClientRect().top + window.scrollY});
    };

    const onPageChange = page => fetchData({page});

    return (
        <>
            <MainHeaderSection>
                <Breadcrumbs breadcrumbs={[{label: "Visit.ustron.pl", to: "/"}, {label: props.page.title}]} />
                <PageHeaderOrSlider page={props.page} />
            </MainHeaderSection>

            <LoopSearchForm
                type="news"
                heading="Filtr Kategorii"
                submitCallback={onFilterSubmit}
            />

            <LoopSearchPostsContainer
                onRef={ref => container.current = ref}
                extra_classes="news"
                heading="WSZYSTKIE AKTUALNOŚCI"
                sort_options={sort_options}
            >
                {!data && <Loader style={{width: "100%"}} />}

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