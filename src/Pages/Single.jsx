import { doc, getDoc } from "firebase/firestore"; // Import getDoc
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../fb";

const Single = () => {
  const [single, setSingle] = useState(null); // Initialize as null
  const { userId } = useParams();
  const docRef = doc(db, "people", userId);

  const getInfo = async () => {
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSingle(docSnap.data());
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInfo();
  }, [userId]);

  useEffect(() => {
    if (single) {
      console.log(single); // Log state when it updates
    }
  }, [single]);

  return (
    <div className="justify-center items-center h-screen">
      {single ? (
        <h1 className="text-3xl font-bold">{single.name}</h1>
      ) : (
        <p>You are not being invited</p> // Handle case when data is not yet loaded
      )}
    </div>
  );
};

export default Single;
