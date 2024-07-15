// src/components/DeleteBook.js
import React from "react";
import { useNavigate  } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { realtimeDb } from "../../config/firebaseConfig";

const DeleteBook = ({ id }) => {
  const navigate = useNavigate ();

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(realtimeDb, "Sunday School LMS", id));
      navigate("/books");
    } catch (error) {
      console.error("Error deleting book", error);
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteBook;
