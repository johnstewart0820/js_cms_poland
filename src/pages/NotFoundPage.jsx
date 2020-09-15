import React from "react";
import PageHeaderSection from "../components/header/PageHeaderSection";
import MainHeaderSection from "../components/header/MainHeaderSection";
import '../styles/notFoundPage.scss';
import Breadcrumbs from "../components/general/Breadcrumbs";
import TourismRoutes from "../constants/TourismRoutes";

export default function NotFoundPage(props) {
    return (
        <MainHeaderSection>
            <Breadcrumbs breadcrumbs={[{ label: "404" }]}/>
            <PageHeaderSection>
                <div className="background-error">
                    <div className="page-title">
                        404<br/>
                        <p>
                            Strona o podanym adresie nie została znaleziona
                        </p>
                        <button
                            className="button-link green full-width"
                            onClick={TourismRoutes.Main}
                        >
                            wróc na glowną
                        </button>
                    </div>
                </div>
            </PageHeaderSection>
        </MainHeaderSection>
    );
}
