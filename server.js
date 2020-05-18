// node.js server
const express = require("express");
const path = require("path");
const cors = require("cors");
const mountRoutes = require("./routes/routeHandler");
const app = express();

app.use(cors());
app.use(express.json({ extended: true }));

mountRoutes(app);

// Serve only the static files form the dist directory
app.use(express.static(__dirname + "/dist/tamk-ang-map"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/tamk-ang-map/index.html"));
});

const port = process.env.PORT || 5000;

// Start the app by listening on the default Heroku port when prod.
app.listen(port);

console.log(`server listening on ${port}`);
