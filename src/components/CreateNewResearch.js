import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import db from "../firebase";
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from "react-redux";
import { selectUserUid } from "../features/user/userSlice";

function CreateNewResearch() {
  const [isLoading, setIsLoading] = useState(false);
  const [researchName, setResearchName] = useState("");
  const history = useHistory();
  const uid = useSelector(selectUserUid);

  async function handleFormSubmit(e) {
    e.preventDefault();
    const id = uuidv4();
    try {
      setIsLoading(true);
      await db
        .collection("drafts")
        .doc(id).set({
          createdAt: Date.now(),
          name: researchName.trim(),
          id,
          uid,
        });
      setIsLoading(false);
      history.push(`/text-editor/${id}`);
    } catch (err) {
      setIsLoading(false);
      alert(err.message);
    }
  }

  return (
    <Wrapper>
      <div className="wrapper">
        <form className="form" onSubmit={handleFormSubmit}>
          <div className="headline">
            <h1>Create New Research</h1>
          </div>
          <div className="signin">
            <div className="formGroup">
              <input
                type="text"
                placeholder="Research Name"
                required
                onChange={(e) => setResearchName(e.target.value)}
              />
            </div>
            <button type="submit" className="btn">
              {isLoading ? "Loading..." : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 100px;

  .wrapper {
    padding: 50px 25px 0;
    max-width: 668px;
    width: 100%;
    margin: auto;
  }
  .wrapper::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    min-height: 100vh;
    z-index: -1;
  }
  .wrapper .headline {
    text-align: center;
    padding-bottom: 48px;
  }
  .wrapper .headline h1 {
    font-size: 42px;
    font-weight: 700;
    line-height: 52px;
  }
  .wrapper .form {
    max-width: 350px;
    width: 100%;
    margin: auto;
  }
  .wrapper .formGroup {
    margin-bottom: 15px;
  }
  .wrapper .formGroup input {
    display: block;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.1px;
    padding: 11px 15px;
    height: 48px;
    border-radius: 5px;
    color: #40434e;
    border: 1px solid #e4e8ee;
    box-shadow: none;
    width: 100%;
  }
  .wrapper .formGroup input:focus {
    outline: none;
  }
  .wrapper .formGroup input::placeholder {
    color: #000;
    font-weight: 400;
    font-size: 14px;
  }
  .wrapper .btn {
    width: 100%;
    margin: 15px 0 30px;
    font-size: 14px;
    line-height: 22px;
    font-weight: 700;
    padding: 12px 29px;
    height: 48px;
    text-transform: uppercase;
    color: #ffffff;
    background-color: #0063e5;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    text-align: center;
  }

  .wrapper .btn:focus {
    outline: none;
  }

  @media (max-width: 1030px) {
    .wrapper::before {
      left: -25%;
      min-height: 60vh;
      height: 500px;
    }
  }
  @media (max-width: 767px) {
    .wrapper {
      max-width: 550px;
    }
    .wrapper .headline h1 {
      font-size: 22px;
      line-height: 25px;
    }
  }
`;

export default CreateNewResearch;
