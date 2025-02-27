const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mysql = require("mysql2");
const multer = require("multer");
const path = require("path");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); 
app.use("/uploads", express.static("uploads"));

// Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "balu@12345",
    database: "online_voting_system"
});

db.connect((err) => {
    if (err) console.log("❌ Database Connection Error:", err);
    else console.log("MySQL Connected");
});

// Multer Setup for Image Upload
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Authentication Routes
app.use("/api/auth", authRoutes);

// API to Fetch Candidates (User Dashboard)
app.get("/candidates", (req, res) => {
    db.query("SELECT * FROM candidates", (err, result) => {
        if (err) {
            console.error("❌ Fetch Candidates Error:", err);
            return res.status(500).json({ error: "Database error while fetching candidates." });
        }
        res.json(result);
    });
});
// API to Update Candidate
app.put("/update-candidate/:id", upload.single("photo"), (req, res) => {
    const { id } = req.params;
    const { name, party, bio } = req.body;
    const photo = req.file ? `/uploads/${req.file.filename}` : null;

    let updateQuery = "UPDATE candidates SET name=?, party=?, bio=?";
    let values = [name, party, bio];

    if (photo) {
        updateQuery += ", photo=?";
        values.push(photo);
    }

    updateQuery += " WHERE id=?";
    values.push(id);

    db.query(updateQuery, values, (err, result) => {
        if (err) {
            console.error("❌ Update Candidate Error:", err);
            return res.status(500).json({ error: "Database error while updating candidate." });
        }
        res.json({ message: "Candidate updated successfully!" });
    });
});

// API to Add Candidate (Admin)
app.post("/add-candidate", upload.single("photo"), (req, res) => {
    const { id, name, party, bio } = req.body;
    const photo = req.file ? `/uploads/${req.file.filename}` : "";

    if (!id || !name || !party || !bio) {
        return res.status(400).json({ error: "All fields (id, name, party, bio) are required." });
    }

    db.query(
        "INSERT INTO candidates (id, name, party, bio, photo) VALUES (?, ?, ?, ?, ?)",
        [id, name, party, bio, photo],
        (err) => {
            if (err) {
                console.error("❌ MySQL Insert Error:", err);
                return res.status(500).json({ error: "Failed to add candidate." });
            }
            res.json({ message: "Candidate added successfully" });
        }
    );
});

// API to Delete Candidate
app.delete("/delete-candidate/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM candidates WHERE id = ?", [id], (err) => {
        if (err) {
            console.error("❌ Delete Candidate Error:", err);
            return res.status(500).json({ error: "Failed to delete candidate." });
        }
        res.json({ message: "🗑️ Candidate deleted successfully" });
    });
});

// API to Check If User Has Voted
app.get("/check-vote/:userId", (req, res) => {
    const { userId } = req.params;

    db.query("SELECT id FROM votes WHERE id = ?", [userId], (err, results) => {
        if (err) {
            console.error("❌ MySQL Query Error:", err);
            return res.status(500).json({ error: "Database error while checking vote status." });
        }

        if (results.length > 0) {
            res.json({ voted: true, candidateId: results[0].candidate_id });
        } else {
            res.json({ voted: false });
        }
    });
});
app.get("/voters", (req, res) => {
    const query = `
        SELECT user_email, vote_time 
        FROM votes 
        ORDER BY vote_time DESC;
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error("❌ Error fetching voters:", err);
            return res.status(500).json({ error: "Database error while fetching voters." });
        }
        res.json(results);
    });
});

// API to Handle Voting
app.post("/vote", (req, res) => {
    const { email, candidateId } = req.body;

    if (!email || !candidateId) {
        return res.status(400).json({ error: "Email and Candidate ID are required." });
    }

    // Check if user has already voted
    db.query("SELECT * FROM votes WHERE user_email = ?", [email], (err, results) => {
        if (err) {
            console.error("❌ MySQL Query Error:", err);
            return res.status(500).json({ error: "Database error while checking vote status." });
        }

        if (results.length > 0) {
            return res.status(400).json({ error: "User has already voted!" });
        }

        // Insert vote into database
        db.query(
            "INSERT INTO votes (user_email, candidate_id) VALUES (?, ?)",
            [email, candidateId],
            (err) => {
                if (err) {
                    console.error("❌ MySQL Insert Error:", err);
                    return res.status(500).json({ error: "Failed to submit vote." });
                }
                res.json({ message: "Vote submitted successfully!" });
            }
        );
    });
});
app.get("/vote-results", (req, res) => {
    const query = `
        SELECT c.id, c.name, c.party, COUNT(v.candidate_id) AS vote_count
        FROM candidates c
        LEFT JOIN votes v ON c.id = v.candidate_id
        GROUP BY c.id, c.name, c.party
        ORDER BY vote_count DESC;
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error("❌ Error fetching vote results:", err);
            return res.status(500).json({ error: "Database error while fetching vote results." });
        }
        res.json(results);
    });
});

  


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
