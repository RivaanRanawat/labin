import styled from "styled-components";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import db from "../firebase";

const MyDrafts = (props) => {
  const [experiments, setExperiments] = useState([]);
  useEffect(() => {
    db.collection("drafts").onSnapshot((snap) => {
      snap.docs.map((doc) => {
        setExperiments((arr) => [...arr, doc.data()]);
      });
    });
  }, []);
  const history = useHistory();

  return (
    <Container>
      <h1 className="header">My Drafts</h1>
      <AddIcon onClick={() => history.push("/create-research")}>
        <a>
          <img src="/images/edit-icon.png" alt="Add Research" />
        </a>
      </AddIcon>
      <Content>
        {experiments &&
          experiments.map((experiment, key) => (
            <Wrap key={key}>
              <Link to={`/text-editor/${experiment.id}`}>
                <h1 className="experimentName">{experiment.name}</h1>
              </Link>
            </Wrap>
          ))}
      </Content>
    </Container>
  );
};

const AddIcon = styled.a`
  padding: 0;
  width: 50px;
  position: fixed;
  right: 0;
  bottom: 0;
  font-size: 0;
  margin-bottom: 10px;
  cursor: pointer;

  img {
    height: 30px;
  }
`;

const Container = styled.div`
  padding: 0 0 26px;
  margin-left: 15px;

  .header {
    display: flex;
    margin-top: 80px;
    justify-content: center;
  }

  .experimentName {
    text-align: center;
    align-item: center;
    font-size: 40px;
  }
`;

const Content = styled.div`
  display: grid;
  grid-gap: 25px;
  gap: 25px;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Wrap = styled.div`
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);
  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
    top: 0;
  }
  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;

export default MyDrafts;
