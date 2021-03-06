import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import { selectChem, selectMath, selectPhy } from "../features/movie/movieSlice";

const Viewers = (props) => {
  const phyExperiments = useSelector(selectPhy);
  const chemExperiments = useSelector(selectChem);
  const mathExperiments = useSelector(selectMath);
  const history = useHistory();

  function handlePhyExperiment() {
    history.push({
      pathname: "/experiments/phys",
      state: { experiments: phyExperiments },
    });
  }

  function handleChemExperiment() {
    history.push({
      pathname: "/experiments/chem",
      state: { experiments: chemExperiments },
    });
  }

  function handleMathExperiment() {
    history.push({
      pathname: "/experiments/math",
      state: { experiments: mathExperiments },
    });
  }

  return (
    <Container>
      <Wrap onClick={handlePhyExperiment}>
        <img src="/images/viewer-phys.png" alt="Physics lab" />
        <video autoPlay={true} loop={true} playsInline={true} muted>
          <source src="/videos/vid-phys.mp4" type="video/mp4" />
        </video>
      </Wrap>
      <Wrap onClick={handleChemExperiment}>
        <img src="/images/viewer-chem.png" alt="Chemistry Lab" />
        <video autoPlay={true} loop={true} playsInline={true} muted>
          <source src="/videos/vid-chem.mp4" type="video/mp4" />
        </video>
      </Wrap>
      <Wrap onClick={handleMathExperiment}>
        <img src="/images/viewer-math.png" alt="Math Lab" />
        <video autoPlay={true} loop={true} playsInline={true} muted>
          <source src="/videos/vid-math.mp4" type="video/mp4" />
        </video>
      </Wrap>
      {/* <Wrap>
        <img src="/images/viewer-comp.png" alt="Computer Lab" />
        <video autoPlay={true} loop={true} playsInline={true} muted>
          <source src="/videos/vid-comp.mp4" type="video/mp4" />
        </video>
      </Wrap> */}
    </Container>
  );
};

const Container = styled.div`
  margin-top: 30px;
  padding: 30px 0px 26px;
  display: grid;
  grid-gap: 25px;
  gap: 25px;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
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

  video {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    opacity: 0;
    z-index: 0;
  }

  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;

    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);

    video {
      opacity: 1;
    }
  }
`;

export default Viewers;
