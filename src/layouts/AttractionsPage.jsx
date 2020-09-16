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

const sort_options = [
    { value: 1, label: "Najbliższe aktualności" },
    { value: 2, label: "Najstarszy aktualności" },
];

const AttractionPage = props => {
    const acf = props.page.acf;
    const [loading, setLoading] = React.useState(true);
    const [posts, setPosts] = React.useState([]);
    const [filterArgs, setFilterArgs] = React.useState({page: 0});
    const planerContext = React.useContext(PlanerContext);


    React.useEffect(() => {
        getPosts(filterArgs);
    },[filterArgs]);

    const getPosts = args => {
        API.getByConfig( acf.field_information_modules_attractions, args).then(res => {
            setPosts(res.data.contents);
            setLoading(false);
        });
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
            />

            <LoopSearchPostsContainer
                heading={'ATRAKCJE'}
                sort_options={sort_options}
            >
                {loading && <Loader style={{ width: "100%" }}/>}
                {posts.length > 0 && posts.map((item, index) => (
                    <LoopAttractionPost key={index} {...item} onClick={() => planerContext.add(item.id)}/>
                ))}

                <Pagination
                    active_page={posts.currentPage}
                    total_amount={posts.pageCount}
                    pageChangeCallback={onPageChange}
                />

                <MapWithPinsFiltering type="attractions" />
            </LoopSearchPostsContainer>
        </>
    )
}

export default AttractionPage;