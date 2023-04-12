
import React, { useState,useEffect,useRef } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup } from '@themesberg/react-bootstrap';
// import { axiosPrivate } from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";


export const GeneralInfoForm = () => {
  const [birthday, setBirthday] = useState("");

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">General information</h5>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control required type="text" placeholder="Enter your first name" />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control required type="text" placeholder="Also your last name" />
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="birthday">
                <Form.Label>Birthday</Form.Label>
                <Datetime
                  timeFormat={false}
                  onChange={setBirthday}
                  renderInput={(props, openCalendar) => (
                    <InputGroup>
                      <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                      <Form.Control
                        required
                        type="text"
                        value={birthday ? moment(birthday).format("MM/DD/YYYY") : ""}
                        placeholder="mm/dd/yyyy"
                        onFocus={openCalendar}
                        onChange={() => { }} />
                    </InputGroup>
                  )} />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Select defaultValue="0">
                  <option value="0">Gender</option>
                  <option value="1">Female</option>
                  <option value="2">Male</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="emal">
                <Form.Label>Email</Form.Label>
                <Form.Control required type="email" placeholder="name@company.com" />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control required type="number" placeholder="+12-345 678 910" />
              </Form.Group>
            </Col>
          </Row>

          <h5 className="my-4">Address</h5>
          <Row>
            <Col sm={9} className="mb-3">
              <Form.Group id="address">
                <Form.Label>Address</Form.Label>
                <Form.Control required type="text" placeholder="Enter your home address" />
              </Form.Group>
            </Col>
            <Col sm={3} className="mb-3">
              <Form.Group id="addressNumber">
                <Form.Label>Number</Form.Label>
                <Form.Control required type="number" placeholder="No." />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={4} className="mb-3">
              <Form.Group id="city">
                <Form.Label>City</Form.Label>
                <Form.Control required type="text" placeholder="City" />
              </Form.Group>
            </Col>
            <Col sm={4} className="mb-3">
              <Form.Group className="mb-2">
                <Form.Label>Select state</Form.Label>
                <Form.Select id="state" defaultValue="0">
                  <option value="0">State</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group id="zip">
                <Form.Label>ZIP</Form.Label>
                <Form.Control required type="tel" placeholder="ZIP" />
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-3">
            <Button variant="primary" type="submit">Save All</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};



// Menuform component
// ******MSDM********//

export const MenuForm = () => {
  const [birthday, setBirthday] = useState("");
  const [errMsg, setErrMsg] = useState('');
  const axiosPrivate = useAxiosPrivate()

  const errRef = useRef();

  useEffect(() => {
      setErrMsg('');
  })

  const handleMenuFormSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    // console.log('Event data',event.target)
    // console.log('Name',event.target.name.value)
    // console.log('Description',event.target.description.value)
    // console.log('Price',event.target.price.value)
    // console.log('quantity',event.target.quantity.value)
    // console.log('Image',event.target.image.value)
    // console.log('Category',event.target.category.value)
    // console.log('RestaurantId',event.target.restaurantId.value)
    // console.log('MenuId',event.target.menuId.value)
    // console.log('UserId',event.target.userId.value)
  
    //handle submit post to localhost:4000/menu/add with form data using axios
    axiosPrivate.post('/menu/addMenu', {
        name: event.target.name.value,
        description: event.target.description.value,
        price: event.target.price.value,
        // image: event.target.image.value,
        // menuId: event.target.menuId.value,
        category: event.target.category.value,
        restaurantId: event.target.restaurantId.value,
        userId: event.target.userId.value,
        view: event.target.view.value,
        quantity: event.target.quantity.value,
        branchId: event.target.branchId.value,

    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (err) {
          if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 400) {
            setErrMsg('Missing Details');
        } else if (err.response?.status === 401) {
            setErrMsg('Unauthorized');
        } else {
            setErrMsg('Error occured while adding menu');
        }
        if (errRef.current !== null) {
          errRef.current.focus();
        }
        });
  }

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Menu Information</h5>
        <p ref={errRef} className={errMsg ? "text-danger" : "offscreen"} aria-live="assertive">{errMsg}</p>
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
                <Form.Control as='textarea'row={3} name='description' required type="text" placeholder="Describe Dish" />
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
          <div className="mt-3">
            <Button variant="primary" type="submit">Add Dish</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

