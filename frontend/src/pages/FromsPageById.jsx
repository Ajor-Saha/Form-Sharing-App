import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const FormPageById = () => {
  const { formId } = useParams();
  const [formData, setFormData] = useState(null);
  const [formFields, setFormFields] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { accessToken } = useSelector((state) => state.user); // Accessing accessToken from Redux store

  useEffect(() => {
    // Fetch form data based on the formId
    const fetchFormData = async () => {
      try {
        const response = await fetch(`https://form-sharing-app.vercel.app/api/form/${formId}`);
  
        if (!response.ok) {
          throw new Error('Failed to fetch form data');
        }
        const { data } = await response.json();
        setFormData(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchFormData();
  }, [formId]);
  
  if (!formData) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    // Handle form submission here if needed

    // Check if all fields are filled
    const isAllFieldsFilled = formData.fields.every((field) => formFields[field.name]);

    if (!isAllFieldsFilled) {
      setErrorMessage('Please fill in all fields');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000); // Clear error message after 3 seconds
      return;
    }


    try {

      const fieldValues = formData.fields.map((field) => ({
        name: field.name,
        type: field.type,
        value: formFields[field.name] || '' // Use field.name directly here
      }));

      const response = await fetch(`https://form-sharing-app.vercel.app/api/form/${formId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`, // Include the access token in request headers
        },
        body: JSON.stringify({ fields: fieldValues }),
      });
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitSuccess(true);

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000); // Clear success message after 3 seconds
      console.log('Form submitted successfully');
      
    } catch (error) {
      console.error('Error submitting form:', error.message);
    }
  };

  // Function to handle input changes
  const handleInputChange = (event) => {
    setFormFields({
      ...formFields,
      [event.target.name]: event.target.value,
    });
  };


  return (
    <div className="py-32 w-full px-20 lg:px-48">
      <p className='px-5 py-2'>In order to submit this form you need to login first and then paste the form link to brower and then you can submit the form</p>
      <Link to="/sign-in" className='bg-gray-800 text-white px-3 py-2 mt-2'>Login</Link>
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
              value={formFields[field.name] || ''}
              onChange={handleInputChange}
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
      {errorMessage && (
        <div className="mt-4 text-red-600 dark:text-red-400">{errorMessage}</div>
      )}
      {submitSuccess && (
        <div className="mt-4 text-green-600 dark:text-green-400">Form submitted successfully</div>
      )}
    </div>
  );
};

export default FormPageById;
