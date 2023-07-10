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

  const deleteUser = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/user/${id}`)
      .then((response) => {
        setUsers(users.filter((user) => user.id !== id)); // IDに一致しないユーザーだけを残すことでユーザーを削除
      })
      .catch((error) => {
        console.log("エラーが発生");
        console.log(error.response);
      });
  };

  const modifyUser = (id) => {
    axios
      .patch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        name: "John Doe",
      })
      .then((response) => {
        let updatedUsers = users.map((user) => {
          if (user.id === response.data.id) {
            return response.data;
          } else {
            return user;
          }
        });
        setUsers(updatedUsers); // ユーザー情報を更新
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h1>Hello React</h1>
      <input value={name} onChange={handleChange} />
      <br />
      <button onClick={createNewUser}>作成</button>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.name}
            <button onClick={() => deleteUser(user.id)}>削除</button> //
            ユーザーごとに削除ボタンを追加
            <button onClick={() => modifyUser(user.id)}>更新</button> //
            ユーザーごとに更新ボタンを追加
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
