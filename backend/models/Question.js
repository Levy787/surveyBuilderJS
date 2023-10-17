const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'The question must have a body.'],
        trim: true,
    },
    category: {
        type: String,
        enum: ['Environmental', 'Social', 'Governance'],
        required: [true, "The question must have a category."],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Question', QuestionSchema);
