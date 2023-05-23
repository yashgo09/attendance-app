import React, { useState } from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { AttendanceContext } from "../contexts";
import SuccessMessage from "../components/SuccessMessage";

function Root() {
  // const [attendance, setAttendance] = useState({});
  const TBL_ATTENDANCE_DATA = "tbldXf1ku6Ry6Vypo";

  function showSuccessMessage() {
    const successMessage = document.querySelector(".success-message");
    successMessage.classList.add("show");
    setTimeout(() => {
      successMessage.classList.remove("show");
    }, 2000);
  }

  const addAttendance = async (e) => {
    e.target.disabled = true;

    // Check if date is selected or not.
    const date = document.querySelector("#date");
    if (date.value === "") {
      alert("Please select Date");
      date.focus();
      e.target.disabled = false;
      // Return from here if the date is not selected.
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
            present_students_id: presentStudents,
            absent_students_id: absentStudents,
          },
        }),
      });
      const json = await response.json();

      showSuccessMessage();
      [...document.querySelectorAll(".present-checkbox")].forEach((box) => (box.checked = false));
      date.value = "";
      e.target.disabled = false;

      return json;
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AttendanceContext.Provider value={{ addAttendance }}>
      <Header />
      <SuccessMessage />
      <div className="container">
        <Outlet />
      </div>
    </AttendanceContext.Provider>
  );
}

export default Root;
