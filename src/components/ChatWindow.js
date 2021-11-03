import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import {
  selectUserName,
  selectUserPhoto,
  selectUserUid,
} from "../features/user/userSlice";
import db from "../firebase";
import { useSelector } from "react-redux";
import { useCollectionData } from "react-firebase-hooks/firestore";
import moment from 'moment';

function ChatWindow() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const username = useSelector(selectUserName);
  const uid = useSelector(selectUserUid);
  const userPhoto = useSelector(selectUserPhoto);
  const messagesRef = db.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);
  const [messages] = useCollectionData(query, { idFiled: "id" });
  const msgRef = useRef();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      try {
        await db.collection("messages").add({
          msg: input.trim(),
          username,
          userPhoto,
          createdAt: Date.now(),
          uid,
        });
        setInput("");
        msgRef.current.scrollIntoView({ behavior: "smooth" });
      } catch (err) {
        alert(err.message);
      }
    }
  };

  return isOpen ? (
    <Chatt>
      <section className="chatbox">
        <section className="chat-window">
          <NavClose>
            <h4 style={{ marginLeft: "10px" }}>Live Chat</h4>
            <img src="images/close.png" alt="Close" onClick={() => setIsOpen(false)} />
          </NavClose>
          {messages &&
            messages.map((m) => {
              console.log(m.createdAt);
              return m.uid !== uid ? (
                // receiver is me
                <article className="msg-container msg-remote">
                  <div className="msg-box">
                    <img className="user-img" id="user-0" src={m.userPhoto} />
                    <div className="flr">
                      <div className="messages">
                        <p className="msg">{m.msg}</p>
                      </div>
                      <span className="timestamp">
                        <span className="username">{m.username}</span>&bull;
                        <span className="posttime">{m.createdAt}</span>
                      </span>
                    </div>
                  </div>
                </article>
              ) : (
                // Sender is me
                <article className="msg-container msg-self">
                  <div className="msg-box">
                    <div className="flr">
                      <div className="messages">
                        <p className="msg">{m.msg}</p>
                      </div>
                      <span className="timestamp">
                        <span className="username">{m.username}</span>&bull;
                        <span className="posttime">{moment(m.createdAt).fromNow()}</span>
                      </span>
                    </div>
                    <img className="user-img" id="user-0" src={m.userPhoto} />
                  </div>
                </article>
              );
            })}
          <span ref={msgRef}></span>
        </section>
        <form className="chat-input" onSubmit={handleFormSubmit}>
          <input
            type="text"
            autoComplete="on"
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleFormSubmit}>
            <svg style={{ width: "24px", height: "24px" }} viewBox="0 0 24 24">
              <path
                fill="rgba(0,0,0,.38)"
                d="M17,12L12,17V14H8V10H12V7L17,12M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L5,8.09V15.91L12,19.85L19,15.91V8.09L12,4.15Z"
              />
            </svg>
          </button>
        </form>
      </section>
    </Chatt>
  ) : (
    <div
      style={{
        position: "fixed",
        bottom: "7px",
        right: "5px",
        cursor: "pointer",
      }}
      onClick={() => setIsOpen(true)}
    >
      {!isOpen && (
        <img
          src="images/chat.png"
          style={{ height: "42.5px", backgroundColor: "transparent" }}
        />
      )}
    </div>
  );
}

const NavClose = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    height: 20px;
    cursor: pointer;
  }
`;

const Chatt = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #4c4c6a;
    border-radius: 2px;
  }
  .chatbox {
    width: 300px;
    height: 450px;
    max-height: 400px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: 5px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.14), 0 4px 8px rgba(0, 0, 0, 0.28);
  }
  .chat-window {
    flex: auto;
    max-height: calc(100% - 60px);
    background: #2f323b;
    overflow: auto;
  }
  .chat-input {
    flex: 0 0 auto;
    height: 60px;
    background: #40434e;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.14), 0 4px 8px rgba(0, 0, 0, 0.28);
  }
  .chat-input input {
    height: 59px;
    line-height: 60px;
    outline: 0 none;
    border: none;
    width: calc(100% - 60px);
    color: white;
    text-indent: 10px;
    font-size: 12pt;
    padding: 0;
    background: #40434e;
  }
  .chat-input button {
    float: right;
    outline: 0 none;
    border: none;
    background: rgba(255, 255, 255, 0.25);
    height: 40px;
    width: 40px;
    border-radius: 50%;
    padding: 2px 0 0 0;
    margin: 10px;
    transition: all 0.15s ease-in-out;
  }
  .chat-input input + button {
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24);
    background: #2671ff;
  }
  .chat-input input + button:hover {
    box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2),
      0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  .chat-input input + button path {
    fill: white;
  }
  .msg-container {
    position: relative;
    display: inline-block;
    width: 100%;
    padding: 0;
  }
  .msg-box {
    display: flex;
    background: #5b5e6c;
    padding: 10px 10px 0 10px;
    border-radius: 0 6px 6px 0;
    max-width: 80%;
    width: auto;
    float: left;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24);
  }
  .user-img {
    display: inline-block;
    border-radius: 50%;
    height: 40px;
    width: 40px;
    background: #2671ff;
    margin: 0 10px 10px 0;
  }
  .flr {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    width: calc(100% - 50px);
  }
  .messages {
    flex: 1 0 auto;
  }
  .msg {
    display: inline-block;
    font-size: 11pt;
    line-height: 13pt;
    color: rgba(255, 255, 255, 0.7);
    margin: 0 0 4px 0;
  }
  .msg:first-of-type {
    margin-top: 8px;
  }
  .timestamp {
    color: rgba(0, 0, 0, 0.38);
    font-size: 8pt;
    margin-bottom: 10px;
  }
  .username {
    margin-right: 3px;
  }
  .posttime {
    margin-left: 3px;
  }
  .msg-self .msg-box {
    border-radius: 6px 0 0 6px;
    background: #2671ff;
    float: right;
  }
  .msg-self .user-img {
    margin: 0 0 10px 10px;
  }
  .msg-self .msg {
    text-align: right;
  }
  .msg-self .timestamp {
    text-align: right;
  }
`;

export default ChatWindow;
