const { Pool } = require("pg");

var pool;

if (process.env.NODE_ENV === "production") {
  const connString = process.env.DATABASE_URL;
  console.log("db @ production environment");

  pool = new Pool({ connectionString: connString, ssl: true });
} else {
  // Local environment

  console.log("db @ local development environment");
  /*
  pool = new Pool({ connectionString: herokuTestString, ssl: true }); 
  */
  const localConn = require("./dbconfig/localConnection.json");

  pool = new Pool({
    user: localConn.user,
    host: localConn.host,
    database: localConn.database,
    password: localConn.password,
    port: localConn.port,
  });
}

module.exports = {
  query: (text, params) => {
    return pool.query(text, params);
  },
};

// End of file
