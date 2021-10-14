import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/details.scss";

function Details(props) {
  const [data, setData] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [backups, setBackups] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/details/" + props.id).then((response) => {
      setData(response.data.data[0]);
      setAttendance(response.data.data[0]["attendees"]);
      setBackups(response.data.data[0]["backups"]);
    });
  }, [props.id]);

  function makeBackup(e){
    const backup = { name: e };
    axios.put("http://127.0.0.1:5000/update/" + props.id, backup).then((response) => {
        setAttendance(response.data.data[0]["attendees"]);
        setBackups(response.data.data[0]["backups"]);
      });
  }

  function deletePlayer(e){
    axios.delete("http://127.0.0.1:5000/delete/" + props.id + "/" + e).then((response) => {
        setAttendance(response.data.data[0]["attendees"]);
      });
  }

  return (
    <>
      <div className="page_container">
      <div className="header_container_details">
        <h2>Game Details</h2>
        </div>
      </div>
      <div className="header_container_details">
        <h3>opponent</h3>
        <h3>location</h3>
        <h3>time</h3>
        <h3>date</h3>
      </div>
      <div className="header_container_details">
        <div>{data.opponent}</div>
        <div>{data.location}</div>
        <div>{data.time}</div>
        <div>{data.date}</div>
      </div>

      <div className="header_container_details mt-20">
        <h2>Attendance</h2>
      </div>

      <div className="header_container_details">
        <h3>attendees</h3>
        <h3>contact information</h3>
        <h3>back-ups</h3>
        <h3>contact information</h3>
      </div>

      <div className="details_container">
        <div className="attendees">
          {attendance.length > 0 ? (
            attendance.map((item) => {
              return (
                <div className="attendee" key={item.name}>
                  {item.name}
                  <button onClick={() => makeBackup(item.name)}>Make Backup</button>
                  <button onClick={() => deletePlayer(item.name)}>Delete</button>
                </div>
              );
            })
          ) : (
            <div></div>
          )}
        </div>

        <div className="contact_info1">
          {attendance.length > 0 ? (
            attendance.map((item) => {
              return (
                <div className="attendee" key={item.name}>
                  {item.email}
                </div>
                
              );
            })
          ) : (
            <div></div>
          )}
        </div>

        <div className="backups">
          {backups.length > 0 ? (
            backups.map((item) => {
              return (
                <div className="backup" key={item.name}>
                  {item.name}
                </div>
              );
            })
          ) : (
            <div></div>
          )}
        </div>

        <div className="backups contact">
          {backups.length > 0 ? (
            backups.map((item) => {
              return (
                <div className="backup" key={item.name}>
                  {item.email}
                </div>
              );
            })
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
}

export default Details;
