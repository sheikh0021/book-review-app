import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
  },
  reducers: {
    getBook: (state, action) => {
      state.books = action.payload.map((book) => {
        return {
          id: book._id,
          name: book.name,
          review: book.review,
          rating: book.rating,
        };
      });
    },
    addBook: (state, action) => {
      state.books.push(action.payload);
    },
    updateBook: (state, action) => {
      const index = state.books.findIndex((x) => x.id === action.payload.id);
      state.books[index] = {
        id: action.payload.id,
        name: action.payload.name,
        review: action.payload.review,
        rating: action.payload.rating,
      };
    },
    deleteBook: (state, action) => {
        const id = action.payload.id;
        state.books = state.books.filter(u => u.id !== id)
    }
  },
});

export const { getBook, addBook, updateBook, deleteBook } = bookSlice.actions;
export default bookSlice.reducer;
