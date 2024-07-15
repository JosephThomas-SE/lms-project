import React, { useState } from "react";

import { collection, addDoc } from "firebase/firestore"; 
import { realtimeDb } from "../config/firebaseConfig";

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

    const newBook = {
      bid,
      libraryNumber,
      bookName,
      bookAuthor,
      price,
    };

    bookDetails.push(newBook);

    // TODO: Add doc to DB
    try {
      await addDoc(collection(realtimeDb, "sunday_school_lms"), {
        ...newBook
      });
    } catch (error) {
      alert(error);
    }

    setEmployees(employees);
    setIsAdding(false);
    getEmployees()
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
