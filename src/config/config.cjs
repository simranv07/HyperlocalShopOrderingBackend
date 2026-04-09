const config = {
  development: {
    username: "postgres",
    password: "1234",
    database: "hyperlocal_shop_ordering_db",
    host: "127.0.0.1",
    port: 5433,
    dialect: "postgres",
    schema: "hyperlocal_shop_ordering",
    define: {
      timestamps: false,
    },
  },
};

module.exports = config;