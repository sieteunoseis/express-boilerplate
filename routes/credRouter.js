var express = require("express");
var router = express.Router({ strict: true });
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
var hb = require("express-handlebars").create();

// Database file path
const DB_PATH = path.join(__dirname, "..", "db", "database.db");

// Function to create database if it doesn't exist
const createDatabase = () => {
  const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the SQLite database.");
  });

  // Check if the table exists, if not create it
  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS credentials (
      id BOOLEAN PRIMARY KEY DEFAULT True CONSTRAINT one_row_only CHECK (id) NOT NULL,
      hostname TEXT,
      username TEXT,
      password TEXT,
      version TEXT
    )`,
      (err) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log('Table "credentials" is ready.');
        }
      }
    );
  });

  return db;
};

// Create the database if it doesn't exist
const db = createDatabase();
var year = new Date().getFullYear();

router.get("/", function (req, res, next) {
  db.all("SELECT * FROM credentials", (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (rows.length > 0) {
      res.render("credentials", { title: "Add New Account", year: year, script: "credentials.js", results: rows });
    } else {
      res.render("credentials", { title: "Add New Account", year: year, script: "credentials.js" });
    }
  });
});

router.get("/data", (req, res) => {
  db.all("SELECT * FROM credentials", (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(rows);
    }
  });
});

router.post("/data", (req, res) => {
  const { hostname, username, password, version } = req.body;
  db.run("INSERT OR REPLACE INTO credentials (id, hostname, username, password, version) VALUES (?, ?, ?, ?, ?)", [true, hostname, username, password, version], (err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      db.all("SELECT * FROM credentials", (err, rows) => {
        if (err) {
          res.status(500).send(err.message);
        } else {
          hb.render("./views/partials/savedCreds.hbs", { layout: false, results: rows }).then((renderedHtml) => {
            res.send(renderedHtml);
          });
        }
      });
    }
  });
});

router.put("/data/:id", (req, res) => {
  const { hostname, username, password, version } = req.body;
  const id = req.params.id;
  db.run("UPDATE credentials SET hostname=?, username=?, password=?, version=? WHERE id=?", [hostname, username, password, version, id], (err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      db.all("SELECT * FROM credentials", (err, rows) => {
        if (err) {
          res.status(500).send(err.message);
        } else {
          hb.render("./views/partials/savedCreds.hbs", { layout: false, results: rows }).then((renderedHtml) => {
            res.send(renderedHtml);
          });
        }
      });
    }
  });
});

router.delete("/data/:id", (req, res) => {
  const id = req.params.id;
  db.run("DELETE FROM credentials WHERE id=?", [id], (err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      db.all("SELECT * FROM credentials", (err, rows) => {
        if (err) {
          res.status(500).send(err.message);
        } else {
          hb.render("./views/partials/savedCreds.hbs", { layout: false, results: rows }).then((renderedHtml) => {
            res.send(renderedHtml);
          });
        }
      });
    }
  });
});

module.exports = router;
