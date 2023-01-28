import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Changepassword({token}) {
    const router = useRouter();
    const [cp, setcp] = useState("");
  const [np, setnp] = useState("");
  const [conp, setconp] = useState("");
  const change = (e) => {
    if (e.target.name == "cp") {
      setcp(e.target.value);
    } else if (e.target.name == "np") {
      setnp(e.target.value);
    } else if (e.target.name == "conp") {
      setconp(e.target.value);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const data1 = {
      currentPassword: cp,
      password: np,
      passwordConfirmation: conp,
    };
    let res = await fetch(`https://goupsc-backend.onrender.com/api/auth/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data1),
    });
    const data = await res.json();

    if (!data.error) {
      localStorage.setItem("token", data.jwt);
      localStorage.setItem("name", data.user.username);
      localStorage.setItem("email", data.user.email);
      toast.success("Password Change Successfull!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } else {
      toast.error(data.error.message, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <div>
      <ToastContainer />
      <h1 className="text-center text-blue-500 mt-5 text-2xl font-bold">
        Change Password
      </h1>
      <form
        onSubmit={onSubmit}
        className="block shadow-2xl text-left w-full md:w-1/2 lg:w-1/3  mx-auto rounded-xl mt-5 mb-10  md:my-16 py-10 md:px-20 px-10"
      >
        <div className="mb-3">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Current Password
          </label>
          <input
            type="text"
            name="cp"
            minLength={6}
            value={cp}
            onChange={change}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Current Password"
            required
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            New Password
          </label>
          <input
            type="text"
            name="np"
            value={np}
            minLength={6}
            onChange={change}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="New Password"
            required
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm Password
          </label>
          <input
            type="text"
            name="conp"
            value={conp}
            minLength={6}
            onChange={change}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="New Password"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Changepassword;
