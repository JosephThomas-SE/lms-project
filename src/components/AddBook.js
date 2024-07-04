import React, { useState } from "react";
import { db } from "../firebaseConfig";

const AddBook = () => {
  const [bookDetails, setBookDetails] = useState({
    bid: "",
    libraryNumber: "",
    bookName: "",
    bookAuthor: "",
    price: "",
  });

  const handleChange = (e) => {
    setBookDetails({ ...bookDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await db.collection("Sunday School LMS").add(bookDetails);
      setBookDetails({
        bid: "",
        libraryNumber: "",
        bookName: "",
        bookAuthor: "",
        price: "",
      });
    } catch (error) {
      console.error("Error adding book", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="bid"
        value={bookDetails.bid}
        onChange={handleChange}
        placeholder="Book ID"
        required
      />
      <input
        type="text"
        name="libraryNumber"
        value={bookDetails.libraryNumber}
        onChange={handleChange}
        placeholder="Library Number"
        required
      />
      <input
        type="text"
        name="bookName"
        value={bookDetails.bookName}
        onChange={handleChange}
        placeholder="Book Name"
        required
      />
      <input
        type="text"
        name="bookAuthor"
        value={bookDetails.bookAuthor}
        onChange={handleChange}
        placeholder="Book Author"
        required
      />
      <input
        type="text"
        name="price"
        value={bookDetails.price}
        onChange={handleChange}
        placeholder="Price"
        required
      />
      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddBook;
