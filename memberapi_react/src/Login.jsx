import React, { useState } from "react";
import styles from "./styles/Login.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import Modal from "react-bootstrap/Modal";

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [userToken, setUserToken] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [idError, setIdError] = useState(false);

  let navigate = useNavigate();

  const sendData = async () => {
    await axios
      .post("/api/member/login", { param: { id: id, password: password } })
      .then((res) => {
        console.log(res);
        res.data.code == 200 && navigate("/Home", { state: { id: id } });
        console.log(res.data.data);

        res.data.message === "password error" && setPasswordError(true);
        res.data.message === "존재하지 않는 id" && setIdError(true);

        sessionStorage.setItem("userToken", res.data.data);
        setUserToken(res.data.data);
      });
  };

  useEffect(() => {
    console.log(sessionStorage.getItem("userToken"));
    sessionStorage.getItem("userToken") &&
      axios
        .post("api/member/checkToken", {
          token: sessionStorage.getItem("userToken"),
        })
        .then((res) => {
          console.log(res);
          res.data.code == 200 &&
            navigate("/Home", { state: { id: res.data.data } });
        });
  }, []);
  const handleClosePassword = () => setPasswordError(false);
  const handleCloseId = () => setIdError(false);

  return (
    <div className={styles.Container}>
      <Form className={styles.LoginForm}>
        <div className={styles.FormWrap}>
          <Form.Group className={styles.IdWrap} controlId="formBasicEmail">
            <Form.Label className={styles.Id}>ID</Form.Label>
            <Form.Control
              className={styles.Input}
              type="text"
              placeholder="ID를 입력하세요"
              autoComplete="off"
              onChange={(e) => {
                setId(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group
            className={styles.PasswordWrap}
            controlId="formBasicPassword"
          >
            <Form.Label className={styles.Password}>Password</Form.Label>
            <Form.Control
              className={styles.Input}
              type="password"
              placeholder="Password를 입력하세요"
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div className={styles.SignUp}>
            <Button className={styles.Btn} variant="info">
              <Link to="/SignUp" className={styles.LinkSignUp}>
                회원가입
              </Link>
            </Button>
          </div>
          <Button className={styles.Btn} variant="primary" onClick={sendData}>
            로그인
          </Button>
        </div>
      </Form>
      <Modal show={passwordError} onHide={handleClosePassword}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "red" }}>Password Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          비밀번호를 잘못 입력하셨습니다. 다시 입력해주세요.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClosePassword}>
            확인
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={idError} onHide={handleCloseId}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "red" }}>Id Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>존재하지 않는 id입니다. 다시 입력해주세요.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseId}>
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
