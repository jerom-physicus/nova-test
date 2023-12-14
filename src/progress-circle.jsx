import React, { useEffect } from "react";
import "./progress-circle.css";
import { useRef } from "react";
import ProgressProvider from "./ProgressProvider";
import { useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

//import { db } from "../../utils/firebase";
import { onValue, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDG4G_mJvAdNgKMnyOHKO2LRuQIWSdGxzI",
  authDomain: "nova-ad592.firebaseapp.com",
  databaseURL: "https://nova-ad592-default-rtdb.firebaseio.com",
  projectId: "nova-ad592",
  storageBucket: "nova-ad592.appspot.com",
  messagingSenderId: "272439248044",
  appId: "1:272439248044:web:55249f131977117d670b09",
  measurementId: "G-20WSQTY0XD",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

function ProgressCircle() {

  const [temperature, setValueEnd] = React.useState(null);

  // Assuming this is inside a React component
  React.useEffect(() => {
    onValue(ref(db, "temperature"), (snapshot) => {
      const temperature = snapshot.val();
      setValueEnd(temperature); // Set the state here
      return temperature;
    });
  }, [db]);
  const [humidity, sethumidity] = React.useState(null);

  React.useEffect(() => {
    onValue(ref(db, "humidity"), (snapshot) => {
      const humidity = snapshot.val();
      sethumidity(humidity); // Set the state here
      return humidity;
    });
  }, [db]);

  return (
    <div className="main">
      <div className="temperature-circle">
        <ProgressProvider
          className="circle"
          valueStart={0}
          valueEnd={temperature}
        >
          {(value) => (
            <CircularProgressbar
              value={value}
              minValue={16}
              maxValue={40}
              styles={buildStyles({
                rotation: 0.5,
                textSize: "16px",
                pathTransitionDuration: 1,
                pathColor: `rgba(255, 163, 79)`,
                trailColor: "#F7F7F7",
              })}
            />
          )}
        </ProgressProvider>
      </div>
      <div className="humidity-circle">
        <ProgressProvider valueStart={0} valueEnd={humidity}>
          {(value) => (
            <CircularProgressbar
              value={value}
              minValue={0}
              maxValue={100}
              strokeWidth={10}
              styles={buildStyles({
                rotation: 0.5,
                textSize: "16px",
                pathTransitionDuration: 1,
                pathColor: `rgba(105, 138, 255)`,
                trailColor: "#F7F7F7",
              })}
            />
          )}
        </ProgressProvider>
      </div>
      
      <div className="datas">
      <h2 className="temp-h">Temperature</h2>
      <h1 className="temp-data"><span>{temperature}</span>°C</h1>
      <h2 className="temp-h">Humidity</h2>
      <h3><span>{humidity}</span>%</h3>


      </div>
    </div>
  );
}
export default ProgressCircle;
