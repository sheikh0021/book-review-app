import { useState } from "react";
import axios from "axios";
import {  updateBook } from "./redux/bookslice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function EditBook() {
  const { id } = useParams();
  const books = useSelector((state) => state.books.books);
  const book = books.find((u) => u.id === id);
  console.log(book);

  const [name, setName] = useState(book.name);
  const [review, setReview] = useState(book.review);
  const [rating, setRating] = useState(book.rating);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3001/update/"+id, { name, review, rating })
      // eslint-disable-next-line no-unused-vars
      .then(res => {
        dispatch(updateBook({ id, name, review, rating}));
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-secondary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleUpdate}>
          <h2>Edit Book</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Review</label>
            <input
              type="text"
              placeholder="Write Review"
              className="form-control"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Rating</label>
            <input
              type="text"
              placeholder="Give Rating"
              className="form-control"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </div>
          <button className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default EditBook;
