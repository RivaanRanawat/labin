import React, { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useHistory, useParams } from "react-router";
import Loader from "./Loader";
import styled from "styled-components";
import db from "../firebase";
import { useSelector } from "react-redux";
import { selectUserName } from "../features/user/userSlice";

function TextEditor() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { id } = useParams();
  const [quill, setQuill] = useState();
  const [title, setTitle] = useState('');
  const [paraContent, setParaContent] = useState();
  const history = useHistory();
  const username = useSelector(selectUserName);

  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],
  ];

  // using callback not use effect because of the error of innerhtml by ref created using useRef
  const ref = useCallback((wrapper) => {
    setIsLoading(true);
    if (wrapper == null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: toolbarOptions },
    });
    setQuill(q);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (quill == null) return;
    quill.setContents(paraContent);
    quill.enable();
  }, [quill]);

  
  useEffect(() => {
    fetchDiary();
    async function fetchDiary() {
      try {
        setIsLoading(true);
        const querySnapshot = await db.collection("drafts").doc(id).get();
        setParaContent(querySnapshot.data().content);
        setTitle(querySnapshot.data().name);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        alert("You have no such draft!");
        history.push("/");
      }
    }
  }, []);

  async function handleSave() {
    try {
      setIsSaving(true);
      await db.collection("drafts").doc(id).update({
        content: quill.getContents().ops,
      });
      setIsSaving(false);
      history.push("/");
    } catch (err) {
      setIsSaving(false);
      alert(err.message);
    }
  }

  async function handlePublish() {
    try {
      setIsSaving(true);
      await db.collection('drafts').doc(id).delete();
      await db.collection("published").doc(id).set({
        createdAt: Date.now(),
        name: title,
        id,
        content: quill.getContents().ops,
        publisher: username
      });
      setIsSaving(false);
      history.push("/");
    } catch (err) {
      setIsSaving(false);
      alert(err.message);
    }
  }

  async function handleDelete() {
    try {
      setIsLoading(true);
      await db.collection('drafts').doc(id).delete();
      setIsLoading(false);
      history.push("/my-drafts");
    } catch (err) {
      setIsSaving(false);
      alert(err.message);
    }
  }

  return !isLoading ? (
    <Wrapper>
      <ButtonsWrapper>
        <Delete onClick={handleDelete}>
          <span>Delete</span>
        </Delete>
        <Save onClick={handleSave}>
          <span>Save</span>
        </Save>
        <Save onClick={handlePublish}>
          <span>Publish</span>
        </Save>
      </ButtonsWrapper>
      <center>
        <h1>{title}</h1>
      </center>
      <div className="container-a" ref={ref}></div>
    </Wrapper>
  ) : (
    <Loader />
  );
}

const ButtonsWrapper = styled.div`
  margin-top: 70px;
  display: flex;
  justify-content: end;
`;

const Save = styled.button`
  font-size: 15px;
  margin: 0px 22px 0px 0px;
  padding: 0px 24px;
  height: 56px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1.8px;
  text-align: center;
  text-transform: uppercase;
  background: rgb (249, 249, 249);
  border: none;
  color: rgb(0, 0, 0);

  &:hover {
    background: rgb(198, 198, 198);
  }

  @media (max-width: 768px) {
    height: 45px;
    padding: 0px 12px;
    font-size: 12px;
    margin: 0px 10px 0px 0px;
  }
`;

const Delete = styled.button`
  font-size: 15px;
  margin: 0px 22px 0px 0px;
  padding: 0px 24px;
  height: 56px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1.8px;
  text-align: center;
  text-transform: uppercase;
  background: red;
  border: none;
  color: #fff;

  &:hover {
    background: rgb(230, 0, 0);
  }

  @media (max-width: 768px) {
    height: 45px;
    padding: 0px 12px;
    font-size: 12px;
    margin: 0px 10px 0px 0px;
  }
`;

const Wrapper = styled.div`
  margin-top: 7 0px;

  h1 {
    font-size: 3rem;
    margin-bottom: 0px;
  }

  .container-a .ql-editor {
    width: 8.5in;
    min-height: 11in;
    margin: 1rem;
    box-shadow: 0 0 5px 0 rgba(255, 255, 255, 1);
  }

  .container-a .ql-container.ql-snow {
    border: none;
    display: flex;
    justify-content: center;
  }

  .container-a .ql-toolbar.ql-snow {
    display: flex;
    justify-content: center;
    position: sticky;
    top: 0;
    z-index: 1;
    border: none;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
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

    .container-a .ql-toolbar.ql-snow {
      display: none;
    }
  }
`;

export default TextEditor;
