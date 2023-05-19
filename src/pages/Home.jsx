import React, { useState } from "react";
import data from "../data/students.json";

function Home() {
  let key = 0;

  const [attendance, setAttendance] = useState({});

  const handleClick = (e) => {
    const date = document.querySelector("#date");
    console.log(date.value);
    if (date.value === "") {
      console.error("Please select Date");
      alert("Please select Date");
      date.focus();
      return;
    }
    const presentCheckboxes = [...document.querySelectorAll(".present-checkbox")];
    const presentStudents = presentCheckboxes
      .filter((checkbox) => checkbox.checked)
      .map((box) => box.value);

    const absentStudents = presentCheckboxes
      .filter((checkbox) => !checkbox.checked)
      .map((box) => box.value);
    setAttendance({ date: date.value, presentStudents, absentStudents });

    console.log("Success");
  };

  console.log(attendance);
  return (
    <div className="container">
      <input type="date" name="date" id="date" />
      <div className="students">
        <ul className="students__list">
          {data.map((data) => (
            <li key={key++}>
              <p>{data.name}</p>
              <label>
                <input
                  className="present-checkbox"
                  type="checkbox"
                  value={data.id}
                  name="present"
                />
                Present
              </label>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleClick}>Submit</button>
    </div>
  );
}

export default Home;
