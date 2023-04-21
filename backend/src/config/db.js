
const Sequelize = require("sequelize");
const UserModel = require("../models/user");
const TodoModel = require("../models/todo");


const sequelize = new Sequelize("raza", "root", "1234", {
  host: "localhost",
  dialect:
    "mysql" ,
  logging: false, // Set logging to false to disable logs
});


const User = UserModel(sequelize, Sequelize);
const Todo = TodoModel(sequelize, Sequelize);

User.hasMany(Todo);
Todo.belongsTo(User);

sequelize
  .sync()
  .then(() => {
    console.log("Database and tables created successfully!");
  })
  .catch((error) => {
    console.error("Error creating database and tables: ", error);
  });

module.exports = {
  User,
  Todo,
  sequelize,
  Sequelize,
};

