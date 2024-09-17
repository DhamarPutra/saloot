import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PORT_API from './api/PortAPI';
import SecurityAdmin from './security/SecurityAdmin';

function AddUser() {
  const [newUser, setNewUser] = useState("");
  SecurityAdmin();

  const handleAddUser = () => {
    axios
      .post(PORT_API + "/users", {
        nama_tim: newUser.toUpperCase(),
      })
      .then((response) => {
        console.log(response.data);
        setNewUser("");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <Link
        to="/bed56435-7544-417a-991e-caf2ed848307"
        className="bg-sage-500 text-white py-2 px-4 rounded hover:bg-sage-600 transition duration-300 inline-block"
      >
        AdminPage
      </Link>
      <h2 className="text-2xl font-bold text-sage-700 my-3">Add User</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddUser();
        }}
        className="space-y-4"
      >
        <input
          type="text"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
          placeholder="Enter nama_tim"
          className="border border-sage-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-sage-400 transition duration-300"
          required
        />
        <button
          type="submit"
          className="bg-sage-500 text-white py-2 px-4 rounded-lg hover:bg-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-400 transition duration-300 w-full"
        >
          Add User
        </button>
      </form>
    </div>
  );
}

export default AddUser;
