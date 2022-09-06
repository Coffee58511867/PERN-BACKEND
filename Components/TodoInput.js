import e from "express";
import React, { useState } from "react";

const TodoInput = () => {
  const [description, setDescription] = useState(" ");

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (description === " ") {
      alert("Please add todo description");
    }
    try {
      const body = { description };
      const response = await fetch("http://localhost:5000/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }

    setDescription(" ");
  };
  return (
    <div>
      <form onSubmit={(e) => handleSbmit()}>
        <input
          placeholder="Enter todo description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <button onClick={() => handleSubmit()}>Add todo</button>
      </form>
    </div>
  );
};

export default TodoInput;
