const mongoose = require("mongoose");

const FieldSchema = new mongoose.Schema({
  label: { type: String, required: true }, // Field label (title)
  type: {
    type: String,
    required: true,
    enum: ["title", "paragraph", "dateField", "numberField", "shortAnswer", "longAnswer", "options", "multipleChoice", "dropDownList", "linearScale","rating"], // Supported field types
  }, // Field type
  isRequired: { type: Boolean, default: false }, // Whether the field is required
  options: {
    type: mongoose.Schema.Types.Mixed, // Flexible field to hold different option structures
    default: [],
  }, // Store options dynamically depending on field type
});

const FormSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Form title
  description: { type: String, default: "" }, // Optional description
  fields: [FieldSchema], // Store array of fields
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

const Form = mongoose.model("Form", FormSchema);

module.exports = { Form };
