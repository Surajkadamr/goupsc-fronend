import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
function Account({ token ,name,logOut}) {
    let router = useRouter();
  return (
    <div>
      {token && (
        <div>
          <h1 className="text-center my-3 text-2xl font-bold">
            Account
          </h1>
          <div className="m-5 p-5 shadow-lg lg:w-1/3 md:w-1/2 md:m-auto">
            <div className=" md:mx-5 p-5 flex">
              <img src={`https://ui-avatars.com/api/?length=1&name=${name}&background=random`} alt="suraj" />
              <p className="my-4 ml-5 text-base md:text-xl font-semibold">{name}</p>
            </div>
            <hr className="text-black text-2xl m-2"/>
            <Link href={"/order"}><p className="md:mx-10 mx-5 text-gray-500 text-xl my-6">Your orders</p></Link>
            <hr className="text-black text-2xl"/>
            <Link href={"/changepassword"}><p className="md:mx-10 mx-5 text-gray-500 text-xl my-6">Change Password</p></Link>
            <hr className="text-black text-2xl"/>
            <button onClick={logOut} className=" my-6 mx-5 md:mx-10 text-gray-500 text-xl">Log-out</button>
          </div>
        </div>
      )}
      {!token && (
        <div className="items-center my-44">
          <Image
            className="m-auto"
            src="/s1.png"
            width={200}
            height={300}
            alt="Authentication is required!"
          ></Image>
          <p className="text-center m-5 text-gray-400">
            Authentication is required.You need to sign into your account.
          </p>
          <Link href="/login">
            <button className="flex m-auto text-white text-sm bg-blue-600 hover:bg-blue-300 rounded-md font-semibold px-5 py-2 text-center ">
              Login
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Account;
