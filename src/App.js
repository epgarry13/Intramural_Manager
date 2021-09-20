import React, { useState } from "react";
import axios from "axios";
import "./app.scss";

function App() {
  const [text, setText] = useState("");
  const [day, setDay] = useState("");
  const [dayInput, setDayInput] = useState("");

  const [todoEditing, setToDoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  const [displayData, setDisplay] = useState([]);

  function sendData() {
    const data = { text: text, day: dayInput };
    console.log(data);
    axios
      .post("http://127.0.0.1:5000/create/" + day, data)
      .then((response) => setDisplay(response.data.data));
  }

  const options = [
    { value: "", label: "Select..." },
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
  ];

  function getData(day) {
    axios
      .get("http://127.0.0.1:5000/read/" + day)
      .then((response) => setDisplay(response.data.data));
  }

  function deleteToDo(id) {
    axios
      .delete("http://127.0.0.1:5000/delete/" + day + "/" + id)
      .then((response) => setDisplay(response.data.data));
  }


  function editToDo(id){
    axios.put("http://127.0.0.1:5000/update/" + day + '/' + id + '/' + editingText)
    .then((response) => setDisplay(response.data.data));
  }
  return (
    <div className="App">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        autoComplete="off"
      >
        <input
          value={text}
          placeholder="To Do"
          onChange={(n) => {
            setText(n.target.value);
          }}
        ></input>
        <input
          value={dayInput}
          placeholder="Day of the week"
          onChange={(n) => {
            setDayInput(n.target.value);
          }}
        ></input>
        <div>
          <button
            onClick={() => {
              sendData();
              getData(day);
            }}
          >
            Send
          </button>
        </div>
      </form>

      <select
        value={day}
        onChange={(e) => {
          setDay(e.currentTarget.value);
          getData(e.currentTarget.value);
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <ul>
        {" "}
        TO DO:
        {displayData.length > 0 &&
          displayData.map((data) => (
            <li key={data[1]}>
              
              {todoEditing === data[1] ?
              <><input type='text' onChange={(e) => setEditingText(e.target.value)} value={editingText} />
              <button
                onClick={()=> {
                  
                  editToDo(data[1])
                  setToDoEditing(null) 
                  setEditingText("")
                  
                }}
              >Submit Edits</button></>
              :
              <>
              <div>{data[0]}</div>
              <button
                onClick={() => {
                  setToDoEditing(data[1]);
                }}
              >
                Edit To Do
              </button>
              </>
              }

              <button
                onClick={() => {
                  deleteToDo(data[1]);
                }}
              >
                Delete
              </button>
            </li>
          ))}
      </ul>

    </div>
  );
}

export default App;
