const mongoose = require("mongoose");

const ResponseSchema = new mongoose.Schema({
    formId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Form", 
        required: true 
    }, // Link to Form
    responses: [{
        fieldId: { 
            type: mongoose.Schema.Types.ObjectId, 
            required: true 
        }, // Link to field
        fieldType: {
            type: String,
            required: true,
            enum: ["title", "paragraph", "date", "number", "short-answer", "group-options", "multiple-choice", "rating"]
        }, // Ensure correct field type
        value: { 
            type: mongoose.Schema.Types.Mixed, 
            required: true 
        } // Value entered by user (can be text, number, date, array for multiple-choice, etc.)
    }],
    submittedAt: { type: Date, default: Date.now }
});

const Response = mongoose.model("Response", ResponseSchema);

module.exports = { Response };
