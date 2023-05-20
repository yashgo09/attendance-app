import React, { useState } from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { AttendanceContext } from "../contexts";

function Root() {
  const [attendance, setAttendance] = useState({});
  console.log(import.meta.env.API_ENDPOINT);
  const authorization = `Bearer ${import.meta.env.API_AUTHORIZATION}`;

  const addAttendance = async (e) => {
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

    // try {
    //   const res = await fetch(import.meta.env.API_ENDPOINT, {
    //     headers: {
    //       Authorization: authorization,
    //     },
    //   });
    // } catch (err) {
    //   console.err(err);
    // }
    console.log("Success");
  };

  return (
    <AttendanceContext.Provider value={{ addAttendance, attendance }}>
      <Header />
      <div className="container">
        <Outlet />
      </div>
    </AttendanceContext.Provider>
  );
}

export default Root;
