export default {
    Main: '/',
    City: '/city',
    News: '/news',
    PhotoReports: '/photo-reports',
    Accommodations: '/accommodations',
    Gastronomy: '/gastronomy',
    WhatToVisit: '/what-to-visit',
    Login: '/login',
    Registration: '/registration',
    RegistrationConfirmation: '/confirm',
    ActivateAccount: '/activate-account',
    UserProfile: '/profile',
    StadiumReservation: '/courts',
    Reservation: (id = ':id') => `/reservation/${id}`,
    SingleEvent: (id = ':id') => `/events/${id}`,
    SingleNews: (id = ':id') => `/news/${id}`,
    ReservationHistoryPage: '/reservation-history',
    ReservationConfirmationPage: '/reservation-confirmation',
    RegisterToEventList: '/register-event',
    RegisterToEventForm: '/register-event-form',
    RegisterToEventConfirmationPage: '/register-event-confirm',
    ObjectListPage: '/object-list',
    EditObjectFormPage: '/object-edit',
    GameCardsPage: '/game'
};