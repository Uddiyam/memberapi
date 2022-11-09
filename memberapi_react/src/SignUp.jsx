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
  let navigate = useNavigate();

  const idConfirm = async () => {
    await axios.post("/api/member/signup", { id: id }).then((res) => {
      console.log(res);
      setResult(res.data.data[0]);
      {
        res.data.data[0] ? alert("중복") : setIdCheck(true);
      }
    });
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

          {passwordConfirm.length > 0 &&
            password.length > 0 &&
            (passwordTF ? (
              <p>비밀번호 일치</p>
            ) : (
              <p>비밀번호가 일치하지 않습니다.</p>
            ))}
        </Form.Group>
        {console.log(!(passwordTF && idCheck))}
        <Button
          className={styles.ResBtn}
          variant="primary"
          disabled={!(passwordTF && idCheck)}
          onClick={sendData}
        >
          가입
        </Button>
      </Form>
    </div>
  );
}
