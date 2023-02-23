
import React, {useState, useRef} from 'react';

import './App.css';

const apiUrl = "https://jsonplaceholder.typicode.com/users";

function App() {
  console.log("Component Rendered");
  const [userList, setUserList] = useState([]);
  // const [count, setCount] = useState(0);
  // const [initialUserList, setInitialUserList] = useState([]);
  const count = useRef(0);
  const initialUserList = useRef([]);

  const getUsers = async () => {
    let users = await fetch(apiUrl);
    users = await users.json();
    setUserList(users);
    // setInitialUserList(users);
    initialUserList.current = users;
  }

  const sortList = () => {
    if (count.current == 0) {
      let users = [...userList];
      users.sort((a, b) => {
        return a.name.length - b.name.length
      })
      setUserList(users);
      // setCount(1);
      count.current = 1;
    }
    else if (count.current == 1){
      let users = [...userList];
      users.sort((a, b) => {
        return b.name.length - a.name.length
      })
      setUserList(users);
      // setCount(2);
      count.current = 2;
    }
    else if (count.current == 2){
      setUserList(initialUserList.current);
      // setCount(0);
      count.current = 0;
    }
  }

  return (
    <main>
      <h1>User List</h1>
      <div>
        <button onClick={getUsers}>Get Users</button>
        <button onClick={sortList}>Sort list by name's length</button>
      </div>
      <ul>
        {userList.map((user,key) => <li key={key}>{user.name}</li>)}
      </ul>
    </main>
  );
}

export default App;
