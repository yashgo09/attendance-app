import React, { useContext } from "react";
import data from "../data/students.json";
import { AttendanceContext } from "../contexts";

function Home() {
  let key = 0;

  const { addAttendance } = useContext(AttendanceContext);

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
      <button onClick={addAttendance}>Submit</button>
    </div>
  );
}

export default Home;
