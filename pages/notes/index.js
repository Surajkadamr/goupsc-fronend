import React, { useEffect } from "react";
import { useState } from "react";
import Notesf from "../../components/notesf";

function Notespdf() {
  const [d, setd] = useState();
  useEffect(() => {
    const fetchdetails = async () => {
      let res = await fetch(`https://goupsc-backend.onrender.com/api/notes`, {
        method: "GET",
      });
      let d = await res.json();
      console.log(d.data);
      if (d.data !== null) {
        setd(d.data);
      }
    };
    fetchdetails();
  }, []);
  return (
    <div>
      <div className="text-center text-blue-500 mt-5 text-2xl font-bold m-5">
        News-Paper Analysis Notes
      </div>
      {d && d.map((item) => <Notesf key={item.id} id={item.id} title={item.attributes.title} MainTitle={item.attributes.MainTitle} />)}
    </div>
  );
}

export default Notespdf;
