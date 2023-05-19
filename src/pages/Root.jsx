import React, { useState } from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { AttendanceContext } from "../contexts";

function Root() {
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
    <AttendanceContext.Provider value={{ handleClick }}>
      <Header />
      <Outlet />
    </AttendanceContext.Provider>
  );
}

export default Root;
