import { useState } from "react";
import axios from "axios";
import { addBook } from "./redux/bookslice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function CreateBook() {
  const [name, setName] = useState();
  const [review, setReview] = useState();
  const [rating, setRating] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/create", { name, review, rating })
      .then((res) => {
        dispatch(addBook(res.data));
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-secondary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Add Book Review</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Review</label>
            <input
              type="text"
              placeholder="Write Review"
              className="form-control"
              onChange={(e) => setReview(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Rating</label>
            <input
              type="text"
              placeholder="Give Rating"
              className="form-control"
              onChange={(e) => setRating(e.target.value)}
            />
          </div>
          <button className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateBook;
