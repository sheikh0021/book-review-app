/* eslint-disable react/jsx-key */

//Users.jsx -->> Books.jsx

import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { deleteBook } from "./redux/bookslice";

function Books() {
  const books = useSelector(state => state.books.books);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/deletebook/" + id)
      .then((res) => {
        dispatch(deleteBook({id}))

        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex vh-100 bg-secondary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link to="/create" className="btn btn-success btn-sm">
          ADD +
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Review</th>
              <th>Rating</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => {
              return (
                <tr>
                  <td>{book.name}</td>
                  <td>{book.review}</td>
                  <td>{book.rating}</td>
                  <td>
                    <Link
                      to={`/edit/${book.id}`}
                      className="btn btn-sm btn-success me-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Link to="/login" className="btn btn-light ">Logout
        </Link>
      </div>
    </div>
  );
}

export default Books;
