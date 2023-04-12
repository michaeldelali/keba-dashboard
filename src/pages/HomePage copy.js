import React, { useState, useEffect } from 'react';
import { Route,Switch,Redirect } from "react-router-dom";
import { DefinedRoutes } from "../routes";
// import Layout from '../components/Layout';

// pages
import Menu from "./Menus";
import AddMenu from './AddMenu';
import Employees from "./Employees";
import AddEmployee from './AddEmployee';
import Tables from './Tables';
import AddTable from './AddTable';
import Upgrade from "./Upgrade";
import DashboardOverview from "./dashboard/DashboardOverview";
import Transactions from "./Transactions";
import Settings from "./Settings";
import BootstrapTables from "./tables/BootstrapTables";
import Signin from "./examples/Signin";
import Signup from "./examples/Signup";
import ForgotPassword from "./examples/ForgotPassword";
import ResetPassword from "./examples/ResetPassword";
import Lock from "./examples/Lock";
import NotFoundPage from "./examples/NotFound";
import ServerError from "./examples/ServerError";
// import Unauthorized from './components/Unauthorized';

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

const RouteWithLoader = ({ element: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route {...rest} render={props => ( <> <Preloader show={loaded ? false : true} /> <Component {...props} /> </> ) } />
  );
};

const RouteWithSidebar = ({ element: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem('settingsVisible') === 'false' ? false : true
  }

  const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem('settingsVisible', !showSettings);
  }

  return (
    <Route {...rest} render={props => (
      <>
        <Preloader show={loaded ? false : true} />
        <Sidebar />

        <main className="content">
          <Navbar />
          <Component {...props} />
          <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
        </main>
      </>
    )}
    />
  );
};

export default () => (
<Switch>
      {/* <RouteWithLoader exact path={DefinedRoutes.Presentation.path} element={Presentation} /> */}
      <RouteWithLoader exact path={DefinedRoutes.Signin.path} element={Signin} />
      <RouteWithLoader exact path={DefinedRoutes.Signup.path} element={Signup} />
      <RouteWithLoader exact path={DefinedRoutes.ForgotPassword.path} element={ForgotPassword} />
      <RouteWithLoader exact path={DefinedRoutes.ResetPassword.path} element={ResetPassword} />
      <RouteWithLoader exact path={DefinedRoutes.Lock.path} element={Lock} />
      <RouteWithLoader exact path={DefinedRoutes.NotFound.path} element={NotFoundPage} />
      <RouteWithLoader exact path={DefinedRoutes.ServerError.path} element={ServerError} />

      {/* pages */}
      <RouteWithSidebar exact path={DefinedRoutes.DashboardOverview.path} element={DashboardOverview} />
      <RouteWithSidebar exact path={DefinedRoutes.Upgrade.path} element={Upgrade} />
      <RouteWithSidebar exact path={DefinedRoutes.Transactions.path} element={Transactions} />
      <RouteWithSidebar exact path={DefinedRoutes.Settings.path} element={Settings} />
      <RouteWithSidebar exact path={DefinedRoutes.Menus.path} element={Menu} />
      <RouteWithSidebar exact path={DefinedRoutes.AddMenu.path} element={AddMenu} />
      <RouteWithSidebar exact path={DefinedRoutes.Employees.path} element={Employees} />
      <RouteWithSidebar exact path={DefinedRoutes.AddEmployee.path} element={AddEmployee} />
      <RouteWithSidebar exact path={DefinedRoutes.Tables.path} element={Tables} />
      <RouteWithSidebar exact path={DefinedRoutes.AddTable.path} element={AddTable} />
      <RouteWithSidebar exact path={DefinedRoutes.BootstrapTables.path} element={BootstrapTables} />

      {/* components */}
      {/* <RouteWithSidebar exact path={DefinedRoutes.Accordions.path} element={Accordion} />
      <RouteWithSidebar exact path={DefinedRoutes.Alerts.path} element={Alerts} />
      <RouteWithSidebar exact path={DefinedRoutes.Badges.path} element={Badges} />
      <RouteWithSidebar exact path={DefinedRoutes.Breadcrumbs.path} element={Breadcrumbs} />
      <RouteWithSidebar exact path={DefinedRoutes.Buttons.path} element={Buttons} />
      <RouteWithSidebar exact path={DefinedRoutes.Forms.path} element={Forms} />
      <RouteWithSidebar exact path={DefinedRoutes.Modals.path} element={Modals} />
      <RouteWithSidebar exact path={DefinedRoutes.Navs.path} element={Navs} />
      <RouteWithSidebar exact path={DefinedRoutes.Navbars.path} element={Navbars} />
      <RouteWithSidebar exact path={DefinedRoutes.Pagination.path} element={Pagination} />
      <RouteWithSidebar exact path={DefinedRoutes.Popovers.path} element={Popovers} />
      <RouteWithSidebar exact path={DefinedRoutes.Progress.path} element={Progress} />
      <RouteWithSidebar exact path={DefinedRoutes.Tables.path} element={Tables} />
      <RouteWithSidebar exact path={DefinedRoutes.Tabs.path} element={Tabs} />
      <RouteWithSidebar exact path={DefinedRoutes.Tooltips.path} element={Tooltips} />
      <RouteWithSidebar exact path={DefinedRoutes.Toasts.path} element={Toasts} /> */}

      {/* documentation */}
      {/* <RouteWithSidebar exact path={DefinedRoutes.DocsOverview.path} element={DocsOverview} />
      <RouteWithSidebar exact path={DefinedRoutes.DocsDownload.path} element={DocsDownload} />
      <RouteWithSidebar exact path={DefinedRoutes.DocsQuickStart.path} element={DocsQuickStart} />
      <RouteWithSidebar exact path={DefinedRoutes.DocsLicense.path} element={DocsLicense} />
      <RouteWithSidebar exact path={DefinedRoutes.DocsFolderStructure.path} element={DocsFolderStructure} />
      <RouteWithSidebar exact path={DefinedRoutes.DocsBuild.path} element={DocsBuild} />
      <RouteWithSidebar exact path={DefinedRoutes.DocsChangelog.path} element={DocsChangelog} /> */}

      <Redirect to={DefinedRoutes.NotFound.path} />
      </Switch>
);
