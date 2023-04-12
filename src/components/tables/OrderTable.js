import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEllipsisH, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Nav, Card, Image, Button, Table, Dropdown, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { DefinedRoutes } from "../../routes";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";


export const OrdersTable = (props) => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate()
  const [orders, setOrders] = useState([]);
  const { auth } = useAuth();

  useEffect(() => {
    const search = props.search;
    var searchRoute = '';
    if (!search) {
      searchRoute = '/orders'
    }
    else {
      searchRoute = '/orders/getBranchOrdersByStatus'
    }

    const paramsData = { branchId: auth?.branchId, status: search }
    axiosPrivate.post(searchRoute,paramsData)
      .then((response) => {
        console.log(response.data);
        setOrders(() => response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axiosPrivate, props.search, auth]);


  const totalOrders = orders.length;

  const handleUserView = (order) => {
    const data = order.props;
    navigate(DefinedRoutes.ViewOrder.path, { state: data })
  }

  const handleUserEdit = (order) => {
      const data = order.props;
      navigate(DefinedRoutes.EditOrder.path, { state: data })
    }

  const removeObject = (id) => {
      const filteredObjects = orders.filter(obj => obj.orderId !== id);
    setOrders(()=>filteredObjects);
    }

  const handleDelete = (id) => {
    console.log("Menu Id :: ",id);
    axiosPrivate.delete('/orders/delete', { data: {orderId:id } })
    .then((response) => {
      console.log("Deleted..",response.data);
      removeObject(id)
    })
  }

  const TableRow = (props) => {
    // console.log("PROPS:: ",props);
    const {
      orderId,
      tableId,
      branchId,
      menuList,
      total,
      addons,
      note,
      paymentMode,
      createdAt,
      status,
      } = props;
    
    const viewVariant = status === "completed" ? "success"
      : status === "cancelled" ? "danger"
        : status === "pending" ? "warning" 
          : status === "processing" ? "info" : "primary";

    return (
      <tr>
        <td>
          <Card.Link as={Link} to={DefinedRoutes.Invoice.path} className="fw-normal">
            {orderId}
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">
            {tableId}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {menuList}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {total}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {addons}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {branchId}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {note}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {paymentMode}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {
              new Date(createdAt).toLocaleString()
            }
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
              <Dropdown.Item onClick={()=>handleUserView({props})}>
                  <FontAwesomeIcon icon={faEye} className="me-2" /> View
              </Dropdown.Item>
              <Dropdown.Item onClick={()=> handleUserEdit({props})}>
                  <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
              </Dropdown.Item>
              <Dropdown.Item className="text-danger" onClick={()=>handleDelete(orderId)}>
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="order-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">#</th>
              <th className="border-bottom">table ID</th>
              <th className="border-bottom">menulist</th>
              <th className="border-bottom">total</th>
              <th className="border-bottom">addons</th>
              <th className="border-bottom">Branch No</th>
              <th className="border-bottom">note</th>
              <th className="border-bottom">payment Mode</th>
              <th className="border-bottom">Created At</th>
              <th className="border-bottom">status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(t => <TableRow key={`Menu-${t.orderId}`} {...t} />)}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
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
            Showing <b>{totalOrders}</b> out of <b>25</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};
