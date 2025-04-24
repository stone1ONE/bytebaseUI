import React, { useState } from "react";
import {
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const FormComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const githubLogin = () => {
    const clientId = "YOUR_CLIENT_ID";
    const redirectUri = "http://localhost:3000/login/callback";
    const scope = "user:email";
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    window.location.href = githubAuthUrl;
  };

  const handleRegister = async () => {
    // 输入合法性检查
    if (!email || !password) {
      setError("所有字段均为必填项");
      setOpenSnackbar(true);
      return;
    }
    if (!isTermsAccepted) {
      setError("请接受服务条款和隐私政策");
      setOpenSnackbar(true);
      return;
    }

    try {
      if (true) {
        setSuccess(true);
        setError("");
        setOpenSnackbar(true);
        // 将登录信息存入 sessionStorage
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("password", password);
        // 清空表单
        setEmail("");
        setPassword("");
        setIsTermsAccepted(false);
        // 跳转到登录页
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      setError("网络错误，请检查网络连接");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div className="form-container">
      <TextField
        label="邮箱 *"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
      />
      <TextField
        label="密码 *"
        variant="outlined"
        fullWidth
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={isTermsAccepted}
            onChange={(e) => setIsTermsAccepted(e.target.checked)}
          />
        }
        label="我接受Bytebase的服务条款和隐私政策"
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        className="submit-button"
        sx={{
          height: "50px",
          whiteSpace: "3px",
        }}
        onClick={handleRegister}
      >
        登录
      </Button>
      <Button variant="outlined" fullWidth onClick={githubLogin}>
        使用GitHub登录
      </Button>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={success ? "success" : "error"}
        >
          {success ? "注册成功，请登录！" : error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default FormComponent;
