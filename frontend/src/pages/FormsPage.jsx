import React, { useState, useEffect } from "react";
import Form from "../components/Form";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const FormsPage = () => {
  const [forms, setForms] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const { accessToken } = useSelector((state) => state.user); // Accessing accessToken from Redux store

  useEffect(() => {
    const fetchUserForms = async () => {
      try {
        const response = await fetch("https://form-sharing-app.vercel.app/api/form/getUserForms", {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Include the access token in request headers
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user forms");
        }
        const { data } = await response.json();
        setForms(Array.isArray(data) ? data : []);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserForms();
  }, [accessToken]);

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-center py-2 bg-gray-600 text-white w-40 m-5">My Forms</h2>
      <Link to="/profile" className="mt-5 bg-gray-600 text-white px-5 py-2"> Your Form Responses</Link>
      <div className="py-10 px-10 flex flex-col">
      {isLoading ? ( // Show loading message if data is still loading
        <div>Loading...</div>
      ) : (
        <div className="py-10 px-10 flex flex-col">
          {forms &&
            forms.map(
              (
                form // Check if forms is not null before mapping
              ) => <Form key={form._id} formData={form} />
            )}
        </div>
      )}
      </div>
    </div>
  );
};

export default FormsPage;
