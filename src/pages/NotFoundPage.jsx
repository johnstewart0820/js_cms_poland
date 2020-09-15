import React from "react";
import PageHeaderSection from "../components/header/PageHeaderSection";
import MainHeaderSection from "../components/header/MainHeaderSection";

export default function NotFoundPage(props) {
    return (
        <MainHeaderSection style={{backgroundImage: 'url("/img/forest.png")', height: '100%'}}>
            <PageHeaderSection >
                <div className="container">
                    <div className="page-title">
                        404<br/>
                        Strona o podanym adresie nie została znaleziona
                    </div>
                </div>
            </PageHeaderSection>
        </MainHeaderSection>
    );
}
