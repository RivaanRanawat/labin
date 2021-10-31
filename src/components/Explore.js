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
      <iframe
        src={data.expUrl}
        width="1440"
        height="710"
        allowfullscreen
      ></iframe>
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

export default Explore;
