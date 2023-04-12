import React, { useState,useEffect,useRef } from "react";
import { Col, Row, Card, Form, Button} from '@themesberg/react-bootstrap';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

// Employeeform component
// ******MSDM********//

export const Employeeform = () => {

  const [errMsg, setErrMsg] = useState('');
  const [doneMsg, setDoneMsg] = useState('');
  const axiosPrivate = useAxiosPrivate()

  const errRef = useRef();
  const doneRef = useRef();

  useEffect(() => {
      setErrMsg('');
  }, [])

  const handleEmployeeFormSubmit = (event) => {
    setErrMsg('')
    event.preventDefault();
    event.stopPropagation();  
    //handle submit post to localhost:4000/userDetails/add with form data using axios
    axiosPrivate.post('/users/create', {
        firstname: event.target.firstname.value,
        lastname: event.target.lastname.value,
        username: event.target.username.value,
        email: event.target.email.value,
        roles: event.target.roles.value,
        restaurantId: event.target.restaurantId.value,
        password: event.target.password.value,
        // userId: event.target.userId.value,
        status: event.target.status.value,
        branchId: event.target.branchId.value,
    })
        .then(function (response) {
            console.log(response);
            setDoneMsg('Employee Added Successfully');
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
        <h5 className="mb-4">Add Employee</h5>
        <p ref={errRef} className={errMsg ? "text-danger" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <p ref={doneRef} className={doneMsg ? "text-success" : "offscreen"} aria-live="assertive">{doneMsg}</p>
        <Form onSubmit={handleEmployeeFormSubmit}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstname">
                <Form.Label>First Name</Form.Label>
                <Form.Control required type="text" name='firstname' placeholder="Enter first name" />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="lastname">
                <Form.Label>Last Name</Form.Label>
                <Form.Control required type="text" name='lastname' placeholder="Enter last name" />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name='username' placeholder="Enter username" />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control required type="email" name='email' placeholder="Enter email" />
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control required type="password" name='password' placeholder="Provide a password" />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="status">
                <Form.Label>Status</Form.Label>
                <Form.Select defaultValue="active" name="status">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="roles">
                <Form.Label>Role</Form.Label>
                <Form.Select defaultValue="admin" name="roles">
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="salesperson">Salesperson</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="price">
                <Form.Label>Branch Number</Form.Label>
                <Form.Control required type="number" name="branchId" placeholder="Provide the branch number" />
              </Form.Group>
            </Col>
          </Row>
              {/* <input type="hidden" name="userDetailsId" value={1} /> */}
              <input type="hidden" name="restaurantId" value={1} />
              {/* <input type="hidden" name="userId" value={1} /> */}
          <div className="mt-3">
            <Button variant="primary" type="submit">Add Employee</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export const EditEmployeeForm = (props) => {
  const [errMsg, setErrMsg] = useState('');
  const [doneMsg, setDoneMsg] = useState('');
  const user = props.user;
  const [edit, setEdit] = useState({});
  const [userDetails, setUserDetails] = useState({
    userId:'',
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    roles: '',
    restaurantId: '',
    status: '',
    branchId: '',
  });
  const axiosPrivate = useAxiosPrivate()

  const errRef = useRef();
  const doneRef = useRef();

  useEffect(() => {
      setErrMsg('');
      setDoneMsg('');
    //   set userDetails to props.userDetails
    setUserDetails(()=> user)
    // check if there are props values else return to previous page
    if (userDetails === undefined) {
        window.history.back();
    }
    }, [user, userDetails]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEdit((prevState) => ({
          ...prevState,
          [name]: value,
          userId: userDetails.userId
        }));
    };
    
  const handleEmpoyeeEditFormSubmit = (event) => {
    setErrMsg('');
    setDoneMsg('');
    event.preventDefault();
    event.stopPropagation();  
    (Object.keys(edit).length === 0 && edit.constructor === Object)? setErrMsg('No changes made'): 
    //handle submit post to localhost:4000/userDetails/add with form data using axios
    axiosPrivate.put('/users/update',edit)
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
        <h5 className="mb-4">Edit Employee - {(userDetails.firstname).toLocaleUpperCase}, {(userDetails.lastname).toLocaleUpperCase}</h5>
        <p ref={errRef} className={errMsg ? "text-danger" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <p ref={doneRef} className={doneMsg ? "text-success" : "offscreen"} aria-live="assertive">{doneMsg}</p>
        <Form onSubmit={handleEmpoyeeEditFormSubmit}>
        <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstname">
                <Form.Label>First Name</Form.Label>
                <Form.Control  type="text" name='firstname' placeholder="Enter first name" defaultValue={userDetails.firstname} onChange={handleChange}/>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="lastname">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" name='lastname' placeholder="Enter last name" defaultValue={userDetails.lastname} onChange={handleChange}/>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name='username' placeholder="Enter username" defaultValue={userDetails.username} onChange={handleChange}/>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name='email' placeholder="Enter email" defaultValue={userDetails.email} onChange={handleChange}/>
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name='password' placeholder="Provide a password" defaultValue={userDetails.password} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="status">
                <Form.Label>Status</Form.Label>
                <Form.Select name="status"onChange={handleChange}>
                  <option value={userDetails.status}>{(userDetails.status).toUpperCase()}</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="roles">
                <Form.Label>Role</Form.Label>
                <Form.Select defaultValue="admin" name="roles" onChange={handleChange}>
                  <option value={userDetails.roles}>{(userDetails.roles).toUpperCase()}</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="salesperson">Salesperson</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="price">
                <Form.Label>Branch Number</Form.Label>
                <Form.Control type="number" name="branchId" placeholder="Provide the branch number" defaultValue={userDetails.branchId} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>
              {/* <input type="hidden" name="userDetailsId" value={1} /> */}
              <input type="hidden" name="restaurantId" value={1} />
          <div className="mt-3">
            <Button variant="primary" type="submit">Add Employee</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};


export const ViewEmpoyeeForm = (props) => {
    const user = props.user;
    const [userDetails, setUserDetails] = useState({
      userId:'',
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      roles: '',
      restaurantId: '',
      status: '',
      branchId: '',
    });

    useEffect(() => {
      //   set userDetails to props.userDetails
      setUserDetails(()=> user)
      // check if there are props values else return to previous page
      if (userDetails === undefined) {
          window.history.back();
      }
      console.log('Employee:::',userDetails)
      }, [user, userDetails]);
      

    return (
  
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">Edit Empoyee - {(userDetails.firstname).toUpperCase}</h5>
          <Form>
          <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="firstname">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" name='firstname' placeholder="Enter first name" value={userDetails.firstname} readOnly/>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="lastname">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" name='lastnamename' placeholder="Enter last name" value={userDetails.lastname} readOnly/>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" name='username' placeholder="Enter username" value={userDetails.username} readOnly/>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name='email' placeholder="Enter email" value={userDetails.email} readOnly/>
                </Form.Group>
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col md={6} className="mb-3">
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name='password' placeholder="Provide a password" value={userDetails.password} readOnly />
                </Form.Group>
              </Col>
           
              <Col md={6} className="mb-3">
              <Form.Group id="status">
                <Form.Label>Status</Form.Label>
                <Form.Select name="status" readOnly>
                  <option value={userDetails.status}>{(userDetails.status).toUpperCase()}</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="roles">
                <Form.Label>Role</Form.Label>
                <Form.Select name="roles" readOnly>
                  <option value={userDetails.roles}>{(userDetails.roles).toUpperCase()}</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="salesperson">Salesperson</option>
                </Form.Select>
              </Form.Group>
            </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="price">
                  <Form.Label>Branch Number</Form.Label>
                  <Form.Control required type="number" name="branchId" placeholder="Provide the branch number" value={userDetails.branchId} readOnly />
                </Form.Group>
              </Col>
            </Row>
            {/* <div className="mt-3">
              <Button variant="primary" type="submit">Add Employee</Button>
            </div> */}
          </Form>
        </Card.Body>
      </Card>
    );
    };