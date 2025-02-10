const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Form = require("./Form");

const Field = sequelize.define("Field", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  label: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM(
      "title",
      "paragraph",
      "dateField",
      "numberField",
      "shortAnswer",
      "longAnswer",
      "options",
      "multipleChoice",
      "dropDownList",
      "linearScale",
      "rating"
    ),
    allowNull: false,
  },
  isRequired: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  options: {
    type: DataTypes.JSONB, // Flexible field to store different options (similar to MongoDB's Mixed type)
    defaultValue: [],
  },
});

// Define One-to-Many Relationship (Each Form has multiple Fields)
Form.hasMany(Field, { foreignKey: "formId", onDelete: "CASCADE" });
Field.belongsTo(Form, { foreignKey: "formId" });

module.exports = Field;
