import React, { useState, useEffect } from "react";
import Blogcard from "../../components/blogcard";

function CountdownTimer() {
  const [d, setd] = useState();
  useEffect(() => {
    const fetchdetails = async () => {
      let res = await fetch(
        `https://goupsc-backend.onrender.com/api/blogs?populate=*`,
        {
          method: "GET",
        }
      );
      let d = await res.json();
      console.log(d.data);
      if(d.data!==null){
        setd(d.data)
    }
    };
    fetchdetails();
  }, []);
  return (
    <div>
    <h1 className="text-center lg:justify-center p-5 text-3xl font-bold text-blue-500">LATEST BLOGS</h1>
    <div className="lg:flex lg:justify-evenly p-5 text-justify">
      {d && d.map((item)=>
      <Blogcard key={item.id} title={item.attributes.title} link={item.id} desc={item.attributes.desc.slice(0,150)}/>
      )}
    </div>
    </div>
  );
}

export default CountdownTimer;
