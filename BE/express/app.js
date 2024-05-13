const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: '34.47.78.182:3306',
  user: 'root', // MySQL 사용자 이름
  password: '1234567asdf@', // MySQL 비밀번호
  database: 'naite' // 사용할 데이터베이스 이름
});

// MySQL 연결
connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// body-parser 미들웨어 설정
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 회원가입 API 엔드포인트
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  // 데이터베이스에 새로운 사용자 정보 삽입
  const sql = `INSERT INTO users (user_name, user_email, user_password) VALUES (?, ?, ?)`;
  connection.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.error('Error registering user:', err);
      res.status(500).json({ error: 'Error registering user' });
      return;
    }
    console.log('User registered successfully');
    res.status(200).json({ message: 'User registered successfully' });
  });
});

// 서버 시작
const PORT = process.env.PORT || 3306;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
