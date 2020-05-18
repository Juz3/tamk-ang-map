/**
 *  <routeHandler.js>
 *  Gather and export all backend routes
 *
 *  Copyright information
 *
 *      Copyright (C) 2020 Jussi Koivumäki <firstname.lastname@outlook.com>
 *
 *  @author Jussi Koivumäki
 *
 */

/* locations */
const locations = require("./locations");
const newLocation = require("./newLocation");

module.exports = (app) => {
  app.use("/api/locations", locations);
  app.use("/api/locations/new", newLocation);
  // add routes
};
