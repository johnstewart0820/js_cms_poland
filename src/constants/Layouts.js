import MainHomepage from "../layouts/MainHomepage";
import TourismHomepage from "../layouts/TourismHomepage";
import EventsPage from "../layouts/EventsPage";
import NewsSingle from "../layouts/NewsSingle";
import AttractionPage from "../layouts/AttractionsPage";
import EventSingle from "../layouts/EventSingle";
import TourismGastronomies from "../layouts/TourismGastronomies";
import TourismHotels from "../layouts/TourismHotels";
import AttractionSingle from "../layouts/AttractionSingle";
import TourismCity from "../layouts/TourismCity";
import GastronomySingle from "../layouts/GastronomySingle";
import ApartamentSingle from "../layouts/ApartamentSingle";
import DefaultSingle from "../layouts/DefaultSingle";
import CourtSingle from "../layouts/CourtSingle";
import TourismPaths from "../layouts/TourismPaths";
import TourismDiscounts from "../layouts/TourismDiscounts";
import CommunicationPage from "../layouts/CommunicationPage";
import TourismSpa from "../layouts/TourismSpa";
import SportHomepage from "../layouts/SportHomepage";
import SportRopeRoads from "../layouts/SportRopeRoads";
import SportBikesPage from "../layouts/SportBikesPage";
import UniversalPaginatedLayout from "../layouts/UniversalPaginatedLayout";
import CultureHomepage from "../layouts/CultureHomepage";

export default {
    universal: UniversalPaginatedLayout,
    main_homepage: MainHomepage,
    tourism_homepage: TourismHomepage,
    tourism_events: EventsPage,
    news_single: NewsSingle,
    tourism_attractions: AttractionPage,
    gastronomy_single: GastronomySingle,
    tourism_gastronomies: TourismGastronomies,
    tourism_paths: TourismPaths,
    tourism_city: TourismCity,
    tourism_discounts: TourismDiscounts,
    tourism_spa: TourismSpa,
    events_single: EventSingle,
    attractions_single: AttractionSingle,
    tourism_hotels: TourismHotels,
    apartament_single: ApartamentSingle,
    default_single: DefaultSingle,
    courts_single: CourtSingle,
    communication_page: CommunicationPage,
    // Sport pages
    sport_homepage: SportHomepage,
    sport_paths: SportRopeRoads,
    sport_bikes: SportBikesPage,
    // Culture pages
    culture_homepage: CultureHomepage,
};
