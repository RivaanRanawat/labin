import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import Originals from "./CompExperiments";
import Trending from "./Trending";
import Viewers from "./Viewers";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import db from "../firebase";
import { setExperiments } from "../features/movie/movieSlice";
import { selectUserName } from "../features/user/userSlice";
import PhyExperiments from "./PhysExperiments";
import ChemExperiments from "./ChemExperiments";

const Home = (props) => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  let phys = [];
  let chem = [];
  let comp = [];
  let trending = [];

  useEffect(() => {
    console.log("hello");
    db.collection("movies").onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        switch (doc.data().type) {
          case "phys":
            phys = [...phys, { id: doc.id, ...doc.data() }];
            break;

          case "comp":
            comp = [...comp, { id: doc.id, ...doc.data() }];
            break;

          case "chem":
            chem = [...comp, { id: doc.id, ...doc.data() }];
            break;

          case "trending":
            trending = [...trending, { id: doc.id, ...doc.data() }];
            break;
        }
      });

      dispatch(
        setExperiments({
          phys: phys,
          chem: chem,
          comp: comp,
          trending: trending,
        })
      );
    });
  }, [userName]);

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <PhyExperiments />
      <ChemExperiments />
      <Originals />
      <Trending />
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background-color: #050714;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;
