import React from "react";
import styled from "styled-components";

function Loader() {
  return (
    <center>
      <AnimatedLoader></AnimatedLoader>
    </center>
  );
}

const AnimatedLoader = styled.div`
  border: 16px solid #f3f3f3;
  border-top: 16px solid #0063e5;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  margin-top: 25%;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
