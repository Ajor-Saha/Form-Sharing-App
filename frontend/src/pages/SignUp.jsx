import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };


  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col py-32 bg-slate-100">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <form onSubmit={handleSubmit}>
          <p className="text-red-700">{error && "Something went wrong!"}</p>
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center text-blue-400">Sign up</h1>

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="username"
              placeholder="username"
              id="username"
              onChange={handleChange}
            />

            <input
              type="email"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              id="email"
              onChange={handleChange}
            />

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              id="password"
              onChange={handleChange}
            />

            <button
              disabled={loading}
              className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1 bg-blue-500"
            >
              {loading ? "Loading..." : "Create Account"}
            </button>

            <div className="text-center text-sm text-grey-dark mt-4">
              By signing up, you agree to the{" "}
              <a
                className="no-underline border-b border-grey-dark text-grey-dark"
                href="#"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                className="no-underline border-b border-grey-dark text-grey-dark"
                href="#"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </form>

        <div className="text-grey-dark mt-6">
          Already have an account?{" "}
          <Link
            className="no-underline border-b border-blue text-blue-500"
            to="/sign-in"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
