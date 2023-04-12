
import React, { useState,useEffect,useRef } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup,Image,Modal} from '@themesberg/react-bootstrap';
import { faAngleDown, faAngleUp, faChartArea, faChartBar, faChartLine, faFlagUsa, faFolderOpen, faGlobeEurope, faPaperclip, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faAngular, faBootstrap, faReact, faVuejs } from "@fortawesome/free-brands-svg-icons";
import Profile3 from "../../assets/img/team/profile-picture-2.jpg";
// import { axiosPrivate } from "../api/axios";
import useAxiosPrivateForms from "../../hooks/useAxiosPrivateForms";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";


// Menuform component
// ******MSDM********//

export const MenuForm = () => {

  const [errMsg, setErrMsg] = useState('');
  const [doneMsg, setDoneMsg] = useState('');
  const axiosPrivateForms = useAxiosPrivateForms()
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [image, setImage] = useState(Profile3);

  const errRef = useRef();
  const doneRef = useRef();
  const title = 'Select Menu Image'

  useEffect(() => {
      setErrMsg('');
      setPreviewImage(Profile3);

  }, [])



  const handleMenuFormSubmit = (event) => {
    setErrMsg('')
    event.preventDefault();
    event.stopPropagation();
    const formData = new FormData();
    const filename = generateFilename(event.target.name.value);
    console.log("FILENAME: ", filename)

    formData.append('file', selectedFile, filename);
    formData.append('name', event.target.name.value);
    formData.append('description', event.target.description.value);
    formData.append('price', event.target.price.value);
    formData.append('category', event.target.category.value);
    formData.append('restaurantId', event.target.restaurantId.value);
    formData.append('userId', event.target.userId.value);
    formData.append('view', event.target.view.value);
    formData.append('quantity', event.target.quantity.value);
    formData.append('branchId', event.target.branchId.value);

    console.log("FORM DATA: ", formData.getAll('image'))

    //handle submit post to localhost:4000/menu/add with form data using axios
    axiosPrivateForms.post('/menu/addMenu', formData)
        .then(function (response) {
            console.log(response);
            setImage(response.data.image);
            // setPreviewImage(null);
            // setSelectedFile(null);
            setDoneMsg('Menu Added Successfully');
            setShowSuccessModal(true);
            // show modal
            
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
            setErrMsg('Error occured while adding menu - \'Name may already exists\'');
        }
        if (errRef.current !== null) {
          errRef.current.focus();
        }
          setShowSuccessModal(true)
        });
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const generateFilename = (name) => {
    const date = new Date();
    const timestamp = date.getTime();
    const formatedName = name.replace(/\s/g, '_');
    return `${formatedName}_${timestamp}_${selectedFile.name}`;
  };


  return (
    <>
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Add Menu</h5>
        <p ref={errRef} className={errMsg ? "text-danger" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <p ref={doneRef} className={doneMsg ? "text-success" : "offscreen"} aria-live="assertive">{doneMsg}</p>
        <Form onSubmit={handleMenuFormSubmit}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="name">
                <Form.Label>Dish Name</Form.Label>
                <Form.Control required type="text" name='name' placeholder="Enter your dish name" />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="category">
                <Form.Label>category</Form.Label>
                <Form.Control required type="text" name='category' placeholder="Enter dish category" />
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="description">
                <Form.Label>description</Form.Label>
                <Form.Control as='textarea'row={3} name='description' required type="text" placeholder="Describe Dish"  />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="view">
                <Form.Label>View</Form.Label>
                <Form.Select defaultValue="true" name="view">
                  <option value="true">True</option>
                  <option value="false">False</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="price">
                <Form.Label>Dish Price</Form.Label>
                <Form.Control required type="number" name="price" placeholder="Provide dish price eg;10.00" />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="quantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control required type="number" name="quantity" placeholder="Provide dish quantity eg;10" />
              </Form.Group>
            </Col>
          </Row>
              {/* <input type="hidden" name="menuId" value={1} /> */}
              <input type="hidden" name="restaurantId" value={1} />
              <input type="hidden" name="branchId" value={1} />
              <input type="hidden" name="userId" value={1} />
       
          <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">{title}</h5>
        <div className="d-xl-flex align-items-center">
          <div className="user-avatar xl-avatar">
          {previewImage ? (
            <Image fluid rounded src={previewImage} alt="" />
          ) : (
            <Image fluid rounded src={`/Images/${image}`} alt="" />
          )}
            {/* <Image fluid rounded src={photo} /> */}
          </div>
          <div className="file-field">
            <div className="d-flex justify-content-xl-center ms-xl-3">
              <div className="d-flex">
                <span className="icon icon-md">
                  <FontAwesomeIcon icon={faPaperclip} className="me-3" />
                </span>
                <input type="file"  onChange={handleFileChange} name="file" id="file" required/>
                <div className="d-md-block text-start">
                  <div className="fw-normal text-dark mb-1">Choose Image</div>
                  <div className="text-gray small">JPG, GIF or PNG. Max size of 800K</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
          <div className="mt-3">
            <Button variant="primary" type="submit">Add Dish</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>

      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            STATUS OF MENU
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p ref={errRef} className={errMsg ? "text-danger" : "offscreen"} aria-live="assertive">{errMsg}</p>
          <p ref={doneRef} className={doneMsg ? "text-success" : "offscreen"} aria-live="assertive">{doneMsg}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSuccessModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      </>

  );
};

export const EditMenuForm = (props) => {
  const [birthday, setBirthday] = useState("");
  const [errMsg, setErrMsg] = useState('');
  const [doneMsg, setDoneMsg] = useState('');
  const menuItem = props.menu;
  const [edit, setEdit] = useState({});
  const [menu, setMenu] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    menuId: '',
    category: '',
    restaurantId: '',
    userId: '',
    view: '',
    quantity: '',
    branchId: ''
  });
  const axiosPrivate = useAxiosPrivate()

  const errRef = useRef();
  const doneRef = useRef();

  useEffect(() => {
      setErrMsg('');
      setDoneMsg('');
    //   set menu to props.menu
    setMenu(()=> menuItem)
    // check if there are props values else return to previous page
    if (menu === undefined) {
        window.history.back();
    }
    console.log('Menu:::',menu)
    }, [menuItem, menu]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEdit((prevState) => ({
          ...prevState,
          [name]: value,
          menuId: menu.menuId
        }));
    };
    
  const handleMenuEditFormSubmit = (event) => {
    setErrMsg('');
    setDoneMsg('');
    event.preventDefault();
    event.stopPropagation();  
    (Object.keys(edit).length === 0 && edit.constructor === Object)? setErrMsg('No changes made'): 
    //handle submit post to localhost:4000/menu/add with form data using axios
    axiosPrivate.put('/menu/updateMenu',edit)
        .then(function (response) {
            setDoneMsg('Menu updated successfully');
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
            setErrMsg('Error occured while editing menu');
        }
        if (errRef.current !== null) {
          errRef.current.focus();
        }
        });
  }

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Edit Menu - {(menu.name).toUpperCase}</h5>
        <p ref={errRef} className={errMsg ? "text-danger" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <p ref={doneRef} className={doneMsg ? "text-success" : "offscreen"} aria-live="assertive">{doneMsg}</p>
        <Form onSubmit={handleMenuEditFormSubmit}>
          <Row> 
            <Col md={6} className="mb-3">
              <Form.Group id="name">
                <Form.Label>Dish Name</Form.Label> 
                <Form.Control required type="text" name='name' placeholder="Enter your dish name" defaultValue={menu.name} onChange={handleChange}/>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="category">
                <Form.Label>category</Form.Label>
                <Form.Control required type="text" name='category' placeholder="Enter dish category" defaultValue={menu.category} onChange={handleChange}/>
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="description">
                <Form.Label>description</Form.Label>
                <Form.Control as='textarea'row={3} name='description' required type="text" placeholder="Describe Dish" defaultValue={menu.description} onChange={handleChange}/>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="view">
                <Form.Label>View</Form.Label>
                <Form.Select name="view" onChange={handleChange}>
                    <option value={menu.view}>{(menu.view).toUpperCase()}</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="price">
                <Form.Label>Dish Price</Form.Label>
                <Form.Control required type="number" name="price" placeholder="Provide dish price eg;10.00" defaultValue={menu.price} onChange={handleChange}/>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="quantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control required type="number" name="quantity" placeholder="Provide dish quantity eg;10" defaultValue={menu.quantity} onChange={handleChange}/>
              </Form.Group>
            </Col>
          </Row>
              {/* <input type="hidden" name="menuId" value={1} /> */}
              <input type="hidden" name="restaurantId" value={menu.restaurantId} />
              <input type="hidden" name="branchId" value={menu.branchId} />
              <input type="hidden" name="userId" value={menu.userId} />
          <div className="mt-3">
            <Button variant="primary" type="submit">Add Dish</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};


export const ViewMenuForm = (props) => {
  const menuItem = props.menu;
  console.log('Menu:::',menuItem)
  const [menu, setMenu] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    menuId: '',
    category: '',
    restaurantId: '',
    userId: '',
    view: '',
    quantity: '',
    branchId: ''
  });

  useEffect(() => {
    //   set menu to props.menu
    setMenu(()=> menuItem)
    // check if there are props values else return to previous page
    if (menu === undefined) {
        window.history.back();
    }
    console.log('Menu:::',menu)
    }, [menuItem, menu]);
  

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">{(menu.name)} - Info</h5>
        <Form>
          <Row> 
            <Col md={6} className="mb-3">
              <Form.Group id="name">
                <Form.Label>Dish Name</Form.Label> 
                <Form.Control readOnly required type="text" name='name' value={menu.name} />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="category">
                <Form.Label>category</Form.Label>
                <Form.Control readOnly required type="text" name='category' value={menu.category} />
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="description">
                <Form.Label>description</Form.Label>
                <Form.Control readOnly as='textarea'row={3} name='description' required type="text" value={menu.description} />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="view">
                <Form.Label>View</Form.Label>
                <Form.Select name="view" disabled >
                    <option value={menu.view}>{menu.view.toUpperCase()}</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="price">
                <Form.Label>Dish Price</Form.Label>
                <Form.Control readOnly required type="number" name="price"  value={menu.price} />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="quantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control readOnly required type="number" name="quantity"  value={menu.quantity} />
              </Form.Group>
            </Col>
          </Row>
              {/* <input type="hidden" name="menuId" value={1} /> */}
              <input type="hidden" name="restaurantId" value={menu.restaurantId} />
              <input type="hidden" name="branchId" value={menu.branchId} />
              <input type="hidden" name="userId" value={menu.userId} />
          <div className="mt-3">
            {/* <Button variant="primary" type="submit">Add Dish</Button> */}
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
  }
