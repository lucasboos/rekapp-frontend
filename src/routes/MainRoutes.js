import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - machines
const Machines = Loadable(lazy(() => import('pages/machines/Machines')));
const MachineInfo = Loadable(lazy(() => import('pages/machines/MachineInfo')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <Machines />
        },
        {
            path: 'machines/info',
            element: <MachineInfo />
        }
    ]
};

export default MainRoutes;
