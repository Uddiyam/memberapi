import React, { useState } from "react";
import styles from "./styles/SignUp.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const [id, setId] = useState("");
  const [result, setResult] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordTF, setPasswordTF] = useState(false);
  const [idCheck, setIdCheck] = useState(false);
  const [btnTF, setBtnTF] = useState(false);
  let navigate = useNavigate();

  const idConfirm = async () => {
    await axios.post("/api/member/signup", { id: id }).then((res) => {
      console.log(res);
      setResult(res.data.data[0]);
      {
        res.data.data[0] ? setIdCheck(false) : setIdCheck(true);
      }
    });
    setBtnTF(true);
  };

  const sendData = async () => {
    await axios
      .post("/api/member/insert", { param: { id: id, password: password } })
      .then((res) => {
        console.log(res);
        navigate("/");
      });
  };

  return (
    <div className={styles.Container}>
      <Form className={styles.SignWrap}>
        <Form.Group className={styles.KwIdWrap} controlId="formBasicEmail">
          <Form.Label className={styles.KwId}>ID</Form.Label>
          <Form.Control
            className={styles.Input}
            type="text"
            placeholder="ID를 입력해주세요"
            autoComplete="off"
            onChange={(e) => setId(e.target.value)}
          />

          <Button className={styles.Btn} variant="primary" onClick={idConfirm}>
            중복확인
          </Button>

          <div
            className={styles.InfoText}
            style={{ color: idCheck ? "green" : "red" }}
          >
            {btnTF &&
              id.length > 0 &&
              (idCheck ? "사용가능한 id 입니다" : "이미 존재하는 id 입니다")}
            {btnTF && id.length === 0 && "1글자 이상 입력해주세요"}
          </div>
        </Form.Group>

        <Form.Group className={styles.PasswordWrap} controlId="formBasicEmail">
          <Form.Label className={styles.Password}>Password</Form.Label>
          <Form.Control
            className={styles.InputPassword}
            type="password"
            autoComplete="off"
            value={password}
            placeholder="Password를 입력해주세요"
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() =>
              password.length > 0 && password !== passwordConfirm
                ? setPasswordTF(false)
                : setPasswordTF(true)
            }
          />
        </Form.Group>

        <Form.Group className={styles.PasswordWrap} controlId="formBasicEmail">
          <Form.Label className={styles.Password}>Password 확인</Form.Label>
          <Form.Control
            className={styles.InputPassword}
            type="password"
            autoComplete="off"
            value={passwordConfirm}
            placeholder="Password를 다시 입력해주세요"
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
            }}
            onBlur={() =>
              passwordConfirm.length > 0 && password !== passwordConfirm
                ? setPasswordTF(false)
                : setPasswordTF(true)
            }
          />

          <p
            className={styles.PasswordTF}
            style={{ color: passwordTF ? "green" : "red" }}
          >
            {passwordConfirm.length > 0 &&
              password.length > 0 &&
              (passwordTF
                ? "비밀번호가 일치합니다"
                : "비밀번호가 일치하지 않습니다")}
          </p>
        </Form.Group>
        {console.log(!(passwordTF && idCheck))}
        <Button
          className={styles.ResBtn}
          variant="primary"
          disabled={!(passwordTF && idCheck && id.length > 0)}
          onClick={sendData}
        >
          가입
        </Button>
      </Form>
    </div>
  );
}
