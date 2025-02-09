// const mongoose = require("mongoose");

// const FieldSchema = new mongoose.Schema({
//   label: { type: String, required: true }, // Field label (title)
//   type: {
//     type: String,
//     required: true,
//     enum: ["title", "paragraph", "dateField", "numberField", "shortAnswer", "longAnswer", "options", "multipleChoice", "dropDownList", "linearScale","rating"], // Supported field types
//   }, // Field type
//   isRequired: { type: Boolean, default: false }, // Whether the field is required
//   options: {
//     type: mongoose.Schema.Types.Mixed, // Flexible field to hold different option structures
//     default: [],
//   }, // Store options dynamically depending on field type
// });

// const FormSchema = new mongoose.Schema({
//   creationDate: { type: Date, required: true }, // User-entered date
//   description: { type: String, default: "" }, // Optional description
//   fields: [FieldSchema], // Store array of fields
// });

// const Form = mongoose.model("Form", FormSchema);

// module.exports = { Form };


const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Form = sequelize.define("Form", {
  id: {
    type: DataTypes.UUID, // UUID for unique IDs like MongoDB's ObjectId
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  creationDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    defaultValue: "",
  },
});

module.exports = Form;
