import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PORT_API from "./api/PortAPI";
import SecurityAdmin from './security/SecurityAdmin';

function UserList() {
  const [users, setUsers] = useState([]);
  SecurityAdmin();

  useEffect(() => {
    axios
      .get(PORT_API + "/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));
  }, []);

  const rows = [];
  for (let i = 0; i < users.length; i += 5) {
    rows.push(users.slice(i, i + 5));
  }

  return (
    <div className="p-6 max-w mx-auto bg-white shadow-md rounded-lg">
      <Link
        to="/bed56435-7544-417a-991e-caf2ed848307"
        className="bg-sage-500 text-white py-2 px-4 rounded hover:bg-sage-600 transition duration-300 inline-block"
      >
        Admin Page
      </Link>
      <h2 className="text-2xl font-semibold text-sage-600 my-3">
        Tim List
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 border border-sage-200">
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="bg-gray-100 odd:bg-white">
                {row.map((name, colIndex) => (
                  <td
                    key={colIndex}
                    className="p-1 border border-sage-300 text-center"
                  >
                    {name.nama_tim}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserList;
