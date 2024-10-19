import React from "react";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";

const TodoForm = ({ submitHandler }) => {
  return (
    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" id="inputTitle" placeholder="Enter title" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          id="inputDescription"
          placeholder="Enter description"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Place</Form.Label>
        <Form.Control type="text" id="inputPlace" placeholder="Enter place" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Due date</Form.Label>
        <Form.Control type="date" id="inputDate" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Add
      </Button>
    </Form>
  );
};

export default TodoForm;
