import React, { useState } from "react";
import { Button, Input } from "antd";

import "./style.css";

export default function home() {
  const [input, setInput] = useState("");

  const handleFormSubmit = event => {
    event.preventDefault();
  };

  const handleInputChange = ({ target }) => {
    setInput(target.value);
  };

  return (
    <div>
      <p>Enter a Github's username</p>
      <form onSubmit={handleFormSubmit}>
        <Input placeholder="Maybe yours..." value={input} onChange={handleInputChange} />
        <Button block id="button-search-user" type="primary">Search</Button>
      </form>
    </div>
  );
}
