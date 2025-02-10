const express = require("express");
const { Form } = require("../model/Form");

const router = express.Router();

// Create a new form (Save Form Structure)
router.post("/", async (req, res) => {
  try {
    const { creationDate, description, fields } = req.body;

    // Ensure required fields are present
    if (!creationDate || !fields || !Array.isArray(fields)) {
      return res.status(400).json({ error: "Creation date and fields are required" });
    }

    // Convert the user-provided creationDate to a Date object
    const parsedDate = new Date(creationDate);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }


    const form = new Form({  creationDate: parsedDate, description, fields });
    await form.save();

    res.status(201).json({ message: "Form saved successfully", form });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a form by ID
router.get("/", async (req, res) => {
  try {
    const forms = await Form.find(); // Fetch all forms
    res.json(forms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const form = await Form.findById(req.params.id); // Find form by ID
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.json(form);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
module.exports = router;
