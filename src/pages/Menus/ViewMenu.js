import React from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faCartArrowDown, faChartPie, faChevronDown, faClipboard, faCommentDots, faFileAlt, faPlus, faRocket, faStore } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown } from '@themesberg/react-bootstrap';
import { ChoosePhotoWidget } from "../../components/Widgets"
import { ViewMenuForm } from "../../components/forms/MenuForms"
import Profile3 from "../../assets/img/team/profile-picture-3.jpg";
import { Link } from "react-router-dom";
import { DefinedRoutes } from "../../routes";


export default () => {
  const {state} = useLocation();
  console.log(state)
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <Dropdown>
          <Dropdown.Toggle as={Button} variant="secondary" className="text-dark me-2">
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            <span>New</span>
          </Dropdown.Toggle>
          <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">
            <Dropdown.Item as={Link} to={DefinedRoutes.AddMenu.path}>
              <FontAwesomeIcon icon={faFileAlt} className="me-2" /> Dish
            </Dropdown.Item>
{/* 
            <Dropdown.Divider />

            <Dropdown.Item>
              <FontAwesomeIcon icon={faRocket} className="text-danger me-2" /> Subscription Plan
              </Dropdown.Item> */}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <Row>
        <Col xs={12} xl={8}>
          <ViewMenuForm menu={state}/>
        </Col>

        <Col xs={12} xl={4}>
          <Row>
            {/* <Col xs={12}>
              <ProfileCardWidget />
            </Col> */}
            <Col xs={12}>
              <ChoosePhotoWidget
                title="Select Menu Image"
                photo={Profile3}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
