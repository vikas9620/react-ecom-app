import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./ContactUs.css";

const ContactUs = (props) => {
  const nameRef = useRef("");
  const emailRef = useRef("");
  const phoneNumberRef = useRef("");
  const formSubmitHandler = (e) => {
    e.preventDefault();
    const contact = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      number: phoneNumberRef.current.value,
    };

    props.onAdd(contact);
    nameRef.current.value = "";
    emailRef.current.value = "";
    phoneNumberRef.current.value = "";
  };

  return (
    <Form className="form" onSubmit={formSubmitHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" ref={nameRef} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" ref={emailRef} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Phone number</Form.Label>
        <Form.Control
          type="number"
          placeholder="phone number"
          ref={phoneNumberRef}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default ContactUs;
