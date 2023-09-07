import axios, { spread } from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const [shouldPageLoad, setShouldPageLoad] = useState(false);
  const [username, setUsername] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [hasCreate, setHasCreate] = useState(false);
  const [loading, setLoading] = useState(false);

  const createPost = (e) => {
    e.preventDefault();
    const fullDate = date + " @ " + time;
    const postNoteRequest = {
      data: { title, description, fullDate },
      method: "POST",
      url: "https://notefull-backend.vercel.app/notes",
      headers: { Authorization: "Bearer " + localStorage.getItem("@token") },
    };

    axios
      .request(postNoteRequest)
      .then((response) => {
        if (response.status === 201) {
          setHasCreate(!hasCreate);
          alert("Note created successfully");
        }
      })
      .catch((e) => {
        if (e.response.data) {
          console.log(e.response.data.message);
          alert(`${e.response.data.message}`);
        } else {
          console.log("Some error occured...");
        }
      });
  };

  const signOut= async ()=>{
    const signoutRequest = {
        method: "GET",
        url: "https://notefull-backend.vercel.app/signout",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("@token"),
        },
      };
      await axios
        .request(requestDash)
        .then((response) => {
          alert('Successfully logged out')
          localStorage.removeItem("@token")
          navigate("/");
        })
        .catch((e) => {
          console.log(e);
        });
    };
    
  };

  useEffect(() => {
    const fetchNotes = async () => {
      const requestDash = {
        method: "GET",
        url: "https://notefull-backend.vercel.app/notes",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("@token"),
        },
      };
      await axios
        .request(requestDash)
        .then((response) => {
          setNotes(response.data.notes.reverse());
          setLoading(true);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchNotes();
  }, [hasCreate]);

  const checkLoggedIn = async () => {
    const requestDash = {
      method: "GET",
      url: "https://notefull-backend.vercel.app/dashboard",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("@token"),
      },
    };
    await axios
      .request(requestDash)
      .then((response) => {
        setUsername(response.data.username);
        setShouldPageLoad(true);
      })
      .catch((e) => {
        if (e.response.data) {
          console.log(e.response.data);
          navigate("/");
          setShouldPageLoad(false);
          return alert(`${e.response.data.message}`);
        }
      });
  };
  useEffect(() => {
    checkLoggedIn();
  }, []);
  return (
    <div className="">
      {shouldPageLoad ? (
        <div className="flex w-full h-[100vh] overflow-hidden">
          <div className="p-4 w-[30%] bg-blue-400">
            <div className="flex flex-col justify-center items-center h-full">
              <h1 className="font-bold text-2xl mb-4 text-left w-[95%]">
                Welcome, {username}!
              </h1>
              <div className="bg-white rounded-lg w-[95%] p-3">
                <h1 className="font-bold text-xl mb-3">Add Note</h1>
                <form
                  className="form"
                  action="/"
                  method="post"
                  onSubmit={createPost}
                >
                  <div className="mb-4">
                    <p>Title: </p>
                    <input
                      type="text"
                      placeholder="Note title..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="mb-5">
                    <p>Description: </p>
                    <input
                      type="Text"
                      placeholder="Note description..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="flex">
                    <div className="mb-5">
                      <p>Time: </p>
                      <input
                        type="Text"
                        placeholder="Enter time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                      />
                    </div>
                    <div className="mb-5">
                      <p>Date: </p>
                      <input
                        type="Text"
                        placeholder="Enter date..."
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="w-full flex flex-col">
                    <button
                      className="bg-[#27ae60] p-3 hover:scale-105 transition-all px-9 mb-2 rounded-lg mx-auto"
                      type="submit"
                    >
                      Create
                    </button>
                  </div>
                </form>
              </div>
              <button className="p-3 px-5 rounded bg-red-500 mt-10" onClick={signOut}>Sign Out</button>
            </div>
          </div>
          <div className="p-5 flex justify-center items-center w-[70%]">
            {loading ? (
              <div className="bg-white overflow-y-auto w-full h-full flex flex-col  items-center">
                {notes &&
                  notes.map((note, index) =>
                    note ? (
                      <div
                        className="bg-amber-300 mb-4 p-3 w-[50%] rounded-md"
                        key={index}
                      >
                        <h2 className="text-3xl font-bold">
                          Title: {note.title}
                        </h2>
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
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        <div className="">Go and Login</div>
      )}
    </div>
  );
};

export default Dashboard;
