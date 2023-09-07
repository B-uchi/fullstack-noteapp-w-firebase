import React, { useState, useEffect } from "react";
import axios from "axios";

const Notes = (props) => {
  const [notes, setNotes] = useState([]);
  const [postcreated, setPostCreated] = useState(false)
  const state = props.state;
  // // setPostCreated(!state)
  // console.log(state)

  const fetchNotes = async () => {
    const requestDash = {
      method: "GET",
      url: "http://localhost:5555/notes",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("@token"),
      },
    };
    await axios
      .request(requestDash)
      .then((response) => {
        setNotes(response.data.notes.reverse());
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="bg-white overflow-y-auto w-full h-full flex flex-col justify-center items-center">
      {notes &&
        notes.map((note, index) =>
          note ? (
            <div
              className="bg-amber-300 mb-4 p-3 w-[50%] rounded-md"
              key={index}
            >
              <h2 className="text-3xl font-bold">Title: {note.title}</h2>
              <div className="">
                <p>{note.description}</p>
                <p>Remind me on: {note.date}</p>
              </div>
            </div>
          ) : (
            ""
          )
        )}
    </div>
  );
};

export default Notes;
