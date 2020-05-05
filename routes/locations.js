const express = require("express");
const router = express.Router();
const db = require("../db/db");

// @route   GET api/locations
// @desc    Get location data
// @access  Public
router.get("/", async (req, res) => {
  try {
    const responseData = await db.query(
      "SELECT * FROM locations ORDER BY id ASC"
    );

    if (responseData.rows.length < 1) {
      return res.status(400).json({ msg: "Invalid query, no results" });
    } else {
      //console.log(responseData.rows);
      res.send(responseData.rows);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
