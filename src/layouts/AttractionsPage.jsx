import React from 'react';
import LoopAttractionPost from "../components/attractions/LoopAttractionPost";
import PaginatedPage from "../components/PaginatedPage";
import useCustomField from "../hooks/useCustomField";
import {withDefaultOption} from "../extra/functions";
import Select from "../components/form/Select";

const AttractionPage = props => {
    const recommendedFor = useCustomField('recomended_for');
    const priceVariants = useCustomField('prices_variant');
    const categories = React.useMemo(() => {
        let obj = {
            key: 'categories',
            label: 'Rodzaj',
            choices: {},
        };

        props.page.acf.field_news_filtering_categories.forEach(category => {
            obj.choices[category.id] = category.name;
        });

        return obj;
    }, []);
    const inputs = React.useMemo(() => {
        const fields = [];

        for (const field of [recommendedFor, categories, priceVariants]) {
            if (!field)
                return null;

            fields.push({
                label: field.label,
                name: field.key,
                options: withDefaultOption(Object.keys(field.choices).map(key => ({value: key, label: field.choices[key]}))),
                Component: Select,
            });
        }

        return fields;
    }, [recommendedFor, categories, priceVariants]);

    return (
        <PaginatedPage
            page={props.page}
            config={props.page.acf.field_information_module_news}
            inputs={inputs}
            itemComponent={LoopAttractionPost}
        />
        /*<>
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
                { loading && <Loader style={{ width: "100%" }}/>}
                { !!data && (
                    <>
                        { data.contents?.length > 0 && data.contents.map((item, index) => (
                            <LoopAttractionPost key={index} {...item}/>
                        ))}

                        <Pagination
                            active_page={data.pages.currentPage}
                            total_amount={data.pages.pageCount}
                            pageChangeCallback={onPageChange}
                        />
                    </>
                )}
                
					 
					{ !!acf?.field_attractions_map && <MapWithPinsFiltering map_id={ acf?.field_attractions_map } /> }
            </LoopSearchPostsContainer>
        </>*/
    )
}

export default AttractionPage;