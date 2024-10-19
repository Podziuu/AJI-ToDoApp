import React from "react";
import { Form } from "react-bootstrap";

const Search = ({ searchTerm, setSearchTerm, startDate, setStartDate, endDate, setEndDate }) => {
  return (
    <Form>
      {/* Pole wyszukiwania */}
      <Form.Group controlId="inputSearch" className="mb-4">
        <Form.Label>Search</Form.Label>
        <Form.Control
          type="text"
          placeholder="Type Your search here..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>

      {/* Pole do wyboru daty początkowej */}
      <Form.Group controlId="startDate" className="mb-4">
        <Form.Label>Start Date</Form.Label>
        <Form.Control
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </Form.Group>

      {/* Pole do wyboru daty końcowej */}
      <Form.Group controlId="endDate" className="mb-4">
        <Form.Label>End Date</Form.Label>
        <Form.Control
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </Form.Group>
    </Form>
  );
};

export default Search;
