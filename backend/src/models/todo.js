module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define("todo", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("done", "pending", "in progress", "completed"),
      allowNull: false,
      defaultValue: "pending",
    },
  });

  return Todo;
};
