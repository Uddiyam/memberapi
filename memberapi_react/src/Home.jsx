import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./styles/Home.module.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const location = useLocation();
  const user_id = location.state.id;
  console.log(user_id);

  const [TF, setTF] = useState(true);
  const TimeReset = () => {
    localStorage.setItem("time", 120);
    localStorage.setItem("min", 2);
    localStorage.setItem("sec", 0);
  };
  useEffect(() => {
    TimeReset();
    setTF(false);
  }, []);

  const [min, setMin] = useState(
    localStorage.getItem("min") ? localStorage.getItem("min") : 2
  );
  const [sec, setSec] = useState(
    localStorage.getItem("sec") ? localStorage.getItem("sec") : 0
  );
  const time = useRef(
    localStorage.getItem("time") ? localStorage.getItem("time") : 120
  );
  const timerId = useRef(null);

  useEffect(() => {
    timerId.current = setInterval(() => {
      setMin(parseInt(time.current / 60));
      setSec(time.current % 60);
      time.current -= 1;
    }, 1000);
    localStorage.setItem("time", time.current);
    localStorage.setItem("min", min);
    localStorage.setItem("sec", sec);
    return () => clearInterval(timerId.current);
  }, [sec]);

  let navigate = useNavigate();
  useEffect(() => {
    console.log(sessionStorage.getItem("userToken"));
    axios
      .post("api/member/checkToken", {
        token: sessionStorage.getItem("userToken"),
      })
      .then((res) => {
        console.log(res);
        res.data.code == 400 && TimeReset();
        res.data.code == 400 && navigate("/");
      });
  }, [sec]);

  const LogOut = () => {
    sessionStorage.removeItem("userToken");
    TimeReset();
    navigate("/");
  };
  return (
    <div className={styles.Container}>
      <div className={styles.Timer}>
        00:{min < 10 ? `0${min}` : min}:{sec < 10 ? `0${sec}` : sec}
      </div>
      <div className={styles.Text}>
        <b>{user_id}</b> 님 안녕하세요
      </div>
      <Button className={styles.Btn} variant="primary" onClick={LogOut}>
        로그아웃
      </Button>
    </div>
  );
}
