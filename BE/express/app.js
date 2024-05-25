require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors"); // cors 미들웨어 추가
const bcrypt = require("bcrypt");

const app = express();
// CORS 설정
app.use(cors());

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER, // MySQL 사용자 이름
  password: process.env.DB_PASSWORD, // MySQL 비밀번호
  database: process.env.DB_NAME, // 사용할 데이터베이스 이름
});

// MySQL 연결
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

// body-parser 미들웨어 설정
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 회원가입 API 엔드포인트
app.post("/register", async (req, res) => {
  console.log("연결");
  const { name, email, password } = req.body;

  try {
    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("비밀번호 해시화 완료");

    // 데이터베이스에 새로운 사용자 정보 삽입
    const sql = `INSERT INTO Users (user_name, user_email, user_password) VALUES (?, ?, ?)`;
    connection.query(sql, [name, email, hashedPassword], (err, result) => {
      if (err) {
        console.error("Error registering user:", err);
        res.status(500).json({ error: "Error registering user" });
        return;
      }
      console.log("User registered successfully");
      res.status(200).json({ message: "User registered successfully" });
    });
  } catch (err) {
    console.error("Error hashing password:", err);
    res.status(500).json({ error: "Error hashing password" });
  }
});

// 이메일 중복 확인 엔드포인트
app.post("/checkDuplicateEmail", (req, res) => {
  const { email } = req.body;

  // 데이터베이스에서 이메일 중복 여부 확인
  const sql = "SELECT COUNT(*) AS count FROM Users WHERE user_email = ?";
  connection.query(sql, [email], (err, result) => {
    if (err) {
      console.error("Error checking email duplication:", err);
      res.status(500).json({ error: "Error checking email duplication" });
      return;
    }
    const count = result[0].count;
    if (count > 0) {
      // 중복된 이메일이 존재할 경우
      res.status(200).json({ isDuplicate: true });
    } else {
      // 중복된 이메일이 존재하지 않을 경우
      res.status(200).json({ isDuplicate: false });
    }
  });
});

// 로그인 API 엔드포인트
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // 데이터베이스에서 사용자 정보 확인
  const sql = `SELECT * FROM Users WHERE user_email = ?`;
  connection.query(sql, [email], async (err, results) => {
    if (err) {
      console.error("Error logging in:", err);
      res.status(500).json({ error: "Error logging in" });
      return;
    }
    if (results.length === 0) {
      console.log("사용자 없음");
      res.status(200).json({ exist: 0 });
      return;
    }

    const user = results[0];
    console.log(`사용자 찾음: ${user.user_email}`); // 사용자 정보 확인 로그 추가
    const passwordMatch = await bcrypt.compare(password, user.user_password);

    if (passwordMatch) {
      console.log("비밀번호 일치");
      res.status(200).json({ exist: 1 });
      console.log("로그인 완료");
    } else {
      console.log("비밀번호 불일치");
      res.status(200).json({ exist: 0 });
    }
  });
});

app.post("/editPassword", async (req, res) => {
  const { email, password } = req.body;
  // 비밀번호 해시화
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("비밀번호 해시화 완료");

  // 데이터베이스에서 사용자 정보 확인
  const sql = `UPDATE Users SET user_password=? WHERE user_email=?;`;
  connection.query(sql, [hashedPassword, email], async (err, results) => {
    if (err) {
      console.error("Error modifyPassword in:", err);
      res.status(500).json({ error: "Error modifyPassword in" });
      return;
    }
  });
});

// 서버 시작
const host = "0.0.0.0"; // 모든 네트워크 인터페이스에 바인딩
const PORT = process.env.PORT || 3000;
app.listen(PORT, host, () => {
  console.log(`Server is running on port ${PORT}`);
});
