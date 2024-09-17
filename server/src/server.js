const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Pastikan middleware ini ada

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "kahoot",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Database connected...");
});

// Mengambil pertanyaan berdasarkan sesi
app.get("/api/questions/:session", (req, res) => {
  const session = req.params.session;
  const query = "SELECT * FROM questions WHERE session = ?";
  db.query(query, [session], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query error" });
    }
    const processedResults = results.map((question) => {
      const options = [
        question.option1,
        question.option2,
        question.option3,
        question.option4,
      ];
      return {
        ...question,
        options,
      };
    });
    res.json(processedResults);
  });
});

// Mengambil sesi saat ini
app.get("/api/current-session", (req, res) => {
  const query = "SELECT session_number FROM sessions"; // Ambil sesi terakhir
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query error" });
    }
    if (results.length > 0) {
      res.json({ session: results[0].session_number });
    } else {
      res.json({ session: null }); // Jika tidak ada sesi, kembalikan null
    }
  });
});

// Mengatur sesi saat ini
app.post("/api/set-session", (req, res) => {
  const { sessionNumber } = req.body;

  if (!sessionNumber) {
    return res.status(400).json({ error: "Session number is required" });
  }

  const query = "UPDATE sessions SET session_number = ?";
  db.query(query, [sessionNumber], (err) => {
    if (err) {
      return res.status(500).json({ error: "Database query error" });
    }
    res.status(200).json({ message: "Session created successfully" });
  });
});

// Add a user
app.post("/api/users", (req, res) => {
  const { nama_tim } = req.body;
  db.query(
    "INSERT INTO nama_tim (nama_tim) VALUES (?)",
    [nama_tim],
    (err, results) => {
      if (err) throw err;
      res.json({ message: "User added!" });
    }
  );
});

// Endpoint untuk mendapatkan daftar pengguna
app.get("/api/users", (req, res) => {
  db.query("SELECT * FROM nama_tim", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Add a question
app.post("/api/questions", (req, res) => {
  const { question, option1, option2, option3, option4, answer } = req.body;
  db.query(
    "INSERT INTO questions (question, option1, option2, option3, option4, answer) VALUES (?, ?, ?, ?, ?, ?)",
    [question, option1, option2, option3, option4, answer],
    (err, results) => {
      if (err) throw err;
      res.json({ message: "Question added!" });
    }
  );
});

// Add a img question
app.post("/api/questions_img", (req, res) => {
  const {
    question_text,
    image_url,
    option1,
    option2,
    option3,
    option4,
    answer,
  } = req.body;

  const query = `INSERT INTO logical_tests (question_text, image_url, option1, option2, option3, option4, answer) 
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    query,
    [question_text, image_url, option1, option2, option3, option4, answer],
    (error) => {
      if (error) {
        return res.status(500).json({ error: "Error adding question" });
      }
      res.json({ message: "Question added successfully" });
    }
  );
});

// Login with auth
app.post("/api/users/login", (req, res) => {
  if (isQuizStarted === false) {
    const { nama_tim } = req.body;

    // Pertama, cek apakah nama_tim ada di tabel users
    db.query(
      "SELECT * FROM nama_tim WHERE nama_tim = ?",
      [nama_tim],
      (err, results) => {
        if (err) {
          return res
            .status(500)
            .json({ success: false, error: "Database error" });
        }

        if (results.length > 0) {
          // Jika nama_tim ditemukan di tabel users, cek apakah sudah ada di user_log
          db.query(
            "SELECT * FROM tim_log WHERE nama_tim = ?",
            [nama_tim],
            (err, logResults) => {
              if (err) {
                return res.status(500).json({
                  success: false,
                  error: "Database error during log checking",
                });
              }

              if (logResults.length > 0) {
                // Jika nama_tim sudah ada di user_log
                return res.json({
                  success: false,
                  message: "Nama Tim Sudah Digunakan",
                });
              } else {
                // Jika nama_tim belum ada di user_log, lakukan insert
                db.query(
                  "INSERT INTO tim_log (nama_tim) VALUES (?)",
                  [nama_tim],
                  (err) => {
                    if (err) {
                      return res.status(500).json({
                        success: false,
                        error: "Database error during logging",
                      });
                    }
                    return res.json({
                      success: true,
                      message: "Login successful and user log updated",
                    });
                  }
                );
              }
            }
          );
        } else {
          return res.json({ success: false, message: "Nama Tim Tidak Ada" });
        }
      }
    );
  } else {
    return res.status(500).json({
      success: false,
      error: "Quiz Sudah Dimulai",
    });
  }
});

/*
// Login no auth
app.post("/api/users/login", (req, res) => {
  if (isQuizStarted === false) {
    const { nama_tim } = req.body;

    db.query(
      "INSERT INTO tim_log (nama_tim) VALUES (?)",
      [nama_tim],
      (err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            error: "Database error during logging",
          });
        }
        return res.json({
          success: true,
          message: "Login successful and user log updated",
        });
      }
    );
  } else {
    return res.status(500).json({
      success: false,
      error: "Quiz Sudah Dimulai",
    });
  }
});
*/

// Endpoint untuk mendapatkan leaderboard
app.get("/api/leaderboard", (req, res) => {
  const sql = `
    SELECT * FROM leaderboard ORDER BY score DESC`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
});

app.post("/api/save-score", (req, res) => {
  const { nama_tim, score } = req.body;

  const checkQuery = `
    SELECT nama_tim 
    FROM leaderboard 
    WHERE nama_tim = ?
  `;

  db.query(checkQuery, [nama_tim], (err, result) => {
    // Jika kombinasi nama_tim dan score sudah ada, tidak perlu melakukan INSERT
    if (result.length > 0) {
      return res.status(200).send("Score already exists, no need to insert");
    }

    // Jika tidak ada, lakukan INSERT
    const query = "INSERT INTO leaderboard (nama_tim, score) VALUES (?, ?)";

    db.query(query, [nama_tim, score], (err, result) => {
      if (err) {
        console.error("Error saving score:", err);
        return res.status(500).send("Internal Server Error");
      }
      res.status(200).send("Score saved successfully");
    });
  });
});

// Endpoint untuk mengosongkan tabel
app.get("/api/empty-login", (req, res) => {
  const sql = "TRUNCATE TABLE tim_log"; // Atau gunakan DELETE FROM nama_tabel jika Anda tidak ingin mengatur ulang auto-increment.
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).send("Gagal mengosongkan tabel.");
    }
    res.send("Tabel berhasil dikosongkan.");
  });
});

// Endpoint untuk mengosongkan leaderboard
app.get("/api/empty-leaderboard", (req, res) => {
  const sql = "TRUNCATE TABLE leaderboard";
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).send("Gagal mengosongkan leaderboard.");
    }
    res.send("Leaderboard berhasil dikosongkan.");
  });
});

// Endpoint untuk mendapatkan leaderboard
app.get("/api/user-join", (req, res) => {
  const sql = `
    SELECT * FROM tim_log ORDER BY nama_tim`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
});

let isQuizStarted = false; // Status kuis, false berarti belum dimulai

// Endpoint untuk memulai kuis
app.post("/api/start-quiz", (req, res) => {
  isQuizStarted = true;
  res.json({ message: "Quiz has started" });
});

// Endpoint untuk menyelesaikan kuis
app.post("/api/stop-quiz", (req, res) => {
  isQuizStarted = false;
  res.json({ message: "Quiz has ended" });
});

// Endpoint untuk memeriksa status kuis
app.get("/api/quiz-status", (req, res) => {
  res.json({ isQuizStarted });
});

app.post("/api/users/resetLogin", (req, res) => {
  const { resetnama_tim } = req.body; // Ambil nama_tim dari request body
  if (resetnama_tim) {
    db.query(
      "DELETE FROM tim_log WHERE nama_tim = ?",
      [resetnama_tim],
      (err) => {
        if (err) {
          console.error("Error resetting login:", err);
          return res.status(500).json({ error: "Failed to reset login" });
        }
        res.json({ message: "Login reset successfully" });
      }
    );
  } else {
    res.status(400).json({ error: "Nama Tim is required" });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running in port ${PORT}`));
