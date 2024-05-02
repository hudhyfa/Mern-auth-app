import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Admin() {
  const [userData, setUserData] = useState([]);
  const getUsers = async () => {
    try {
      const res = await fetch("/api/admin/panel");
      const data = await res.json();
      if (data.success === false) return;
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="p-6 max-w-7xl mx-auto my-auto">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Profile
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {userData.length > 0
              ? userData.map((user) => {
                  return (
                    <tr
                      className="odd:bg-white  even:bg-gray-50"
                      key={user._id}
                    >
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        <img
                          src={user.profilePicture}
                          alt="profile"
                          className="h-7 w-7 rounded-full object-cover self-center"
                        />
                      </td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">{user.username}</td>
                      <td className="px-6 py-4">
                        <Link
                          to={'/'}
                          className="font-medium text-blue-600  hover:underline"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  );
                })
              : "No users, its okay don't woory"}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
