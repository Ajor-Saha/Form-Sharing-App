import React, { useState } from "react";
import { RiAddLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const CreateForm = () => {
  const [formFields, setFormFields] = useState([]);
  const [fieldName, setFieldName] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [error, setError] = useState(null);
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [isCreatingForm, setIsCreatingForm] = useState(false); // Track whether the form is being created

  const handleCreateField = () => {
    setIsCreatingForm(true); // Set isCreatingForm to true when creating form
  };

  const handleNextField = () => {
    if (fieldName.trim() !== "") {
      setFormFields([...formFields, { type: "text", name: fieldName }]);
      setFieldName("");
      setCurrentFieldIndex(currentFieldIndex + 1);
    } else {
      setError("Field name cannot be empty");
    }
  };

  const handleCreateForm = async () => {
    try {
      // Check if formFields array is empty
      if (formFields.length === 0) {
        throw new Error("No form fields added");
      }

      // Check if all form field names are provided
      const missingFieldNames = formFields.some((field) => !field.name);
      if (missingFieldNames) {
        throw new Error("All form field names are required");
      }

      // Send formFields to backend
      const response = await fetch("/api/form/createForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fields: formFields }),
      });

      if (!response.ok) {
        throw new Error("Failed to create form");
      }

      const data = await response.json();
      console.log(data);

      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        setIsCreatingForm(false); // Reset isCreatingForm to false after form creation
        setCurrentFieldIndex(0);
        setFieldName("");
        setFormFields([]);
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFieldNameChange = (e) => {
    setFieldName(e.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center py-20 gap-10">
      <p className="px-10 lg:px-24">
        Welcome to our simple yet efficient form builder tool! With just a few
        clicks, you can effortlessly create custom forms tailored to your needs.
        Our easy-to-use interface lets you quickly create forms using just <span className="text-blue-500 px-1">three</span> text fields.
        Once you've inputted your desired fields, your form
        will be automatically generated and ready to use.
      </p>
      <h2 className="bg-slate-500 text-white px-5 py-2">Form Builder</h2>
      {showSuccessMessage && <div>Form created successfully!</div>}

      {!isCreatingForm && ( // Render "Create Form" button if not creating form
        <button
          onClick={handleCreateField}
          className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          <span>Create Form</span>
          <RiAddLine size={20} />
        </button>
      )}

      {isCreatingForm && currentFieldIndex < 3 && (
        <div className="gap-5">
          <label className="">
            Field Name {currentFieldIndex + 1}:
            <input
              type="text"
              value={fieldName}
              onChange={handleFieldNameChange}
              className="bg-gray-100 border ml-3 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </label>
          <button
            onClick={handleNextField}
            className="ml-5 bg-slate-500 text-white px-5 py-2 text-sm rounded-lg"
          >
            Next
          </button>
        </div>
      )}

      {isCreatingForm && currentFieldIndex === 3 && (
        <button
          onClick={handleCreateForm}
          className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Build Form
        </button>
      )}
      <div className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
        <Link to="/getallForms">Your Created Forms</Link>
      </div>
    </div>
  );
};

export default CreateForm;
