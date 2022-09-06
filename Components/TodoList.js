import React ,{useState, useEffect}from 'react'

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    useEffect(() => {
        const data = {
          method: "get",
          url: "http://localhost:5000/read",
        };
        axios(data)
          .then((result) => {
            console.log(result);
            setTodos(result.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);
  return (
    <div>
      {todos.map((val) => {
        return(
            <p>{val.description}</p>
        )
      })}
      
    </div>
  )
}

export default TodoList
