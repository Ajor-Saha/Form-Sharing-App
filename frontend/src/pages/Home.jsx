import React from "react";
import { Link } from "react-router-dom";
import { RiAddLine } from "react-icons/ri";

export default function Home() {
  return (
    <div className="px-4 py-12 max-w-2xl mx-auto flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold  mb-4 text-slate-800">
        Welcome to my FormSharing App!
      </h1>
      <p>
        This app is a simple yet effective form builder tool. With its intuitive
        interface, users can effortlessly create custom forms using text fields.
        Once created, forms are automatically generated, ready to be shared with
        others to collect responses.
      </p>

      <Link to="/createForm">
        <button className="flex items-center mt-20 space-x-2 bg-blue-500 text-white px-10 py-3 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          <span>CreateForm</span>
          <RiAddLine size={20} />
        </button>
      </Link>
    </div>
  );
}
