const express = require("express");
const router = express.Router();
const db = require("../db/db");

// @route   DELETE api/locations/id
// @desc    delete location
// @access  Public
router.delete("/:id", async (req, res) => {
  /* const { id } = req.body; */
  const id = req.params.id;
  console.log("body at del:", req.body);
  try {
    await db.query(
      ` DELETE FROM   locations
        WHERE         id = ${id}`
    );
    console.log("Request success, req body:", res.req.body);
    return res.status(204).send("Delete location successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
