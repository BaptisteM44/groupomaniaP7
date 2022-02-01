module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "rB8keMLIXBmLX3nN",
    DB: "groupomaniabdd",
    dialect: "mysql",
    pool: {
      max: 5, // max connexion
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };