import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data); // データを保存
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  return (
    <div>
      <h1>Hello React</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.name}</li> // データを表示
        ))}
      </ul>
    </div>
  );
};

export default App;
