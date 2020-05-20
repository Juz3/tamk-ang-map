const express = require("express");
const router = express.Router();
const db = require("../db/db");

// @route   POST api/locations/new
// @desc    create new location
// @access  Public
router.post("/", async (req, res) => {
  const { latitude, longitude } = req.body;
  console.log("body:", req.body);
  if (latitude > -90 && latitude < 90 && longitude > -180 && longitude < 180) {
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
  } else {
    res.status(500).send("Invalid request");
  }
});

module.exports = router;
