import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrease, increase } from "./redux/counterSlice";
import { getUsers } from "./redux/userSlice";
// import { setUsers } from "./redux/userSlice";

function App() {
  const count = useSelector((state) => state.counter.count);
  const { users, loading, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    // const getPosts = async () => {
    //   const res = await fetch("https://jsonplaceholder.typicode.com/users");
    //   const data = await res.json();
    //   dispatch(setUsers(data));
    // };
    // getPosts();
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="App">
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(increase())}>Up</button>
      <button onClick={() => dispatch(decrease())}>Down</button>
      <h2>User</h2>
      {loading && <p>Loading</p>}
      {error && <p>データ取得に失敗しました。</p>}
      {users &&
        users.map &&
        users.map((user, index) => <div key={index}>{user.name}</div>)}
    </div>
  );
}

export default App;
