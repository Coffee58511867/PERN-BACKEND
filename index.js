const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.post("/add", async (req, res) => {
  try {
    const  {description} = req.body
    const newtodo = await pool.query(
      "INSERT INTO todo (description) VALUES ($1) RETURNING * ", [description]
    );
    res.json(newtodo.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});
app.get("/read", async (req,res) => {
  try {
    const data = await pool.query("SELECT * FROM todo");
    res.json(data.rows);
  } catch (err) {
    console.log(err.message);
  }
});
app.get("/read/:id", async (req, res) => {
  try {
    const { id } = req.params
    const todoItem = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id
    ]);
    res.json(todoItem.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});
app.put("/update/:id", async(req,res) => {
    try{
       const {id} = req.params
       const {description} = req.body
       const updateTodo = await pool.query("UPDATE todo set description = $1 WHERE todo_id = $2",
        [description,id]);
      res.json("Todo Updated");

    }catch(err){
        console.log(err.message);
    }
})
app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params
    const todoItem = await pool.query("DELETE FROM todo WHERE todo_id = $1", 
    [
      id
    ]);
    res.json(todoItem.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});
app.delete("/deleteall", async (req,res) => {
    try {
      const todoItem = await pool.query("DELETE * FROM todo");
      res.json("All Todos are Deleted");
    } catch (err) {
      console.log(err.message);
    }
  });

app.listen(5000, () => {
  console.log("Server Started");
});
