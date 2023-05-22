import React, { useState } from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { AttendanceContext } from "../contexts";

function Root() {
  // const [attendance, setAttendance] = useState({});
  const TBL_ATTENDANCE_DATA = "tbldXf1ku6Ry6Vypo";

  const authorization = `Bearer ${import.meta.env.API_AUTHORIZATION}`;

  const addAttendance = async () => {
    const date = document.querySelector("#date");
    console.log(date.value);
    console.log(typeof date.value);
    if (date.value === "") {
      console.error("Please select Date");
      alert("Please select Date");
      date.focus();
      return;
    }
    const presentCheckboxes = [...document.querySelectorAll(".present-checkbox")];
    const presentStudents = presentCheckboxes
      .filter((checkbox) => checkbox.checked)
      .map((box) => box.dataset.recordId);
    console.log(presentStudents);

    const absentStudents = presentCheckboxes
      .filter((checkbox) => !checkbox.checked)
      .map((box) => box.dataset.recordId);
    // setAttendance({ date: date.value, presentStudents, absentStudents });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/${TBL_ATTENDANCE_DATA}`, {
        method: "POST",
        headers: {
          Authorization: import.meta.env.VITE_API_AUTHORIZATION,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            date: date.value,
            present_students: presentStudents,
            // absent_students: absentStudents,
          },
        }),
      });
      const json = await response.json();
      return json;
    } catch (e) {
      console.error(e);
    }

    console.log("Success:::::::", json);

    // try {
    //   const res = await fetch(import.meta.env.API_ENDPOINT, {
    //     headers: {
    //       Authorization: authorization,
    //     },
    //   });
    // } catch (err) {
    //   console.err(err);
    // }
  };

  return (
    <AttendanceContext.Provider value={{ addAttendance }}>
      <Header />
      <div className="container">
        <Outlet />
      </div>
    </AttendanceContext.Provider>
  );
}

export default Root;
