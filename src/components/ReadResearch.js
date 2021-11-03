import React, { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useHistory, useParams } from "react-router";
import Loader from "./Loader";
import styled from "styled-components";
import db from "../firebase";
import moment from "moment";

function ReadResearch() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { id } = useParams();
  const [quill, setQuill] = useState();
  const [title, setTitle] = useState("");
  const [paraContent, setParaContent] = useState();
  const history = useHistory();
  const [timeago, setTimeAgo] = useState();

  // using callback not use effect because of the error of innerhtml by ref created using useRef
  const ref = useCallback((wrapper) => {
    setIsLoading(true);
    if (wrapper == null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: null },
    });
    setQuill(q);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (quill == null) return;
    quill.setContents(paraContent);
    quill.disable();
  }, [quill]);

  useEffect(() => {
    fetchDiary();
    async function fetchDiary() {
      try {
        setIsLoading(true);
        const querySnapshot = await db.collection("published").doc(id).get();
        setParaContent(querySnapshot.data().content);
        setTitle(querySnapshot.data().name);
        setTimeAgo(querySnapshot.data().createdAt);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        alert("An error occured");
        history.push("/");
      }
    }
  }, []);

  return !isLoading ? (
    <Wrapper>
      <center>
        <h1>{title}</h1>
        <p className="timeago">Published {moment(timeago).fromNow()}</p>
      </center>
      <div className="container-a" ref={ref}></div>
    </Wrapper>
  ) : (
    <Loader />
  );
}

const Wrapper = styled.div`
  margin-top: 70px;

  h1 {
    font-size: 3rem;
    margin-bottom: 0px;
  }

  .timeago {
    margin-top: 0px;
    color: grey;
  }

  .container-a .ql-editor {
    width: 8.5in;
    min-height: 11in;
    margin: 1rem;
  }

  .container-a .ql-container.ql-snow {
    border: none;
    display: flex;
    justify-content: center;
  }

  @page {
    margin: 1in;
  }

  @media print {
    body {
      background: none;
    }

    .container-a .ql-editor {
      width: 6.5in;
      height: 9in;
      padding: 0;
      margin: 0;
      box-shadow: none;
      align-self: flex-start;
    }
  }
`;

export default ReadResearch;
