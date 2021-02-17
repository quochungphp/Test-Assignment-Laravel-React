import React from 'react';
import NotfoundPage from '../frontend/containers/NotfoundPage';
import Users from '../frontend/containers/Users';
import Organisation from '../frontend/containers/Organisation';


const routes = [
    {
        path: '/home',
        exact: true,
        main: () => <Users />
    },
    {
        path: '/organisation',
        exact: true,
        main: () => <Organisation />
    },
    {
        path: '',
        exact: true,
        main: () => <NotfoundPage />
    },

];

export default routes;
