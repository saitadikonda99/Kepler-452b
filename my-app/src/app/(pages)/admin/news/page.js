import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <div className="NewsComponent">
      <div className="NewsComponent-in">
        <div className="News-one">
          <h1>News</h1>
          <Link href="/admin/news/portrait">Potrait</Link>
          <Link href="/admin/news/landscape">Landscape</Link>
        </div>
      </div>
    </div>
  );
};

export default page;
