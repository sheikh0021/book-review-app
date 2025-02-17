import "bootstrap/dist/css/bootstrap.min.css";
import Books from "./Books";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateBook from "./CreateBook";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getBook } from "./redux/bookslice";
import EditBook from "./EditBook";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001");
        dispatch(getBook(response.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login/>} />

        <Route path="/" element={<Books />} />
        <Route path='/' element={<Books/>}></Route>

        <Route path="/create" element={<CreateBook />}></Route>
        <Route path="/edit/:id" element={<EditBook />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
