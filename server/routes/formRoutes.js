// const express = require("express");
// const { Form } = require("../model/Form");

// const router = express.Router();

// // Create a new form (Save Form Structure)
// router.post("/", async (req, res) => {
//   try {
//     const { creationDate, description, fields } = req.body;

//     // Ensure required fields are present
//     if (!creationDate || !fields || !Array.isArray(fields)) {
//       return res.status(400).json({ error: "Creation date and fields are required" });
//     }

//     // Convert the user-provided creationDate to a Date object
//     const parsedDate = new Date(creationDate);
//     if (isNaN(parsedDate.getTime())) {
//       return res.status(400).json({ message: "Invalid date format" });
//     }


//     const form = new Form({  creationDate: parsedDate, description, fields });
//     await form.save();

//     res.status(201).json({ message: "Form saved successfully", form });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Get a form by ID
// router.get("/", async (req, res) => {
//   try {
//     const forms = await Form.find(); // Fetch all forms
//     res.json(forms);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.get("/:id", async (req, res) => {
//   try {
//     const form = await Form.findById(req.params.id); // Find form by ID
//     if (!form) {
//       return res.status(404).json({ message: "Form not found" });
//     }
//     res.json(form);
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// });
// module.exports = router;


const express = require("express");
const { Op } = require("sequelize");
const Form = require("../model/Form");
const Field = require("../model/Field");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { creationDate, description, fields } = req.body;

    if (!creationDate || !fields || !Array.isArray(fields)) {
      return res.status(400).json({ error: "Creation date and fields are required" });
    }

    // Convert date
    const parsedDate = new Date(creationDate);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    // Create Form
    const form = await Form.create({
      creationDate: parsedDate,
      description,
    });

    // Insert Fields
    if (fields.length > 0) {
      const fieldData = fields.map((field) => ({
        ...field,
        formId: form.id, // Foreign Key linking to the Form
      }));
      await Field.bulkCreate(fieldData);
    }

    // Fetch the form again with fields included
    const savedForm = await Form.findByPk(form.id, {
      include: [{ model: Field }],
    });

    res.status(201).json({ message: "Form saved successfully", form: savedForm });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const forms = await Form.findAll({
      include: [{ model: Field }], // Include associated fields
    });
    res.json(forms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const form = await Form.findByPk(req.params.id, {
      include: [{ model: Field }], // Include form fields
    });

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.json(form);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;