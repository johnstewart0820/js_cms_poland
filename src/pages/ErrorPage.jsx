import React from "react";
import PageHeaderSection from "../components/header/PageHeaderSection";
import MainHeaderSection from "../components/header/MainHeaderSection";
import '../styles/notFoundPage.scss';
import Breadcrumbs from "../components/general/Breadcrumbs";
import TourismRoutes from "../constants/TourismRoutes";
import {Link} from "react-router-dom";

export default function ErrorPage({error}) {
    return (
        <MainHeaderSection>
            <Breadcrumbs breadcrumbs={[{label: "500"}]}/>
            <PageHeaderSection noDefaultImage>
                <div className="background-error">
                    <div className="page-title">
                        505<br/>
                        <p>
                            {error || 'Wystąpił nieoczekiwany problem ze stroną. Spróbuj ponownie za chwilę'}
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
};
