import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/summary.scss";
import { Link } from "react-router-dom";

function Summary() {

  const [ data, setData ] = useState([]);

  useEffect(()=>{
    axios
    .get("http://127.0.0.1:5000/summary")
    .then((response) => setData(response.data.data));
  }, [])



  return (
    <>
      <div className="page_container">
        <h1>Schedule Summary</h1>
        <div className="header_container">
          <h3>Opponent</h3>

          <h3>Location</h3>

          <h3>Date</h3>

          <h3>Time</h3>


        </div>
        {data.length > 0 ?
        data.map((item, i) => {
            return (
            <Link to={"/details/" + item.id} className="indiv_game" key={i}>
                <div>
                    {item.opponent}

                </div>
                <div>
                    {item.location}

                </div>
                <div>
                    {item.date}

                </div>
                <div>
                    {item.time}

                </div>
            </Link>
            )
        })
        :
        <div>Loading...</div>
        }

      </div>
    </>
  );
}

export default Summary;
