import React, { useState } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import Modal from "./Modal";

function Explore() {
  let location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const data = location.state.detailData;

  return (
    <div style={{ marginTop: "100px" }}>
      <InfoIcon onClick={() => setIsModalOpen(!isModalOpen)}>
        <img src="/images/info-icon.png" />
      </InfoIcon>
      <Frame
        src={data.expUrl}
        allowfullscreen
      ></Frame>
      {!isModalOpen ? (
        <div></div>
      ) : (
        <center>
          <Modal title={data.title} description={data.desc}/>
        </center>
      )}
    </div>
  );
}

const InfoIcon = styled.div`
  position: absolute;
  margin-top: 5px;
  margin-right: 5px;
  right: 0;
  img {
    width: 40px;
  }
`;

const Frame = styled.iframe`
  height: 710px;
  width: 100%;

  @media (max-width: 768px) {
    height: 630px;
  }
`;

export default Explore;
