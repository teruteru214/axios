import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState(""); // 新規ユーザ名を保持するステート

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

  const handleChange = (e) => {
    setName(e.target.value); // 入力値をnameステートに保存
  };

  const createNewUser = () => {
    axios
      .post("https://jsonplaceholder.typicode.com/users", {
        name: name, // nameステートの値をPOST
      })
      .then((response) => {
        setUsers([...users, response.data]); // 新規ユーザをusersステートに追加
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Hello React</h1>
      <input value={name} onChange={handleChange} />
      <br />
      <button onClick={createNewUser}>作成</button>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.name}</li> // データを表示
        ))}
      </ul>
    </div>
  );
};

export default App;
