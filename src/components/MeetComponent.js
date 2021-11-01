import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation, withRouter } from "react-router";
import { selectUserName } from "../features/user/userSlice";

function MeetComponent() {
  const domain = "meet.jit.si";
  let api = {};
  const location = useLocation();
  const user = useSelector(selectUserName);
  const [room, setRoom] = useState(location.pathname);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const history = useHistory();

  const startMeet = () => {
    const options = {
      roomName: room,
      width: "100%",
      height: "740px",
      configOverwrite: { prejoinPageEnabled: false },
      interfaceConfigOverwrite: {
        // overwrite interface properties
      },
      parentNode: document.querySelector("#jitsi-iframe"),
      userInfo: {
        displayName: user,
      },
    };
    api = new window.JitsiMeetExternalAPI(domain, options);

    api.addEventListeners({
      readyToClose: handleClose,
      participantLeft: handleParticipantLeft,
      participantJoined: handleParticipantJoined,
      videoConferenceJoined: handleVideoConferenceJoined,
      videoConferenceLeft: handleVideoConferenceLeft,
      audioMuteStatusChanged: handleMuteStatus,
      videoMuteStatusChanged: handleVideoStatus,
    });
  };

  const handleClose = () => {
    console.log("handleClose");
  };

  const handleParticipantLeft = async (participant) => {
    console.log("handleParticipantLeft", participant);
    const data = await getParticipants();
  };

  const handleParticipantJoined = async (participant) => {
    console.log("handleParticipantJoined", participant);
    const data = await getParticipants();
  };

  const handleVideoConferenceJoined = async (participant) => {
    console.log("handleVideoConferenceJoined", participant);
    const data = await getParticipants();
  };

  const handleVideoConferenceLeft = () => {
    console.log("handleVideoConferenceLeft");
    return history.push("/");
  };

  const handleMuteStatus = (audio) => {
    console.log("handleMuteStatus", audio);
  };

  const handleVideoStatus = (video) => {
    console.log("handleVideoStatus", video);
  };

  function getParticipants() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(api.getParticipantsInfo());
      }, 500);
    });
  }

  useEffect(() => {
    if (window.JitsiMeetExternalAPI) {
      startMeet();
    } else {
      alert("Sorry, an internal occurred. Please try again later.");
    }
  }, []);

  return (
    <>
      <div id="jitsi-iframe" style={{ marginTop: "70px" }}></div>
    </>
  );
}

export default withRouter(MeetComponent);
