import React from "react";
import data from "../data/students.json";

function Home() {
  return (
    <div className="container">
      <div className="students">
        {data.map((data) => (
          <>
            <p>{data.id}</p>
            <p>{data.name}</p>
          </>
        ))}
      </div>
    </div>
  );
}

export default Home;
