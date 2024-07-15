// src/components/EditBook.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { realtimeDb } from "../../config/firebaseConfig";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookDetails, setBookDetails] = useState({
    bid: "",
    libraryNumber: "",
    bookName: "",
    bookAuthor: "",
    price: "",
  });

  useEffect(() => {
    const fetchBook = async () => {
      const bookDoc = await getDoc(doc(realtimeDb, "Sunday School LMS", id));
      if (bookDoc.exists()) {
        setBookDetails(bookDoc.data());
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    setBookDetails({ ...bookDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(realtimeDb, "Sunday School LMS", id), bookDetails);
      navigate("/books");
    } catch (error) {
      console.error("Error editing book", error);
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
      <button type="submit">Update Book</button>
    </form>
  );
};

export default EditBook;
