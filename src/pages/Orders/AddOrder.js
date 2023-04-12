import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faCartArrowDown, faChartPie, faChevronDown, faClipboard, faCommentDots, faFileAlt, faPlus, faRocket, faStore } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown } from '@themesberg/react-bootstrap';
import { ChoosePhotoWidget } from "../../components/Widgets";
import { Orderform } from "../../components/forms/OrderForms";
import { Link } from "react-router-dom";
import { DefinedRoutes } from "../../routes";

import Profile3 from "../../assets/img/team/profile-picture-3.jpg";
// import Profile3 from "../assets/img/team/profile-picture-3.jpg";



export default () => {
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <Dropdown>
          <Dropdown.Toggle as={Button} variant="secondary" className="text-dark me-2">
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            <span>New</span>
          </Dropdown.Toggle>
          <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">
            <Dropdown.Item as={Link} to={DefinedRoutes.AddEmployee.path}>
              <FontAwesomeIcon icon={faFileAlt} className="me-2" /> Employee
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <Row>
        <Col xs={12} xl={8}>
          <Orderform/>
        </Col>

        <Col xs={12} xl={4}>
          <Row>
            {/* <Col xs={12}>
              <ProfileCardWidget />
            </Col> */}
            <Col xs={12}>
              {/* <ChoosePhotoWidget
                title="Select Menu Image"
                photo={Profile3}
              /> */}
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
