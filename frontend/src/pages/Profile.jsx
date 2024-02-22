import React, { useEffect, useState } from "react";
import { signOut } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await fetch("/api/form/getAllResponses"); // Assuming this is the correct endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch responses");
        }
        const { data } = await response.json();
        setResponses(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchResponses();
  }, []);

  const handleSignOut = async () => {
    try {
      const response = await fetch("/api/user/signout", {
        method: "POST", // Adjust the method as needed
        // Add any required headers or options
      });

      if (response.ok) {
        dispatch(signOut());
      } else {
        throw new Error("Failed to sign out");
      }
    } catch (error) {
      console.log(error);
      // Optionally display an error message to the user
    }
  };

  return (
    <div className="flex flex-col justify-center items-center py-20">
      <div onClick={handleSignOut} className="cursor-pointer bg-gray-800 text-white px-5 py-2 w-32 text-center">
        Logout
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <h1 className="mt-10 bg-gray-600 text-white py-3 px-6"> Your Forms Responses</h1>
      <div className="flex flex-col md:flex-row py-20 justify-center items-center md:justify-between">
        
        {responses.map((response) => (
          <div key={response._id} className="max-w-sm bg-gray-700 text-white m-5 px-10 py-2 rounded-lg shadow-md">
            <h2>FormId : {response.formId}</h2>
            <p>ResponseId: {response.user}</p>
            <p>Responses by user</p>
            <div>
              {response.fields.map((field, index) => (
                <div key={index}>
                  <p>{field.name} : {field.value}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
