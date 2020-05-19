const express = require("express");
const router = express.Router();
const db = require("../db/db");

// @route   POST api/locations/new
// @desc    create new location
// @access  Public
router.post("/", async (req, res) => {
  const { latitude, longitude } = req.body;
  console.log("body:", req.body);
  try {
    await db.query(
      ` INSERT INTO   locations (id, latitude, longitude) 
        VALUES        (DEFAULT, $1, $2)`,
      [latitude, longitude]
    );
    console.log("Request success, req body:", res.req.body);
    return res.status(201).send("insert new location successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
