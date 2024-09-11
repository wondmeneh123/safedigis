import React, { useState, useEffect } from "react";
import { collection, setDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../fb";
import QRCode from "react-qr-code";
import { Link, useParams } from "react-router-dom";

const Form = () => {
  const [guestName, setGuestName] = useState("");
  const [guests, setGuests] = useState([]);

  // Function to generate a random 4-digit number
  const generateRandomId = () => {
    return Math.floor(1000 + Math.random() * 9000).toString(); // Ensures it's always 4 digits
  };

  // Function to add a new guest
  const handleSubmit = async (e) => {
    e.preventDefault();

    const randomId = generateRandomId();

    try {
      // Set the document in 'people' collection with the custom 4-digit ID
      await setDoc(doc(db, "people", randomId), {
        name: guestName,
      });
      alert(`Guest name added successfully with ID: ${randomId}`);
      setGuestName(""); // Reset the input field
      fetchGuests(); // Refresh the guest list after adding
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  // Function to fetch guests from Firestore
  const fetchGuests = async () => {
    const querySnapshot = await getDocs(collection(db, "people"));
    const guestsList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setGuests(guestsList); // Update the guests state with the fetched data
  };

  // Fetch guests when the component mounts
  useEffect(() => {
    fetchGuests();
  }, []);

  return (
    <div>
      <h1>Add Names Of Your Guests</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          placeholder="Enter guest name"
          required
        />
        <button type="submit">Add Guest</button>
      </form>

      <h2>Guest List</h2>
      {guests.length > 0 ? (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Qr Code</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {guests.map((guest) => (
              <tr key={guest.id}>
                <td>{guest.id}</td>
                <td>{guest.name}</td>
                <td>
                  <QRCode
                    size={100}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={guest.id}
                    viewBox={`0 0 256 256`}
                  />
                </td>
                <td>
                  <Link to={`/${guest.id}`}>
                    <button>View</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No guests added yet.</p>
      )}
    </div>
  );
};

export default Form;
