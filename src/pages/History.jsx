import { useEffect, useState } from "react";

export default function History() {
  const [attendanceData, setAttendanceData] = useState();
  // TODO: Add all these fetch methods inside try catch blocks
  const getData = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/tbldXf1ku6Ry6Vypo`, {
      headers: {
        Authorization: import.meta.env.VITE_API_AUTHORIZATION,
      },
    });
    const jsonData = await response.json();
    // console.log(jsonData.records);
    setAttendanceData(jsonData.records);
  };

  useEffect(() => {
    getData();
  }, []);

  let listKey = 1;

  const attendanceMarkup =
    attendanceData &&
    attendanceData.map((data) => (
      <div key={data.fields.date} className="history-container">
        <p className="date">{data.fields.date}</p>
        <div className="present-students">
          <h2 className="attendance-title">Present Students</h2>
          <ul>
            {data.fields.present_students_names.map((student) => (
              <li key={listKey++}>{student}</li>
            ))}
          </ul>
          <h2 className="attendance-title">Absent Students</h2>
          <ul>
            {data.fields.absent_students_names.map((student) => (
              <li key={listKey++}>{student}</li>
            ))}
          </ul>
        </div>
      </div>
    ));

  return (
    <main>
      <h1>History of Attendance</h1>
      {attendanceData ? (
        attendanceMarkup
      ) : (
        <p className="loading">
          <i>Loading data...</i>
        </p>
      )}
    </main>
  );
}
