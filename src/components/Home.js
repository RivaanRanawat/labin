import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import Originals from "./CompExperiments";
import Viewers from "./Viewers";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import db from "../firebase";
import { setExperiments } from "../features/movie/movieSlice";
import { selectUserName } from "../features/user/userSlice";
import PhyExperiments from "./PhysExperiments";
import ChemExperiments from "./ChemExperiments";
import MathExperiments from "./MathExperiments";
import Loader from "./Loader";

const Home = (props) => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  let phys = [];
  let chem = [];
  let comp = [];
  let math = [];
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    db.collection("movies")
      .orderBy("title", "asc")
      .onSnapshot((snapshot) => {
        setIsLoading(false);
        snapshot.docs.map((doc) => {
          switch (doc.data().type) {
            case "phys":
              phys = [...phys, { id: doc.id, ...doc.data() }];
              break;

            case "comp":
              comp = [...comp, { id: doc.id, ...doc.data() }];
              break;

            case "chem":
              chem = [...chem, { id: doc.id, ...doc.data() }];
              break;

            case "math":
              math = [...math, { id: doc.id, ...doc.data() }];
              break;
          }
        });

        setIsLoading(true);
        dispatch(
          setExperiments({
            phys: phys,
            chem: chem,
            comp: comp,
            math: math,
          })
        );
      });
  }, [userName]);

  if (isLoading) {
    return (
      <Container>
        <ImgSlider />
        <Viewers />
        <PhyExperiments />
        <ChemExperiments />
        <MathExperiments />
        {/* <Originals /> */}
      </Container>
    );
  }
  return (
    <center>
      <Loader></Loader>
    </center>
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
