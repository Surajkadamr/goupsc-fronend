import React from "react";
import Typewriter from "typewriter-effect";
import Testc from "../../components/testc";
function Testseries({ a, token, email }) {
  return (
    <div>
      <div className=" text-white text-lg md:text-2xl px-10 text-center py-10 md:py-20 bg-blue-500">
        <p className="text-white font-bold my-3">SUMUKHA E-SOLUTION PRESENTS</p>
        <Typewriter
          options={{
            loop: true,
            autoStart: true,
            strings: ["Blogs", "Daily Newspaper PDF", "Test-Series"],
          }}
        />
        <p className="text-white my-3 text-center md:block hidden">
          We provide you, not just Test Series but experience and knowledge
          passed down by the scholars.
        </p>
      </div>
      <div className="text-center">
        <p className="my-8 mx-2 text-lg md:text-3xl font-bold">
          Online Mock Test Series for Competitive karnataka Govt. Exams
        </p>
      </div>
      <div className="lg:grid lg:grid-cols-3 block">
        {a.map((item) => (
          <Testc
            title={item.attributes.title}
            key={item.id}
            home={false}
            email={email}
            token={token}
            id={item.id}
            price={item.attributes.price}
          />
        ))}
      </div>
    </div>
  );
}

export default Testseries;
export async function getServerSideProps(context) {
  let res = await fetch(`https://goupsc-backend.onrender.com/api/seriestests`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  let d = await res.json();
  return {
    props: { a: d.data }, // will be passed to the page component as props
  };
}
