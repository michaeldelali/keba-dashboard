
import React, { useState, useEffect, useRef, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row, Card, Form, Button, Image, Modal } from '@themesberg/react-bootstrap';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import Profile3 from "../../assets/img/team/profile-picture-2.jpg";
import Profile4 from "../../assets/img/team/profile-picture-3.jpg";
import Swal from 'sweetalert2';
// import { axiosPrivate } from "../api/axios";
import useAxiosPrivateForms from "../../hooks/useAxiosPrivateForms";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import AuthContext from "../../context/AuthProvider";

//BranchForm component
// ******MSDM********//

export const BranchForm = () => {

  const [errMsg, setErrMsg] = useState('');
  const [doneMsg, setDoneMsg] = useState('');
  const axiosPrivateForms = useAxiosPrivateForms()
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [image, setImage] = useState(Profile3);
  const [previewImage2, setPreviewImage2] = useState(null);
  const [image2, setImage2] = useState(Profile4);


  //Logo
  const [logo, setLogo] = useState(null);
  const [banner, setBanner] = useState(null);

  const errRef = useRef();
  const doneRef = useRef();

  const auth = useContext(AuthContext);
  useEffect(() => {
    setErrMsg('');
    setPreviewImage(Profile3);
    setPreviewImage2(Profile4);
  }, [])

  useEffect(() => {
    if (loading) {
      Swal.fire({
        title: 'Loading...',
        html: 'Please wait while we add your request',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
    } else {
      Swal.close();
    }
  }, [loading])



  const handleBranchFormSubmit = (event) => {
    setErrMsg('')
    event.preventDefault();
    const logoName = generateLogoName(event.target.name.value);
    const bannerName = generateBannerName(event.target.name.value);


    const formData = new FormData();
    formData.append('restaurantId', auth.auth.restaurantId);
    formData.append('userId', auth.auth.userId);
    formData.append('name', event.target.name.value);
    formData.append('address', event.target.address.value);
    formData.append('phone', event.target.phone.value);
    formData.append('email', event.target.email.value);
    formData.append('description', event.target.description.value);
    formData.append('status', event.target.status.value);
    formData.append('openTime', event.target.openTime.value);
    formData.append('openDays', event.target.openDays.value);
    formData.append('logo', logo, logoName);
    formData.append('banner', banner, bannerName);

    console.log("FORM DATA: ", formData)

    //handle submit post to localhost:4000/branch/add with form data using axios
    setLoading(true);
    axiosPrivateForms.post('/branch/addBranch', formData)
      .then(function (response) {
        setImage(response.data.logo);
        setImage2(response.data.banner);
        setDoneMsg('Branch Added Successfully');
        setLoading(false);
        setShowSuccessModal(true);
        // show modal

      })
      .catch(function (err) {
        setLoading(false);
        if (!err?.response) {
          setErrMsg('No Server Response');
        } else if (err.response?.status === 400) {
          setErrMsg('Missing Details');
        } else if (err.response?.status === 401) {
          setErrMsg('Unauthorized');
        } else {
          setErrMsg('Error occured while adding branch - \'Name may already exists\'');
        }
        if (errRef.current !== null) {
          errRef.current.focus();
        }
        setShowSuccessModal(true)
      });
  }

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    setLogo(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleBannerChange = (event) => {
    const file = event.target.files[0];
    setBanner(file);
    setPreviewImage2(URL.createObjectURL(file));
  };

  const generateLogoName = (name) => {
    const date = new Date();
    const timestamp = date.getTime();
    const formatedName = name.replace(/\s/g, '_');
    return `${formatedName}_${timestamp}_${logo.name}`;
  };
  const generateBannerName = (name) => {
    const date = new Date();
    const timestamp = date.getTime();
    const formatedName = name.replace(/\s/g, '_');
    return `${formatedName}_${timestamp}_${banner.name}`;
  };

  return (
    <>
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">Add Branch</h5>
          <p ref={errRef} className={errMsg ? "text-danger" : "offscreen"} aria-live="assertive">{errMsg}</p>
          <p ref={doneRef} className={doneMsg ? "text-success" : "offscreen"} aria-live="assertive">{doneMsg}</p>
          <Form onSubmit={handleBranchFormSubmit}>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="name">
                  <Form.Label>Branch Name</Form.Label>
                  <Form.Control required type="text" name='name' placeholder="Enter your Branch name" />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="address">
                  <Form.Label>E-MAIL</Form.Label>
                  <Form.Control type="email" name='email' placeholder="Enter Branch Email" />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control required type="text" name='address' placeholder="Enter Branch Address" />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="phone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control required type="text" name='phone' placeholder="233 XXX XXX XXX" />
                </Form.Group>
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col md={6} className="mb-3">
                <Form.Group id="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as='textarea' row={3} name='description' type="text" placeholder="Describe Dish" />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="status">
                  <Form.Label>Status</Form.Label>
                  <Form.Select defaultValue="opened" name="status">
                    <option value="opened">Opened</option>
                    <option value="closed">Closed</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="openDays">
                  <Form.Label>Days Opened</Form.Label>
                  <Form.Control required type="text" name="openDays" placeholder="Mon-Sat" defaultValue="Mon-Sat" />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="openTime">
                  <Form.Label>Time Opened</Form.Label>
                  <Form.Control required type="text" name="openTime" placeholder="8:00am-9:00pm" defaultValue="8:00am-9:00pm" />
                </Form.Group>
              </Col>
            </Row>
            <Card border="light" className="bg-white shadow-sm mb-4">
              <Card.Body>
                <h5 className="mb-4">Select Branch Logo</h5>
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
                        <input type="file" onChange={handleLogoChange} name="logo" id="file" required />
                        <div className="d-md-block text-start">
                          <div className="fw-normal text-dark mb-1">Choose Logo</div>
                          <div className="text-gray small">JPG, GIF or PNG. Max size of 800K</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card.Body>
              <Card.Body>
                <h5 className="mb-4">Select Branch Banner</h5>
                <div className="d-xl-flex align-items-center">
                  <div className="user-avatar xl-avatar">
                    {previewImage ? (
                      <Image fluid rounded src={previewImage2} alt="" />
                    ) : (
                      <Image fluid rounded src={`/Images/${image2}`} alt="" />
                    )}
                    {/* <Image fluid rounded src={photo} /> */}
                  </div>
                  <div className="file-field">
                    <div className="d-flex justify-content-xl-center ms-xl-3">
                      <div className="d-flex">
                        <span className="icon icon-md">
                          <FontAwesomeIcon icon={faPaperclip} className="me-3" />
                        </span>
                        <input type="file" onChange={handleBannerChange} name="banner" id="file" required />
                        <div className="d-md-block text-start">
                          <div className="fw-normal text-dark mb-1">Choose Banner</div>
                          <div className="text-gray small">JPG, GIF or PNG. Max size of 800K</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
            <div className="mt-3">
              <Button variant="primary" type="submit">Add Branch</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            STATUS OF BRANCH
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
export const EditBranchForm = (props) => {
  const [errMsg, setErrMsg] = useState('');
  const [doneMsg, setDoneMsg] = useState('');
  const branchItem = props.branch;
  const [edit, setEdit] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [image, setImage] = useState(Profile3);
  const [previewImage2, setPreviewImage2] = useState(null);
  const [image2, setImage2] = useState(Profile4);
   
  //Logo
   const [logo, setLogo] = useState(null);
   const [banner, setBanner] = useState(null);
 
  const [branch, setBranch] = useState({
    restaurantId: '',
    userId: '',
    name: '',
    address: '',
    phone: '',
    email: '',
    description: '',
    status: '',
    openTime: '',
    openDays: '',
    logo: '',
    logoBlurHash: '',
    banner: '',
    bannerBlurHash: ''
  });
  const axiosPrivate = useAxiosPrivate()

  const errRef = useRef();
  const doneRef = useRef();

  useEffect(() => {
    setErrMsg('');
    setDoneMsg('');
    //   set branch to props.branch
    setBranch(() => branchItem)
    // check if there are props values else return to previous page
    if (branch === undefined) {
      window.history.back();
    }
    console.log('Branch:::', branch)
  }, [branchItem, branch]);

  useEffect(() => {
    setErrMsg('');
    setPreviewImage(Profile3);
    setPreviewImage2(Profile4);
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEdit((prevState) => ({
      ...prevState,
      [name]: value,
      branchId: branch.branchId
    }));
  };

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    setLogo(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleBannerChange = (event) => {
    const file = event.target.files[0];
    setBanner(file);
    setPreviewImage2(URL.createObjectURL(file));
  };

  const handleBranchEditFormSubmit = (event) => {
    setErrMsg('');
    setDoneMsg('');
    event.preventDefault();
    event.stopPropagation();
    (Object.keys(edit).length === 0 && edit.constructor === Object) ? setErrMsg('No changes made') :
      //handle submit post to localhost:4000/branch/add with form data using axios
      axiosPrivate.put('/branch/updateBranch', edit)
        .then(function () {
          setDoneMsg('Branch updated successfully');
          setEdit(() => ({}))
        })
        .catch(function (err) {
          if (!err?.response) {
            setErrMsg('No Server Response');
          } else if (err.response?.status === 400) {
            setErrMsg('Missing Details');
          } else if (err.response?.status === 401) {
            setErrMsg('Unauthorized');
          } else {
            setErrMsg('Error occured while editing branch');
          }
          if (errRef.current !== null) {
            errRef.current.focus();
          }
        });
  }

            // <Col md={6} className="mb-3">
            //   <Form.Group id="name">
            //     <Form.Label>Dish Name</Form.Label>
            //     <Form.Control required type="text" name='name' placeholder="Enter your dish name" defaultValue={branch.name} onChange={handleChange} />
            //   </Form.Group>
            // </Col>
  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Edit Branch - {(branch.name).toUpperCase}</h5>
        <p ref={errRef} className={errMsg ? "text-danger" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <p ref={doneRef} className={doneMsg ? "text-success" : "offscreen"} aria-live="assertive">{doneMsg}</p>
        <Form onSubmit={handleBranchEditFormSubmit}>
        <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="name">
                  <Form.Label>Branch Name</Form.Label>
                  <Form.Control onChange={handleChange} defaultValue={branch.name}  type="text" name='name' placeholder="Enter your Branch name" />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="address">
                  <Form.Label>E-MAIL</Form.Label>
                  <Form.Control onChange={handleChange} defaultValue={branch.email}  type="email" name='email' placeholder="Enter Branch Email" />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control onChange={handleChange} defaultValue={branch.address}  type="text" name='address' placeholder="Enter Branch Address" />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="phone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control onChange={handleChange} defaultValue={branch.phone}  type="text" name='phone' placeholder="233 XXX XXX XXX" />
                </Form.Group>
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col md={6} className="mb-3">
                <Form.Group id="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control onChange={handleChange} defaultValue={branch.description}  as='textarea' row={3} name='description' type="text"/>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="status">
                  <Form.Label>Status</Form.Label>
                  <Form.Select name="status">
                    <option value={branch.status}>{(branch.status).toUpperCase()}</option>
                    <option value="opened">Opened</option>
                    <option value="closed">Closed</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="openDays">
                  <Form.Label>Days Opened</Form.Label>
                  <Form.Control onChange={handleChange} defaultValue={branch.name}  type="text" name="openDays" placeholder="Mon-Sat" />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="openTime">
                  <Form.Label>Time Opened</Form.Label>
                  <Form.Control onChange={handleChange} defaultValue={branch.name}  type="text" name="openTime" placeholder="8:00am-9:00pm" />
                </Form.Group>
              </Col>
            </Row>
            <Card border="light" className="bg-white shadow-sm mb-4">
              <Card.Body>
                <h5 className="mb-4">Select Branch Logo</h5>
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
                        <input type="file" onChange={handleLogoChange} name="logo" id="file" defaultValue={branch.name}  />
                        <div className="d-md-block text-start">
                          <div className="fw-normal text-dark mb-1">Choose Logo</div>
                          <div className="text-gray small">JPG, GIF or PNG. Max size of 800K</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card.Body>
              <Card.Body>
                <h5 className="mb-4">Select Branch Banner</h5>
                <div className="d-xl-flex align-items-center">
                  <div className="user-avatar xl-avatar">
                    {previewImage ? (
                      <Image fluid rounded src={previewImage2} alt="" />
                    ) : (
                      <Image fluid rounded src={`/Images/${image2}`} alt="" />
                    )}
                    {/* <Image fluid rounded src={photo} /> */}
                  </div>
                  <div className="file-field">
                    <div className="d-flex justify-content-xl-center ms-xl-3">
                      <div className="d-flex">
                        <span className="icon icon-md">
                          <FontAwesomeIcon icon={faPaperclip} className="me-3" />
                        </span>
                        <input type="file" onChange={handleBannerChange} name="banner" id="file" defaultValue={branch.name}  />
                        <div className="d-md-block text-start">
                          <div className="fw-normal text-dark mb-1">Choose Banner</div>
                          <div className="text-gray small">JPG, GIF or PNG. Max size of 800K</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
            <div className="mt-3">
              <Button variant="primary" type="submit">Add Branch</Button>
            </div>
         </Form>
      </Card.Body>
    </Card>
  );
};


export const ViewBranchForm = (props) => {
  const branchItem = props.branch;
 
  const [branch, setBranch] = useState({
    restaurantId: '',
    userId: '',
    name: '',
    address: '',
    phone: '',
    email: '',
    description: '',
    status: '',
    openTime: '',
    openDays: '',
    logo: '',
    logoBlurHash: '',
    banner: '',
    bannerBlurHash: ''
  });


  useEffect(() => {
    //   set branch to props.branch
    setBranch(() => branchItem)
    // check if there are props values else return to previous page
    if (branch === undefined) {
      window.history.back();
    }
    console.log('Branch:::', branch)
  }, [branchItem, branch]);


  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">View {branch.name}</h5>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="name">
                <Form.Label>Branch Name</Form.Label>
                <Form.Control readOnly type="text" defaultValue={branch.name} />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="address">
                <Form.Label>E-MAIL</Form.Label>
                <Form.Control readOnly type="email" defaultValue={branch.email} />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="address">
                <Form.Label>Address</Form.Label>
                <Form.Control readOnly type="text" defaultValue={branch.address} />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control readOnly type="text" defaultValue={branch.phone} />
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="description">
                <Form.Label>Description</Form.Label>
                <Form.Control readOnly as='textarea' row={3} defaultValue={branch.description} type="text" />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="status">
                <Form.Label>Status</Form.Label>
                <Form.Control readOnly type="text" name="status" defaultValue={branch.status} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="openDays">
                <Form.Label>Days Opened</Form.Label>
                <Form.Control readOnly type="text" name="openDays" defaultValue={branch.openDays} />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="openTime">
                <Form.Label>Time Opened</Form.Label>
                <Form.Control readOnly type="text" name="openTime" defaultValue={branch.openTime} />
              </Form.Group>
            </Col>
          </Row>
          <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
              <h5 className="mb-4">Branch Logo</h5>
              <Image src={branch.logo} className="img-fluid" />
            </Card.Body>
            <Card.Body>
              <h5 className="mb-4">Branch Banner</h5>
              <Image src={branch.banner} className="img-fluid" />
            </Card.Body>
          </Card>
        </Form>
      </Card.Body>
    </Card>
  );
}
