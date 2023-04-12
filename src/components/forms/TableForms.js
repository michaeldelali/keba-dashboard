import React, { useState,useEffect,useRef } from "react";
import { Col, Row, Card, Form, Button} from '@themesberg/react-bootstrap';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";

// Tableform component
// ******MSDM********//



export const Tableform = () => {

  const [errMsg, setErrMsg] = useState('');
  const [doneMsg, setDoneMsg] = useState('');
  const axiosPrivate = useAxiosPrivate()
  const auth = useAuth();

  const errRef = useRef();
  const doneRef = useRef();

  useEffect(() => {
      setErrMsg('');
      console.log("TableForm BranchId :: ",auth.auth?.branchId)
  }, [])

  const handleTableFormSubmit = (event) => {
    setErrMsg('')
    event.preventDefault();
    event.stopPropagation();  
    //handle submit post to localhost:4000/tableDetails/add with form data using axios
    axiosPrivate.post('/tables/create', {
        number: event.target.tableNumber.value,
        status: event.target.status.value,
        branchId: auth.auth.branchId,
    })
        .then(function (response) {
            console.log(response);
            setDoneMsg('Table Added Successfully');
        })
        .catch(function (err) {
            console.log("ERORR");
          if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 400) {
            setErrMsg('Missing Details');
        } else if (err.response?.status === 401) {
            setErrMsg('Unauthorized');
        } else {
            setErrMsg('Error occured while adding employee - \'Name may already exists\'');
        }
        if (errRef.current !== null) {
          errRef.current.focus();
        }
        });
  }

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Add Table</h5>
        <p ref={errRef} className={errMsg ? "text-danger" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <p ref={doneRef} className={doneMsg ? "text-success" : "offscreen"} aria-live="assertive">{doneMsg}</p>
        <Form onSubmit={handleTableFormSubmit}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="tableNumber">
                <Form.Label>Table Number</Form.Label>
                <Form.Control required type="number" name='tableNumber' placeholder="Enter the table number" />
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="status">
                <Form.Label>Status</Form.Label>
                <Form.Select defaultValue="available" name="status">
                <option value="available">Available</option>
                  <option value="occupied">occupied</option>
                  <option value="reserved">reserved</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
          </Row>
          <div className="mt-3">
            <Button variant="primary" type="submit">Add Table</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export const EditTableForm = (props) => {
  const [errMsg, setErrMsg] = useState('');
  const [doneMsg, setDoneMsg] = useState('');
  const table = props.table;
  const [edit, setEdit] = useState({});
  const [tableDetails, setUserDetails] = useState({
    tableId: '',
    number: '',
    status: ''
  });
  const axiosPrivate = useAxiosPrivate()

  const errRef = useRef();
  const doneRef = useRef();

  useEffect(() => {
      setErrMsg('');
      setDoneMsg('');
    //   set tableDetails to props.tableDetails
    setUserDetails(()=> table)
    // check if there are props values else return to previous page
    if (tableDetails === undefined) {
        window.history.back();
    }
    }, [table, tableDetails]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEdit((prevState) => ({
          ...prevState,
          [name]: value,
          tableId: tableDetails.tableId
        }));
    };
    
  const handleEmpoyeeEditFormSubmit = (event) => {
    setErrMsg('');
    setDoneMsg('');
    event.preventDefault();
    event.stopPropagation();  
    (Object.keys(edit).length === 0 && edit.constructor === Object)? setErrMsg('No changes made'): 
    //handle submit post to localhost:4000/tableDetails/add with form data using axios
    axiosPrivate.put('/tables/update',edit)
        .then(function (response) {
            setDoneMsg('Empoyee updated successfully');
            setEdit(()=> ({}))
        })
        .catch(function (err) {
          if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 400) {
            setErrMsg('Missing Details');
        } else if (err.response?.status === 401) {
            setErrMsg('Unauthorized');
        } else {
            setErrMsg('Error occured while editing User Details');
        }
        if (errRef.current !== null) {
          errRef.current.focus();
        }
        });
  }

  return (

    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Edit Table - {tableDetails.number}</h5>
        <p ref={errRef} className={errMsg ? "text-danger" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <p ref={doneRef} className={doneMsg ? "text-success" : "offscreen"} aria-live="assertive">{doneMsg}</p>
        <Form onSubmit={handleEmpoyeeEditFormSubmit}>
        {/* defaultValue={tableDetails.firstname} onChange={handleChange} */}
        <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="tableNumber">
                <Form.Label>Table Number</Form.Label>
                <Form.Control required type="number" name='tableNumber' placeholder="Enter the table number"  defaultValue={tableDetails.number} onChange={handleChange}/>
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="status">
                <Form.Label>Status</Form.Label>
                <Form.Select name="status" onChange={handleChange}>
                  <option value={tableDetails.status}>{tableDetails.status.toUpperCase}</option>
                  <option value="available">Available</option>
                  <option value="occupied">occupied</option>
                  <option value="reserved">reserved</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
            <div className="mt-3">
            <Button variant="primary" type="submit">Edit Table</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};


export const ViewTableForm = (props) => {
    const table = props.table;
    const [tableDetails, setUserDetails] = useState({
      tableId:'',
      number: '',
      status: ''
    });

    useEffect(() => {
      //   set tableDetails to props.tableDetails
      setUserDetails(()=> table)
      // check if there are props values else return to previous page
      if (tableDetails === undefined) {
          window.history.back();
      }
      console.log('Table:::',tableDetails)
      }, [table, tableDetails]);
      

    return (
  
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">Edit Empoyee - {tableDetails.number}</h5>
          <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="tableNumber">
                <Form.Label>Table Number</Form.Label>
                <Form.Control readOnly type="number" name='tableNumber' placeholder="Enter the table number"  value={tableDetails.number} />
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="status">
                <Form.Label>Status</Form.Label>
                <Form.Select name="status" readOnly>
                  <option value={tableDetails.status}>{tableDetails.status.toUpperCase}</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
          </Row>
          </Form>
        </Card.Body>
      </Card>
    );
    };