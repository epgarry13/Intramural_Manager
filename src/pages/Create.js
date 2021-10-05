import React, { useState } from "react";
import axios from "axios";
import "../styles/create.scss";

function Create() {

  // DYNAMIC FORM FUNCTIONS FOR TEAM MEMBERS
  const [inputList, setInputList] = useState([
    { name: "", email: "", phone: "" },
  ]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;

    setInputList(list);
  };

  const handleAddInput = () => {
    setInputList([...inputList, { name: "", email: "", phone: "" }]);
  };

  const handleRemoveInput = (index) => {
    const list = [...inputList];
    console.log(index);
    list.splice(index, 1);
    setInputList(list);
  };
  // ***************************************

  // DYNAMIC FORM FUNCTIONS FOR SCHEDULE
    const [inputScheduleList, setInputScheduleList] = useState([
        { date: "", time: "", opponent: "", location: "" },
      ]);
    
      const schedhandleChange = (e, index) => {

        const { name, value } = e.target;
        const list = [...inputScheduleList];

        list[index][name] = value;
    
        setInputScheduleList(list);
      };
    
      const schedhandleAddInput = () => {
        setInputScheduleList([...inputScheduleList, { date: "", time: "", opponent: "", location: "" }]);
      };
    
      const schedhandleRemoveInput = (index) => {
        const list = [...inputScheduleList];
        list.splice(index, 1);
        setInputScheduleList(list);
      };
      // ***************************************

  function sendData() {
    const data = { team: inputList, schedule: inputScheduleList };
    console.log(data);
    axios
      .post("http://127.0.0.1:5000/create", data)
      .then((response) => console.log(response));
    //   .then((response) => setDisplay(response.data.data));
    window.location = '/summary';
  }


//   function getData(day) {
//     axios
//       .get("http://127.0.0.1:5000/read/" + day)
//       .then((response) => setDisplay(response.data.data));
//   }

//   function deleteToDo(id) {
//     axios
//       .delete("http://127.0.0.1:5000/delete/" + day + "/" + id)
//       .then((response) => setDisplay(response.data.data));
//   }

//   function editToDo(id) {
//     axios
//       .put("http://127.0.0.1:5000/update/" + day + "/" + id + "/" + editingText)
//       .then((response) => setDisplay(response.data.data));
//   }
  return (
    <>
      <div className="page_container">
        <div>
          <h1>create your team</h1>
        </div>

        <div>
          <h2>schedule</h2>
         
          <form>
              {inputScheduleList.map((item, i) => {
                return (
                  <div key={i}>
                    <input
                      type="text"
                      name="date"
                      placeholder="date"
                      value={item.date}
                      onChange={(e) => schedhandleChange(e, i)}
                    ></input>
                    <input
                      type="text"
                      name="time"
                      placeholder="time"
                      value={item.time}
                      onChange={(e) => schedhandleChange(e, i)}
                    ></input>
                    <input
                      type="text"
                      name="opponent"
                      placeholder="opponent"
                      value={item.opponent}
                      onChange={(e) => schedhandleChange(e, i)}
                    ></input>
                                        <input
                      type="text"
                      name="location"
                      placeholder="location"
                      value={item.location}
                      onChange={(e) => schedhandleChange(e, i)}
                    ></input>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        schedhandleRemoveInput(i);
                      }}
                    >
                      Remove Game
                    </button>
                  </div>
                );
              })}
            </form>

            <button onClick={schedhandleAddInput}>Add Game +</button>



         
        </div>
        <div>
          <h2>team members</h2>
          <div>
            <form>
              {inputList.map((item, i) => {
                return (
                  <div key={i}>
                    <input
                      type="text"
                      name="name"
                      placeholder="name"
                      value={item.name}
                      onChange={(e) => handleChange(e, i)}
                    ></input>
                    <input
                      type="text"
                      name="email"
                      placeholder="email"
                      value={item.email}
                      onChange={(e) => handleChange(e, i)}
                    ></input>
                    <input
                      type="text"
                      name="phone"
                      placeholder="phone number"
                      value={item.phone}
                      onChange={(e) => handleChange(e, i)}
                    ></input>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleRemoveInput(i);
                      }}
                    >
                      Remove Player
                    </button>
                  </div>
                );
              })}
            </form>
            <button onClick={handleAddInput}>Add Player +</button>
          </div>
        </div>
      </div>
      <button onClick={sendData}>
          create team
      </button>
    </>
  );
}

export default Create;
