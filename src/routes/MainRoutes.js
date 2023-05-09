import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - machines
const Machines = Loadable(lazy(() => import('pages/machines/Machines')));
const MachineInfo = Loadable(lazy(() => import('pages/machines/MachineInfo')));

const isAuthenticated = localStorage.getItem('token');

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: isAuthenticated ? <Machines /> : <Navigate to='/login' />
        },
        {
            path: 'machines/info',
            element: isAuthenticated ? <MachineInfo /> : <Navigate to='/login' />
        }
    ]
};

export default MainRoutes;
