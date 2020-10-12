import React from 'react';
import {API} from "../../extra/API";
import MainHeaderSection from "../../components/header/MainHeaderSection";
import LoopNewsPost from "../../components/news/LoopNewsPost";
import Breadcrumbs from '../../components/general/Breadcrumbs';
import Loader from "../../components/general/Loader";
import LoopSearchPostsContainer from "../../components/loop/LoopSearchPostsContainer";
import SiteInfoContext from "../../constants/SiteInfoContext";
import PageHeaderOrSlider from "../../extra/PageHeaderOrSlider";

const sort_options = [
    {value: 'desc', label: 'Najwcześniej dodane'},
    {value: 'asc', label: 'Najpóźniej dodane'},
];
const SearchPage = (props) => {
    const container = React.useRef(null);
    const query = (new URLSearchParams(window.location.search)).get('q');

    const siteInfo = React.useContext(SiteInfoContext);

    const [loading, setLoading] = React.useState(true);
    const [posts, setPosts] = React.useState([]);
    const [sort, setSort] = React.useState('asc');

    React.useEffect(() => {

        setTimeout(() => {
            window.scrollTo({top: 700});
        }, 1);
        if (!query) return;

        API.getPosts({
            query,
            order: sort,
            orderby: 'date',
        }).then(res => {
            setPosts(res.data.contents);
            setLoading(false);
        });

        setLoading(false);

    }, [query, sort]);

    function changeSort() {
        if (sort === 'desc') setSort('asc');
        if (sort === 'asc') setSort('desc');
    }

    if (!!loading)
        return <Loader/>;

    return (
        <>
            <MainHeaderSection extra_classes="subpage">
                <Breadcrumbs breadcrumbs={[{label: "Visit.ustron.pl", to: "/"}, {label: "Szukaj"}]}/>
                <PageHeaderOrSlider page={siteInfo.site_info.default_content}/>
            </MainHeaderSection>

            {posts.length === 0 ?
                <div className={'empty-search-comunicate'}>
                    <p>Nie znaleziono nic pod podane kryteria wyszukiwania</p>
                </div> :
                <LoopSearchPostsContainer
                    onRef={el => container.current = el}
                    extra_classes={props.containerClasses}
                    heading={props.containerHeader}
                    sort_options={sort_options}
                    sortOnChange={() => changeSort()}
                >

                    {!loading && posts && !!posts.length &&
                    posts.map((item, index) => (
                        <LoopNewsPost key={index} {...item}/>
                    ))
                    }
                    {loading && <Loader style={{width: "100%"}}/>}
                </LoopSearchPostsContainer>
            }
        </>
    )
}

export default SearchPage;