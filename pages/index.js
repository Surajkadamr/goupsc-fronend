import Head from "next/head";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import Imageslider from "../components/imageslider";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Testc from "../components/testc";
import Blogcard from "../components/blogcard";
export default function Home({ a, d }) {

  return (
    <>
      <div>
        <Imageslider />
        <h1 className="text-center text-xl md:mt-10 mt-10 font-bold">
          Latest Test-Series
        </h1>
        <Splide
          options={{ rewind: true }}
          aria-label="React Splide Example"
          className="lg:mx-64"
        >
          {a &&
            a.map((item) => (
              <SplideSlide key={item.id} className="px-5 py-3">
                <Testc
                  title={item.attributes.title}
                  key={item.id}
                  home={true}
                  id={item.id}
                />
              </SplideSlide>
            ))}
        </Splide>
        <div>
          <h1 className="text-center text-xl md:mt-10 font-bold">
            Latest Blogs
          </h1>
          <div className="lg:flex lg:justify-evenly p-5 text-justify">
            {d &&
              d.map((item) => (
                <Blogcard
                  key={item.id}
                  title={item.attributes.title}
                  link={item.id}
                  desc={item.attributes.desc.slice(0, 150)}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps(context) {
  let res = await fetch(`https://goupsc-backend.onrender.com/api/seriestests`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  let d = await res.json();
  let res1 = await fetch(`https://goupsc-backend.onrender.com/api/blogs?populate=*`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });

  let c = await res1.json();
  return {
    props: { a: d.data, d: c.data }, // will be passed to the page component as props
  };
}
