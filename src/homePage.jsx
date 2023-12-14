import React, { useState } from "react";
import ProgressCircle, { db } from "./progress-circle";
import { useEffect } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./home-page.css";
import Toggler from "./Components/Toggler";
import { get, ref, set } from "firebase/database";
import Tectarea from "./Components/Tectarea";
import FooterMic from "./Components/FooterMic";
import runSpeechRecog from "./speech";
import speechFunction from "./speech";

function HomePage() {
  const [recognition] = useState(new window.webkitSpeechRecognition());
  const [answer, setAnswer] = useState("");
  const [listening, setListening] = useState(false);
  const [userQuestion, setUserquestion] = useState("");
  const [vaccumOn, setVaccumOn] = useState(false);
  const [uvON, setUVOn] = useState(false);
  const [vaccumValue, setVaccumValue] = useState("");
  const [uvValue, setUVValue] = useState("");
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");
  useEffect(() => {
    if (username !== "novajerom" || password !== "nova8809") {
      navigate("/");
      console.log("no");
    }
  }, [username, password, navigate]);

  useEffect(() => {
    const vaccumref = ref(db, "vaccume");
    get(vaccumref).then((snapshot) => {
      if (snapshot.exists()) {
        const vaccumValue = snapshot.val();
        console.log(vaccumValue);
        setVaccumValue(vaccumValue);
        if (vaccumValue === 1) {
          setVaccumOn(false);
        } else {
          setVaccumOn(true);
        }
      }
    });
    const uvRef = ref(db, "uv");
    get(uvRef).then((snapshot) => {
      if (snapshot.exists()) {
        setUVValue(snapshot.val());
        console.log(`UV is ${uvValue}`);
      }
    });
  });

  const controlVaccum = () => {
    const vaccumref = ref(db, "vaccume");
    setVaccumOn(!vaccumOn);
    if (vaccumOn === false) {
      set(vaccumref, 0);
      alert("Vaccum Mode OFF");
    } else {
      set(vaccumref, 1);
      alert("Vaccum Mode ON");
    }

    console.log(vaccumOn);
  };
  const controlUV = () => {
    const uvref = ref(db, "uv");
    setUVOn(!uvON);
    if (uvON === false) {
      set(uvref, 0);
      alert("UV Mode OFF");
    } else {
      set(uvref, 1);
      alert("UV Mode ON");
    }

    console.log(vaccumOn);
  };

  const speakResponse = (text) => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = text;

    window.speechSynthesis.speak(speech);
  };

  const runSpeechRecog = () => {
    setListening(true);

    recognition.onstart = () => {
      setUserquestion("Listening...");
      setAnswer("");
    };
    recognition.onresult = async (e) => {
      var transcript = e.results[0][0].transcript;
      setUserquestion(transcript);
      const question = transcript.toLowerCase();

      if (question == "hello") {
        let text = "i'm fine sir how about you";
        setAnswer(text);
        speakResponse(text);
      } else if (question.includes("sad")) {
        setAnswer("Why are you sad?");
        speakResponse("Why are you sad?");
      } else if (question.includes("about yourself")) {
        setAnswer(
          "Hello, I'm Nova a helping Assistant robot. I can help you with many things like Answering your queries,clean the floor and sanitize it and many more...Any help needed?"
        );
        speakResponse(
          "Hello, I'm Nova a helping Assistant robot. I can help you with many things like Answering your queries,clean the floor and sanitize it and many more...Any help needed?"
        );
      } else if (question.includes("time")) {
        const currentTime = new Date().toLocaleTimeString();
        setAnswer(`The current time is: ${currentTime}`);
        speakResponse(`The current time is: ${currentTime}`);
      } else if (question.includes("date")) {
        const currentDate = new Date().toLocaleDateString();
        setAnswer(`Today's date is: ${currentDate}`);
        speakResponse(`Today's date is: ${currentDate}`);
      } else if (question.includes("multitech")) {
        setAnswer(
          "Vel Tech Multi Tech Dr. Rangarajan Dr. Sakunthala Engineering College, An Autonomous Institution,  has been accredited by NAAC in the year 2016 with ‘A’ Grade and with an impressive score of 3.49 / 4.0."
        );
        speakResponse(
          "Vel Tech Multi Tech Dr. Rangarajan Dr. Sakunthala Engineering College, An Autonomous Institution,  has been accredited by NAAC in the year 2016 with ‘A’ Grade and with an impressive score of 3.49 / 4.0."
        );
      } else if (question.includes("ece")) {
        setAnswer(
          "The ECE department at VelTech MultiTech Engineering College stands as a beacon of academic prowess, fostering a culture of research, technology, and skill development, instilling pride in every student fortunate to be part of this vibrant learning community."
        );
        speakResponse(
          "The ECE department at VelTech MultiTech Engineering College stands as a beacon of academic prowess, fostering a culture of research, technology, and skill development, instilling pride in every student fortunate to be part of this vibrant learning community."
        );
      } else if (question.includes("who are you")) {
        setAnswer(
          "I'm NOVA, an assistant robot who can answer your queries and even can do your household works like cleaning, sanitizing , etc"
        );
        speakResponse(
          "I'm NOVA, an assistant robot who can answer your queries and even can do your household works like cleaning, sanitizing , etc"
        );
      } else if (question.includes("close")) {
        setAnswer(
          "Ok thank You!, if  you feel like you need any help, you can press the microphone button below. "
        );
        speakResponse(
          "Ok thank You!, if  you feel like you need any help, you can press the microphone button below. "
        );
      }
    };
    recognition.start();
    setAnswer(answer);
  };
  const print = () => {
    console.log("workionmg");
  };

  const closeText = () => {
    setListening(false);
  };

  return (
    <div className="home-container">
      <FooterMic listen={runSpeechRecog} />

      <h1 className="welcome">
        Good Morning, <span>{username}!</span>
      </h1>
      <ProgressCircle />
      <div className="button-container">
        <div className="toggle-container">
          <div className="toggle-info">
            <img
              src="https://cdn-icons-png.flaticon.com/128/3412/3412679.png"
              alt=""
            />
            <h1>Vaccum Cleaner</h1>
          </div>
          <div className="toggle-button">
            <h1 onClick={controlVaccum}>
              {vaccumOn === false ? "OFF" : "ON"}{" "}
            </h1>
          </div>
        </div>
        <div className="toggle-container" style={{ background: "#9694FF" }}>
          <div className="toggle-info">
            <img
              src="https://cdn-icons-png.flaticon.com/128/3030/3030555.png"
              alt=""
            />
            <h1 style={{ fontSize: "19px", textAlign: "start" }}>UV Cleaner</h1>
          </div>
          <div className="toggle-button">
            <h1 onClick={controlUV} className={uvON === false ? "" : "on"}>
              {uvON === false ? "ON" : "OFF"}{" "}
            </h1>
          </div>
        </div>
      </div>
      <div className="air-quality-button">
        <h1>Air Quality</h1>
        <div className="air-quality-info">
          <img
            src="https://png.pngtree.com/png-vector/20190429/ourmid/pngtree-vector-air-blow-icon-png-image_995217.jpg"
            alt=""
            style={{ width: "60px", height: "60px", borderRadius: "120%" }}
          />
          <p style={{ color: "white" }}>
            <span
              style={{ fontSize: "60px", fontWeight: "600", color: "white" }}
            >
              390
            </span>
            ppm
          </p>
        </div>
      </div>
      {listening && (
        <Tectarea question={userQuestion} answer={answer} close={closeText} />
      )}
    </div>
  );
}
export default HomePage;
