import React, { useContext, useEffect, useState } from "react";
import { AttendanceContext } from "../contexts";
import Loading from "../components/Loading";

function Home() {
  let key = 0;

  const { addAttendance } = useContext(AttendanceContext);

  const [students, setStudents] = useState();

  const getStudentsData = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/students`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: import.meta.env.VITE_API_AUTHORIZATION,
      },
    });

    const json = await response.json();

    setStudents(json.records);
  };

  useEffect(() => {
    getStudentsData();
  }, []);

  return (
    <div className="container">
      <input type="date" name="date" className="date" id="date" />
      <div className="students">
        <ul className="students__list">
          {students ? (
            students.map((data) => (
              <li key={data.id}>
                <p>{data.fields.name}</p>
                <div className="attendance-inputs">
                  <label>
                    <input
                      className="present-checkbox"
                      type="checkbox"
                      data-record-id={data.id}
                      value={data.fields.id}
                      name="present"
                    />
                    Present
                  </label>
                  <label>
                    <input
                      className="laptop-checkbox"
                      type="checkbox"
                      data-record-id={data.id}
                      value={data.fields.id}
                      name="present"
                    />
                    💻
                  </label>
                </div>
              </li>
            ))
          ) : (
            <Loading />
          )}
        </ul>
      </div>
      <button className="btn" data-style="primary" onClick={addAttendance}>
        Submit
      </button>
    </div>
  );
}

export default Home;
