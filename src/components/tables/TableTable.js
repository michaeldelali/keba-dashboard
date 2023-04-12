
import React,{useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEdit, faEllipsisH,faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {  Nav, Card, Image, Button, Table, Dropdown, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";

import { DefinedRoutes } from "../../routes";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";


export const TableTable = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate()
  const [tables,setTables] = useState([]);
  const auth = useAuth();
  
  useEffect(() => {
    console.log("AuthTable:: ",auth)
    axiosPrivate.post("/tables/getAllBranchTables",{branchId:1})
    .then((response) => {
        console.log(response.data);
    setTables(()=> response.data);
        return response.data;
    })
    .catch((error) => {
        console.log(error);
    });
  }, [axiosPrivate,auth]);

  const totalTables = tables.length;

  const handleUserView = (table) => {
    const data = table.props;
    navigate(DefinedRoutes.ViewTable.path, { state: data })
  }

  const handleUserEdit = (table) => {
      const data = table.props;
      navigate(DefinedRoutes.EditTable.path, { state: data })
    }

  const removeObject = (id) => {
      const filteredObjects = tables.filter(obj => obj.tableId !== id);
    setTables(()=>filteredObjects);
    }

  const handleDelete = (id) => {
    console.log("Menu Id :: ",id);
    axiosPrivate.delete('/tables/delete', { data: {tableId:id } })
    .then((response) => {
      console.log("Deleted..",response.data);
      removeObject(id)
    })
  }

  const handleQrCodeGen = (table) => {
    const data = table.props;
    navigate(DefinedRoutes.QrForTable.path, { state: data })
  }

  const TableRow = (props) => {
    // console.log("PROPS:: ",props);
    const { tableId,number,status,branchId } = props;
    console.log("Status:: ",status)
    const viewVariant = status === "available" ? "success"
      : status === "occupied" ? "danger"
        : status === "" ? "reserved" : "primary";

    return (
      <tr>
        <td>
          <Card.Link as={Link} to={DefinedRoutes.Invoice.path} className="fw-normal">
            {tableId}
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">
            {number}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {branchId}
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
              <Dropdown.Item onClick={()=> handleQrCodeGen({props})}>
                  <FontAwesomeIcon icon={faEdit} className="me-2" /> QRCode
              </Dropdown.Item>
              <Dropdown.Item className="text-danger" onClick={()=>handleDelete(tableId)}>
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
        <Table hover className="table-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">#</th>
              <th className="border-bottom">Table Number</th>
              <th className="border-bottom">Branch No</th>
              <th className="border-bottom">Status</th>
            </tr>
          </thead>
          <tbody>
            {tables.map(t => <TableRow key={`Menu-${t.tableId}`} {...t} />)}
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
            Showing <b>{totalTables}</b> out of <b>25</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};
