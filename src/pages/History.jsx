import { useEffect, useState } from "react";
import Loading from "../components/Loading";

export default function History() {
  const [attendanceData, setAttendanceData] = useState();
  // TODO: Add all these fetch methods inside try catch blocks
  const getData = async () => {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_ENDPOINT
      }/tbldXf1ku6Ry6Vypo?sort%5B0%5D%5Bfield%5D=date&sort%5B0%5D%5Bdirection%5D=desc`,
      {
        headers: {
          Authorization: import.meta.env.VITE_API_AUTHORIZATION,
        },
      }
    );
    const jsonData = await response.json();
    // console.log(jsonData.records);
    setAttendanceData(jsonData.records);
  };

  // console.log("Attendance DATA STAte", attendanceData);

  useEffect(() => {
    getData();
  }, []);

  let listKey = 1;

  const attendanceMarkup = attendanceData
    ? attendanceData.map((data) => (
        <div key={data.fields.date} className="history-container">
          <p className="date">{data.fields.date}</p>
          <div className="present-students">
            <h2 className="attendance-title">Present Students</h2>
            <ul className="students-list">
              {/* Need to check this otherwise it will return error if the present_students_names is empty in case all were absent 😅 */}
              {data.fields.present_students_names &&
                data.fields.present_students_names.map((student) => (
                  <li key={listKey++}>{student}</li>
                ))}
            </ul>
          </div>
          <div className="students-task-status">
            <h2 className="attendance-title" data-style="task">
              Task Completed
            </h2>
            <ul className="students-list">
              {data.fields.task_done_names &&
                data.fields.task_done_names.map((student) => (
                  <li key={listKey++}>{student} - Completed</li>
                ))}
            </ul>
          </div>
          <div className="absent-students">
            <h2 className="attendance-title" data-style="absent">
              Absent Students
            </h2>
            <ul className="students-list">
              {data.fields.absent_students_names &&
                data.fields.absent_students_names.map((student) => (
                  <li key={listKey++}>{student}</li>
                ))}
            </ul>
          </div>
        </div>
      ))
    : "";

  return (
    <main>
      <h1>History of Attendance</h1>
      {attendanceData ? attendanceMarkup : <Loading />}
    </main>
  );
}
