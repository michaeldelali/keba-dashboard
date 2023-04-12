import React, { useState,useEffect,useRef } from "react";
import { Col, Row, Card, Form, Button} from '@themesberg/react-bootstrap';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

// Orderform component
// ******MSDM********//

export const Orderform = () => {

  const [errMsg, setErrMsg] = useState('');
  const [doneMsg, setDoneMsg] = useState('');
  const axiosPrivate = useAxiosPrivate()

  const errRef = useRef();
  const doneRef = useRef();

  useEffect(() => {
      setErrMsg('');
  }, [])

  const handleOrderFormSubmit = (event) => {
    setErrMsg('')
    event.preventDefault();
    event.stopPropagation();  
    //handle submit post to localhost:4000/orderDetails/add with form data using axios
    axiosPrivate.post('/orders/create', {
        tableId: event.target.tableId.value,
        branchId: event.target.branchId.value,
        menuList: event.target.menuList.value,
        total: event.target.total.value,
        addons: event.target.addons.value,
        note: event.target.note.value,
    })
        .then(function (response) {
            console.log(response);
            setDoneMsg('Order Added Successfully');
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
            setErrMsg('Error occured while adding order - \'Name may already exists\'');
        }
        if (errRef.current !== null) {
          errRef.current.focus();
        }
        });
  }

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Add Order</h5>
        <p ref={errRef} className={errMsg ? "text-danger" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <p ref={doneRef} className={doneMsg ? "text-success" : "offscreen"} aria-live="assertive">{doneMsg}</p>
        <Form onSubmit={handleOrderFormSubmit}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="Table Id">
                <Form.Label>Table Number</Form.Label>
                <Form.Control type="text" name='tableId' placeholder="Enter table number" />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="MenuList">
                <Form.Label>Menu List</Form.Label>
                <Form.Control as='textarea'row={3} name='lastname' placeholder="Enter menulist" />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="total">
                <Form.Label></Form.Label>
                <Form.Control type="number" name='ordername' placeholder="Enter total cost of order" />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="addons">
                <Form.Label>Addons</Form.Label>
                <Form.Control as='textarea'row={3} name='addons' placeholder="Enter addons if any" />
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="branchId">
                <Form.Label>Branch Number</Form.Label>
                <Form.Control type="number" name='branchId' placeholder="Provide the branch Number" />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="payment mode">
                <Form.Label>Payment Mode</Form.Label>
                <Form.Control type="text" name='paymentMode' placeholder="Enter the payment mode eg: MoMo" />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="note">
                <Form.Label>Note</Form.Label>
                <Form.Control as='textarea'row={3} name='note' placeholder="Provide a note is any" />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="status">
                <Form.Label>Status</Form.Label>
                <Form.Select defaultValue="pending" name="status">
                  <option value="pending">pending</option>
                  <option value="completed">completed</option>
                  <option value="cancelled">cancelled</option>
                  <option value="processing">processing</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
              {/* <input type="hidden" name="orderDetailsId" value={1} /> */}
              <input type="hidden" name="restaurantId" value={1} />
              {/* <input type="hidden" name="orderId" value={1} /> */}
          <div className="mt-3">
            <Button variant="primary" type="submit">Add Order</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export const EditOrderForm = (props) => {
  const [errMsg, setErrMsg] = useState('');
  const [doneMsg, setDoneMsg] = useState('');
  const order = props.order;
  const [edit, setEdit] = useState({});
  const [orderDetails, setOrderDetails] = useState({
    orderId:'',
    branchId: '',
    tableId: '',
    menuList: '',
    total: '',
    addons: '',
    note: '',
    status: '',
    paymentMode: '',
    restaurantId: '',
  });
  const axiosPrivate = useAxiosPrivate()

  const errRef = useRef();
  const doneRef = useRef();

  useEffect(() => {
      setErrMsg('');
      setDoneMsg('');
    //   set orderDetails to props.orderDetails
    setOrderDetails(()=> order)
    // check if there are props values else return to previous page
    if (orderDetails === undefined) {
        window.history.back();
    }
    }, [order, orderDetails]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEdit((prevState) => ({
          ...prevState,
          [name]: value,
          orderId: orderDetails.orderId
        }));
    };
    
  const handleEmpoyeeEditFormSubmit = (event) => {
    setErrMsg('');
    setDoneMsg('');
    event.preventDefault();
    event.stopPropagation();  
    (Object.keys(edit).length === 0 && edit.constructor === Object)? setErrMsg('No changes made'): 
    //handle submit post to localhost:4000/orderDetails/add with form data using axios
    axiosPrivate.put('/orders/updateOrder',edit)
        .then(function (response) {
            setDoneMsg('Order updated successfully');
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
            setErrMsg('Error occured while editing Order Details');
        }
        if (errRef.current !== null) {
          errRef.current.focus();
        }
        });
  }

  return (

    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Edit Order - {(orderDetails.orderId)}</h5>
        <p ref={errRef} className={errMsg ? "text-danger" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <p ref={doneRef} className={doneMsg ? "text-success" : "offscreen"} aria-live="assertive">{doneMsg}</p>
        <Form onSubmit={handleEmpoyeeEditFormSubmit}>
        <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="Table Id">
                <Form.Label>Table Number</Form.Label>
                <Form.Control type="text" name='tableId' placeholder="Enter table number" onChange={handleChange} defaultValue={orderDetails.tableId}/>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="MenuList">
                <Form.Label>Menu List</Form.Label>
                <Form.Control as='textarea'row={3} name='lastname' placeholder="Enter menulist" onChange={handleChange} defaultValue={orderDetails.menuList}/>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="total">
                <Form.Label></Form.Label>
                <Form.Control type="number" name='ordername' placeholder="Enter total cost of order" onChange={handleChange} defaultValue={orderDetails.total}/>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="addons">
                <Form.Label>Addons</Form.Label>
                <Form.Control as='textarea'row={3} name='addons' placeholder="Enter addons if any" onChange={handleChange} defaultValue={orderDetails.addons}/>
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="branchId">
                <Form.Label>Branch Number</Form.Label>
                <Form.Control type="number" name='branchId' placeholder="Provide the branch Number" onChange={handleChange} defaultValue={orderDetails.branchId}/>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="payment mode">
                <Form.Label>Payment Mode</Form.Label>
                <Form.Control type="text" name='paymentMode' placeholder="Enter the payment mode eg: MoMo" onChange={handleChange} defaultValue={orderDetails.paymentMode}/>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="note">
                <Form.Label>Note</Form.Label>
                <Form.Control as='textarea'row={3} name='note' placeholder="Provide a note is any" onChange={handleChange} defaultValue={orderDetails.note}/>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="status">
                <Form.Label>Status</Form.Label>
                <Form.Select name="status" onChange={handleChange}>
                  <option value={orderDetails.status}>{(orderDetails.status).toUpperCase()}</option>
                  <option value="pending">pending</option>
                  <option value="completed">completed</option>
                  <option value="cancelled">cancelled</option>
                  <option value="processing">processing</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-3">
            <Button variant="primary" type="submit">Edit Order</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};


export const ViewOrderForm = (props) => {
    const order = props.order;
    const [orderDetails, setOrderDetails] = useState({
      orderId:'',
      branchId: '',
      tableId: '',
      menuList: '',
      total: '',
      addons: '',
      note: '',
      status: '',
      paymentMode: '',
      restaurantId: '',
    });

    useEffect(() => {
      //   set orderDetails to props.orderDetails
      setOrderDetails(()=> order)
      // check if there are props values else return to previous page
      if (orderDetails === undefined) {
          window.history.back();
      }
      console.log('Order:::',orderDetails)
      }, [order, orderDetails]);
      

    return (
  
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">Viewing Order With ID: {orderDetails.orderId}</h5>
          <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="Table Id">
                <Form.Label>Table Number</Form.Label>
                <Form.Control type="text" name='tableId' placeholder="Enter table number" readOnly value={orderDetails.tableId}/>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="MenuList">
                <Form.Label>Menu List</Form.Label>
                <Form.Control as='textarea'row={3} name='lastname' placeholder="Enter menulist" readOnly value={orderDetails.menuList}/>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="total">
                <Form.Label></Form.Label>
                <Form.Control type="number" name='ordername' placeholder="Enter total cost of order" readOnly value={orderDetails.total}/>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="addons">
                <Form.Label>Addons</Form.Label>
                <Form.Control as='textarea'row={3} name='addons' placeholder="Enter addons if any" readOnly value={orderDetails.addons}/>
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="branchId">
                <Form.Label>Branch Number</Form.Label>
                <Form.Control type="number" name='branchId' placeholder="Provide the branch Number" readOnly value={orderDetails.branchId}/>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="payment mode">
                <Form.Label>Payment Mode</Form.Label>
                <Form.Control type="text" name='paymentMode' placeholder="Enter the payment mode eg: MoMo" readOnly value={orderDetails.paymentMode}/>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="note">
                <Form.Label>Note</Form.Label>
                <Form.Control as='textarea'row={3} name='note' placeholder="Provide a note is any" readOnly value={orderDetails.note}/>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="status">
                <Form.Label>Status</Form.Label>
                <Form.Select name="status" readOnly>
                  <option value={orderDetails.status}>{orderDetails.status.toUpperCase()}</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          </Form>
        </Card.Body>
      </Card>
    );
    };