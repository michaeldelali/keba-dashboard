
import React,{useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEdit, faEllipsisH,faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {  Nav, Card, Image, Button, Table, Dropdown, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { DefinedRoutes } from "../../routes";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";


export const EmployeeTable = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate()
  const [users,setUsers] = useState([]);
  
  useEffect(() => {
    axiosPrivate.get("/users")
    .then((response) => {
        console.log(response.data);
    setUsers(()=> response.data);
        return response.data;
    })
    .catch((error) => {
        console.log(error);
    });
  }, [axiosPrivate]);

  const totalUsers = users.length;

  const handleUserView = (user) => {
    const data = user.props;
    navigate(DefinedRoutes.ViewEmployee.path, { state: data })
  }

  const handleUserEdit = (user) => {
      const data = user.props;
      navigate(DefinedRoutes.EditEmployee.path, { state: data })
    }

  const removeObject = (id) => {
      const filteredObjects = users.filter(obj => obj.userId !== id);
    setUsers(()=>filteredObjects);
    }

  const handleDelete = (id) => {
    console.log("Menu Id :: ",id);
    axiosPrivate.delete('/users/delete', { data: {userId:id } })
    .then((response) => {
      console.log("Deleted..",response.data);
      removeObject(id)
    })
  }

  const TableRow = (props) => {
    // console.log("PROPS:: ",props);
    const { userId,firstname, lastname, username, email, branchId, roles, status } = props;
    
    const viewVariant = status === "active" ? "success"
      : status === "inactive" ? "danger"
        : status === "" ? "warning" : "primary";

    return (
      <tr>
        <td>
          <Card.Link as={Link} to={DefinedRoutes.Invoice.path} className="fw-normal">
            {userId}
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">
            {firstname}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {lastname}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {username}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {email}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {branchId}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {roles}
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
              <Dropdown.Item className="text-danger" onClick={()=>handleDelete(userId)}>
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
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">#</th>
              <th className="border-bottom">Firstname</th>
              <th className="border-bottom">Lastname</th>
              <th className="border-bottom">Username</th>
              <th className="border-bottom">Email</th>
              <th className="border-bottom">Branch No</th>
              <th className="border-bottom">Role</th>
              <th className="border-bottom">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map(t => <TableRow key={`Menu-${t.userId}`} {...t} />)}
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
            Showing <b>{totalUsers}</b> out of <b>25</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};
