import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEllipsisH, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Nav, Card, Button, Table, Dropdown, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { DefinedRoutes } from "../../routes";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";


export const BranchesTable = (props) => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate()
  const [branches, setBranches] = useState([]);
  const { auth } = useAuth();

  useEffect(() => {
    const searchRoute = '/branch/getBranchByRestaurantId';
    const paramsData = { restaurantId: auth?.restaurantId }
    console.log("PARAMS: ",paramsData)
    axiosPrivate.post(searchRoute,paramsData)
      .then((response) => {
        console.log(response.data);
        setBranches(() => response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axiosPrivate, props.search, auth]);


  const totalBranches = branches.length;

  const handleBranchView = (branch) => {
    const data = branch.props;
    navigate(DefinedRoutes.ViewBranch.path, { state: data })
  }

  const handleBranchEdit = (branch) => {
      const data = branch.props;
      navigate(DefinedRoutes.EditBranch.path, { state: data })
    }

  const removeObject = (id) => {
      const filteredObjects = branches.filter(obj => obj.branchId !== id);
    setBranches(()=>filteredObjects);
    }

  const handleDelete = (id) => {
    axiosPrivate.delete('/branch/delete', { data: {branchId:id } })
    .then((response) => {
      console.log("Deleted..",response.data);
      removeObject(id)
    })
  }

  const TableRow = (props) => {
    // console.log("PROPS:: ",props);
    const {
      branchId,
      name,
      address,
      email,
      openTime,
      openDays,
      phone,
      logo,
      banner,
      paymentMethods,
      status,
      } = props;
    
    const viewVariant = status === "opened" ? "success": "danger";

    return (
      <tr>
        <td>
          <Card.Link as={Link} to={DefinedRoutes.Invoice.path} className="fw-normal">
            {branchId}
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">
            {name}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {address}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {email}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {openTime}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {openDays}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {phone}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {logo}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {banner}
          </span>
        </td>
    
        <td>
          <span className="fw-normal">
           {paymentMethods}
          </span>
        </td>
        <td>
          <span className={`fw-normal text-${viewVariant}`}>
            {status}
          </span>
        </td>
        <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={()=>handleBranchView({props})}>
                  <FontAwesomeIcon icon={faEye} className="me-2" /> View
              </Dropdown.Item>
              <Dropdown.Item onClick={()=> handleBranchEdit({props})}>
                  <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
              </Dropdown.Item>
              <Dropdown.Item className="text-danger" onClick={()=>handleDelete(branchId)}>
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };

  return (
    <Card bbranch="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="branch-table align-items-center">
          <thead>
            <tr>
              <th className="bbranch-bottom">#</th>
              <th className="bbranch-bottom">Name</th>
              <th className="bbranch-bottom">address</th>
              <th className="bbranch-bottom">email</th>
              <th className="bbranch-bottom">openTime</th>
              <th className="bbranch-bottom">openDays</th>
              <th className="bbranch-bottom">phone</th>
              <th className="bbranch-bottom">logo</th>
              <th className="bbranch-bottom">banner</th>
              <th className="bbranch-bottom">payment methods</th>
              <th className="bbranch-bottom">status</th>
            </tr>
          </thead>
          <tbody>
            {branches.map(t => <TableRow key={`Menu-${t.branchId}`} {...t} />)}
          </tbody>
        </Table>
        <Card.Footer className="px-3 bbranch-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev>
                Previous
              </Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Item>5</Pagination.Item>
              <Pagination.Next>
                Next
              </Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{totalBranches}</b> out of <b>25</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};
