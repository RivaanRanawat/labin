import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import db from "../firebase";
import styled from "styled-components";
import { Link } from "react-router-dom";

function SearchExperiments() {
  const { slug } = useParams();
  const [searches, setSearches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    db.collection("movies")
      .where("title", ">=", slug)
      .orderBy("title", "asc")
      .onSnapshot((snapshot) => {
        setIsLoading(false);
        snapshot.docs.map((doc) => {
          setSearches((prev) => [...prev, doc.data()]);
        });
      });
  }, []);
  return (
    <Container>
      <h1>Experiments</h1>
      <Content>
        {searches &&
          searches.map((search, key) => (
            <Wrap key={key}>
              {search.title}
              <Link to={`/detail/` + search.id}>
                <img src={search.cardImg} alt={search.title} />
              </Link>
            </Wrap>
          ))}
      </Content>
    </Container>
  );
}

const Container = styled.div`
  padding: 0 0 26px;

  h1 {
    display: flex;
    margin-top: 100px;
    justify-content: center;
  }
`;

const Content = styled.div`
  display: grid;
  grid-gap: 25px;
  gap: 25px;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Wrap = styled.div`
  padding-top: 56.25%;
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

export default SearchExperiments;
