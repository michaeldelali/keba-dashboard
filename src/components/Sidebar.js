
import React, { useState } from "react";
import SimpleBar from 'simplebar-react';
import { useLocation } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChartPie, faCog, faHandHoldingUsd, faSignOutAlt, faTable, faTimes, faPlusCircle, faBars, faUsers, faBuilding } from "@fortawesome/free-solid-svg-icons";
import { Nav, Badge, Image, Button, Dropdown, Accordion, Navbar } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { DefinedRoutes } from "../routes";
// import ReactHero from "../assets/img/technologies/react-hero-logo.svg";
import ReactHero from "../assets/img/brand/keba.jpg";
import ProfilePicture from "../assets/img/team/profile-picture-3.jpg";

export default (props = {}) => {
  const location = useLocation();
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const showClass = show ? "show" : "";

  const onCollapse = () => setShow(!show);

  const CollapsableNavItem = (props) => {
    const { eventKey, title, icon, children = null } = props;
    const defaultKey = pathname.indexOf(eventKey) !== -1 ? eventKey : "";

    return (
      <Accordion as={Nav.Item} defaultActiveKey={defaultKey}>
        <Accordion.Item eventKey={eventKey}>
          <Accordion.Button as={Nav.Link} className="d-flex justify-content-between align-items-center">
            <span>
              <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span>
              <span className="sidebar-text">{title}</span>
            </span>
          </Accordion.Button>
          <Accordion.Body className="multi-level">
            <Nav className="flex-column">
              {children}
            </Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  };

  const NavItem = (props) => {
    const { title, link, external, target, icon, image, badgeText, badgeBg = "secondary", badgeColor = "primary" } = props;
    const classNames = badgeText ? "d-flex justify-content-start align-items-center justify-content-between" : "";
    const navItemClassName = link === pathname ? "active" : "";
    const linkProps = external ? { href: link } : { as: Link, to: link };

    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {icon ? <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span> : null}
            {image ? <Image src={image} width={20} height={20} className="sidebar-icon svg-icon" /> : null}

            <span className="sidebar-text">{title}</span>
          </span>
          {badgeText ? (
            <Badge pill bg={badgeBg} text={badgeColor} className="badge-md notification-count ms-2">{badgeText}</Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    );
  };

  return (
    <>
      <Navbar expand={false} collapseOnSelect variant="dark" className="navbar-theme-primary px-4 d-md-none">
        <Navbar.Brand className="me-lg-5" as={Link} to={DefinedRoutes.DashboardOverview.path}>
          <Image src={ReactHero} className="navbar-brand-light" />
        </Navbar.Brand>
        <Navbar.Toggle as={Button} aria-controls="main-navbar" onClick={onCollapse}>
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
      </Navbar>
      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <SimpleBar className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}>
          <div className="sidebar-inner px-4 pt-3">
            <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
              <div className="d-flex align-items-center">
                <div className="user-avatar lg-avatar me-4">
                  <Image src={ProfilePicture} className="card-img-top rounded-circle border-white" />
                </div>
                <div className="d-block">
                  <h6>Hi, Jane</h6>
                  <Button as={Link} variant="secondary" size="xs" to={DefinedRoutes.Signin.path} className="text-dark">
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Sign Out
                  </Button>
                </div>
              </div>
              <Nav.Link className="collapse-close d-md-none" onClick={onCollapse}>
                <FontAwesomeIcon icon={faTimes} />
              </Nav.Link>
            </div>
            <Nav className="flex-column pt-3 pt-md-0">
              {/* <NavItem title="K3BA" link={DefinedRoutes.Presentation.path} image={ReactHero} /> */}

              <NavItem title="Overview" link={DefinedRoutes.DashboardOverview.path} icon={faChartPie} />
              <NavItem title="Menu" icon={faBars} link={DefinedRoutes.Menus.path} />
              <NavItem title="Employees" icon={faUsers} link={DefinedRoutes.Employees.path} />
              <NavItem title="Tables" icon={faTable} link={DefinedRoutes.Tables.path} />
              <NavItem title="Branches" icon={faBuilding} link={DefinedRoutes.Branches.path} />
         

              {/* Order  */}
              <CollapsableNavItem eventKey="order/" title="Order" icon={faHandHoldingUsd} >
                <NavItem title="All" link={DefinedRoutes.Orders.path} />
                <NavItem title="Pending" link={DefinedRoutes.OrderPending.path} />
                <NavItem title="Proccessing" link={DefinedRoutes.OrderProcessing.path} />
                <NavItem title="Completed" link={DefinedRoutes.OrderCompleted.path} />
                <NavItem title="Cancelled" link={DefinedRoutes.OrderCancelled.path} />
              </CollapsableNavItem>

              <CollapsableNavItem eventKey="examples/" title="Add " icon={faPlusCircle}>
                <NavItem title="Add Dish" link={DefinedRoutes.AddMenu.path} />
                <NavItem title="Add Employee" link={DefinedRoutes.AddEmployee.path}/>
                <NavItem title="Add Table" link={DefinedRoutes.AddTable.path}/>
              </CollapsableNavItem>
              <Dropdown.Divider className="my-3 border-indigo" />
              <NavItem title="Settings" icon={faCog} link={DefinedRoutes.Settings.path} />            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};
