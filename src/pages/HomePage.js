import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import { DefinedRoutes } from "../routes";
import Layout from '../components/Layout';
import RequireAuth from '../components/RequireAuth';
import PersistLogin from '../components/PersistLogin';

// pages

// import menu pages
import Menu from "./Menus/Menus";
import AddMenu from './Menus/AddMenu';
import EditMenu from './Menus/EditMenu';
import ViewMenu from './Menus/ViewMenu';

// import employee pages
import Employees from "./Employees/Employees";
import AddEmployee from './Employees/AddEmployee';
import EditEmployee from './Employees/EditEmployee';
import ViewEmployee from './Employees/ViewEmployee';

// import table pages
import Tables from "./TableRoom/Table";
import AddTable from './TableRoom/AddTable';
import EditTable from './TableRoom/EditTable';
import ViewTable from './TableRoom/ViewTable';
import QrForTable from './TableRoom/QrForTable';

// import Order pages
import Orders from './Orders/Orders';
import OrdersCancelled from './Orders/OrdersCancelled';
import OrdersCompleted from './Orders/OrdersCompleted';
import OrdersPending from './Orders/OrdersPending';
import OrdersProcessing from './Orders/OrdersProcessing';
import AddOrder from './Orders/AddOrder';
import EditOrder from './Orders/EditOrder';
import ViewOrder from './Orders/ViewOrder';


import Upgrade from "./Upgrade";
import DashboardOverview from "./dashboard/DashboardOverview";
import Transactions from "./Transactions";
import Settings from "./Settings";
import BootstrapTables from "./tables/BootstrapTables";
import Signin from "./Signin";
import Signup from "./examples/Signup";
import ForgotPassword from "./examples/ForgotPassword";
import ResetPassword from "./examples/ResetPassword";
import Lock from "./examples/Lock";
import NotFoundPage from "./examples/NotFound";
import ServerError from "./examples/ServerError";
import Unauthorized from "./examples/UnAuthorized";

// documentation pages
import DocsOverview from "./documentation/DocsOverview";
import DocsDownload from "./documentation/DocsDownload";
import DocsQuickStart from "./documentation/DocsQuickStart";
import DocsLicense from "./documentation/DocsLicense";
import DocsFolderStructure from "./documentation/DocsFolderStructure";
import DocsBuild from "./documentation/DocsBuild";
import DocsChangelog from "./documentation/DocsChangelog";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

import Accordion from "./components/Accordion";
import Alerts from "./components/Alerts";
import Badges from "./components/Badges";
import Breadcrumbs from "./components/Breadcrumbs";
import Buttons from "./components/Buttons";
import Forms from "./components/Forms";
import Modals from "./components/Modals";
import Navs from "./components/Navs";
import Navbars from "./components/Navbars";
import Pagination from "./components/Pagination";
import Popovers from "./components/Popovers";
import Progress from "./components/Progress";
// import Tables from "./components/Tables";
import Tabs from "./components/Tabs";
import Tooltips from "./components/Tooltips";
import Toasts from "./components/Toasts";

const ROLES = {
  "Owner": 1,
  "Admin": 2,
  "Manager": 3,
  "Salesperson": 4,
}


const RouteWithLoader = ({ children, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { loaded, ...rest });
        }
        return child;
      })}
    </>
  );
};

const RouteWithSidebar = ({ children, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem('settingsVisible') === 'false' ? false : true;
  };

  const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem('settingsVisible', !showSettings);
  };

  return (
    <>
      <Preloader show={loaded ? false : true} />
      <Sidebar />
      <main className="content">
        <Navbar />
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { toggleSettings, showSettings, ...rest });
          }
          return child;
        })}
        <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
      </main>
    </>
  );
};

export default () => (
  // TODO - add role based access to routes
  <Routes>
    <Route element={<PersistLogin />}>
      <Route path="/" element={<Layout />}>
        {/* <Route  path={DefinedRoutes.Presentation.path} element={Presentation} /> */}
        <Route path={DefinedRoutes.Signin.path} element={<RouteWithLoader><Signin /></RouteWithLoader>} />
        <Route path={DefinedRoutes.Signup.path} element={<RouteWithLoader><Signup /></RouteWithLoader>} />
        <Route path={DefinedRoutes.ForgotPassword.path} element={<RouteWithLoader><ForgotPassword /></RouteWithLoader>} />
        <Route path={DefinedRoutes.ResetPassword.path} element={<RouteWithLoader><ResetPassword /></RouteWithLoader>} />
        <Route path={DefinedRoutes.Lock.path} element={<RouteWithLoader><Lock /></RouteWithLoader>} />
        <Route path={DefinedRoutes.NotFound.path} element={<RouteWithLoader><NotFoundPage /></RouteWithLoader>} />
        <Route path={DefinedRoutes.ServerError.path} element={<RouteWithLoader><ServerError /></RouteWithLoader>} />


        <Route path={DefinedRoutes.Unauthorized.path} element={<RouteWithSidebar><Unauthorized /></RouteWithSidebar>} />

        {/* ADMIN,OWNER,MANAGER ROLE BASED ACCESS */}
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Owner, ROLES.Manager]} />}>
          {/* Dashboard Routes */}
          <Route path={DefinedRoutes.DashboardOverview.path} element={<RouteWithSidebar><DashboardOverview /></RouteWithSidebar>} />

          {/* Menu Routes */}
          <Route path={DefinedRoutes.Menus.path} element={<RouteWithSidebar><Menu /></RouteWithSidebar>} />
          <Route path={DefinedRoutes.AddMenu.path} element={<RouteWithSidebar><AddMenu /></RouteWithSidebar>} />
          <Route path={DefinedRoutes.EditMenu.path} element={<RouteWithSidebar><EditMenu /></RouteWithSidebar>} />
          <Route path={DefinedRoutes.ViewMenu.path} element={<RouteWithSidebar><ViewMenu /></RouteWithSidebar>} />

          {/* Employee Routes */}
          <Route path={DefinedRoutes.Employees.path} element={<RouteWithSidebar><Employees /></RouteWithSidebar>} />
          <Route path={DefinedRoutes.AddEmployee.path} element={<RouteWithSidebar><AddEmployee /></RouteWithSidebar>} />
          <Route path={DefinedRoutes.EditEmployee.path} element={<RouteWithSidebar><EditEmployee /></RouteWithSidebar>} />
          <Route path={DefinedRoutes.ViewEmployee.path} element={<RouteWithSidebar><ViewEmployee /></RouteWithSidebar>} />
        </Route>

        {/* Order Routes */}
        <Route path={DefinedRoutes.Orders.path} element={<RouteWithSidebar><Orders /></RouteWithSidebar>} />
        <Route path={DefinedRoutes.AddOrder.path} element={<RouteWithSidebar><AddOrder /></RouteWithSidebar>} />
        <Route path={DefinedRoutes.EditOrder.path} element={<RouteWithSidebar><EditOrder /></RouteWithSidebar>} />
        <Route path={DefinedRoutes.ViewOrder.path} element={<RouteWithSidebar><ViewOrder /></RouteWithSidebar>} />
        <Route path={DefinedRoutes.OrderPending.path} element={<RouteWithSidebar><OrdersPending /></RouteWithSidebar>} />
        <Route path={DefinedRoutes.OrderProcessing.path} element={<RouteWithSidebar><OrdersProcessing /></RouteWithSidebar>} />
        <Route path={DefinedRoutes.OrderCompleted.path} element={<RouteWithSidebar><OrdersCompleted /></RouteWithSidebar>} />
        <Route path={DefinedRoutes.OrderCancelled.path} element={<RouteWithSidebar><OrdersCancelled /></RouteWithSidebar>} />

        {/* Table Routes */}
        <Route path={DefinedRoutes.Tables.path} element={<RouteWithSidebar><Tables /></RouteWithSidebar>} />
        <Route path={DefinedRoutes.AddTable.path} element={<RouteWithSidebar><AddTable /></RouteWithSidebar>} />
        <Route path={DefinedRoutes.EditTable.path} element={<RouteWithSidebar><EditTable /></RouteWithSidebar>} />
        <Route path={DefinedRoutes.ViewTable.path} element={<RouteWithSidebar><ViewTable /></RouteWithSidebar>} />
        <Route path={DefinedRoutes.QrForTable.path} element={<RouteWithSidebar><QrForTable /></RouteWithSidebar>} />

        {/* route to a addMenu with parameters */}
        
      </Route>
      <Route path={DefinedRoutes.Upgrade.path} element={<RouteWithSidebar><Upgrade /></RouteWithSidebar>} />
      <Route path={DefinedRoutes.Transactions.path} element={<RouteWithSidebar><Transactions /></RouteWithSidebar>} />
      <Route path={DefinedRoutes.Settings.path} element={<RouteWithSidebar><Settings /></RouteWithSidebar>} />
      {/* components */}
      {/* <RouteWithSidebar  path={DefinedRoutes.Accordions.path} element={Accordion} />
        <RouteWithSidebar  path={DefinedRoutes.Alerts.path} element={Alerts} />
        <RouteWithSidebar  path={DefinedRoutes.Badges.path} element={Badges} />
        <RouteWithSidebar  path={DefinedRoutes.Breadcrumbs.path} element={Breadcrumbs} />
        <RouteWithSidebar  path={DefinedRoutes.Buttons.path} element={Buttons} />
        <RouteWithSidebar  path={DefinedRoutes.Forms.path} element={Forms} />
        <RouteWithSidebar  path={DefinedRoutes.Modals.path} element={Modals} />
        <RouteWithSidebar  path={DefinedRoutes.Navs.path} element={Navs} />
        <RouteWithSidebar  path={DefinedRoutes.Navbars.path} element={Navbars} />
        <RouteWithSidebar  path={DefinedRoutes.Pagination.path} element={Pagination} />
        <RouteWithSidebar  path={DefinedRoutes.Popovers.path} element={Popovers} />
        <RouteWithSidebar  path={DefinedRoutes.Progress.path} element={Progress} />
        <RouteWithSidebar  path={DefinedRoutes.Tables.path} element={Tables} />
        <RouteWithSidebar  path={DefinedRoutes.Tabs.path} element={Tabs} />
        <RouteWithSidebar  path={DefinedRoutes.Tooltips.path} element={Tooltips} />
        <RouteWithSidebar  path={DefinedRoutes.Toasts.path} element={Toasts} /> */}

      {/* documentation */}
      {/* <RouteWithSidebar  path={DefinedRoutes.DocsOverview.path} element={DocsOverview} />
        <RouteWithSidebar  path={DefinedRoutes.DocsDownload.path} element={DocsDownload} />
        <RouteWithSidebar  path={DefinedRoutes.DocsQuickStart.path} element={DocsQuickStart} />
        <RouteWithSidebar  path={DefinedRoutes.DocsLicense.path} element={DocsLicense} />
        <RouteWithSidebar  path={DefinedRoutes.DocsFolderStructure.path} element={DocsFolderStructure} />
        <RouteWithSidebar  path={DefinedRoutes.DocsBuild.path} element={DocsBuild} />
        <RouteWithSidebar  path={DefinedRoutes.DocsChangelog.path} element={DocsChangelog} /> */}

      {/* <Navigate to={DefinedRoutes.NotFound.path} /> */}
      {/* catch all */}
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);
