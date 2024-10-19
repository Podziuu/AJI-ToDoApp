import React from "react";
import { Button, Table } from "react-bootstrap";

const TodoTable = ({ tasks, deleteTodo }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Place</th>
          <th>Category</th>
          <th>Due Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, index) => (
          <tr key={index}>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>{task.place}</td>
            <td>{task?.category}</td>
            <td>{new Date(task.dueDate).toLocaleDateString()}</td>
            <td>
              <Button variant="danger" onClick={() => deleteTodo(index)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TodoTable;
