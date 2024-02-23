import React, { useState } from "react";

const Form = ({ formData }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here if needed
  };

  
  const baseUrl = 'https://form-sharing-app-1yl7.vercel.app'; 
  const [uniqueLink, setUniqueLink] = useState('');

  const generateUniqueLink = () => {
    // Generate the unique link based on the formId and baseUrl
    const newUniqueLink = `${baseUrl}/form/${formData._id}`;
    setUniqueLink(newUniqueLink);
  };

  // Function to copy the unique link to the clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(uniqueLink);
    // Optionally provide feedback to the user that the link has been copied
    alert('Link copied to clipboard!');
  };


  return (
    <div className="py-5 max-w-sm">
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-600 mb-4">
        Form id:{formData._id}
      </h3>{" "}
      {/* Adjust access to _id */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {formData.fields.map((field) => (
          <div key={field._id} className="flex flex-col">
            {" "}
            {/* Adjust access to _id */}
            <label
              htmlFor={field.name}
              className="text-sm font-medium text-gray-900 dark:text-gray-900 mb-1"
            >
              {field.name}
            </label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-primary-800"
        >
          Submit
        </button>
      </form>
      <div className="flex flex-col">
      <button onClick={generateUniqueLink} className="text-sm text-slate-200 bg-gray-700 px-3 py-1 rounded-md mt-2 cursor-pointer">Share This Form</button>
      <button onClick={copyToClipboard} className="text-sm text-slate-200 bg-gray-700 px-3 py-1 rounded-md mt-2 cursor-pointer">Copy Link to Clipboard</button>
      <p>Unique Link: {uniqueLink}</p>
      </div>
    </div>
  );
};

export default Form;
