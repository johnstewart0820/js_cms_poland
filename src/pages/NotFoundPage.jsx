import React from "react";
import PageHeaderSection from "../components/header/PageHeaderSection";
import MainHeaderSection from "../components/header/MainHeaderSection";
import '../styles/notFoundPage.scss';
import Breadcrumbs from "../components/general/Breadcrumbs";
import TourismRoutes from "../constants/TourismRoutes";
import {Link} from "react-router-dom";

export default function NotFoundPage() {
    return (
        <MainHeaderSection>
            <Breadcrumbs breadcrumbs={[{ label: "404" }]}/>
            <PageHeaderSection extra_classes="not-found-page" noDefaultImage>
                <div className="background-error">
                    <div className="page-title">
                        404<br/>
                        <p>
                            Strona o podanym adresie nie została znaleziona
                        </p>
                        <Link
                            className="button-link green full-width"
                            to={TourismRoutes.Main}
                        >
                            wróc na glowną
                        </Link>
                    </div>
                </div>
            </PageHeaderSection>
        </MainHeaderSection>
    );
}
