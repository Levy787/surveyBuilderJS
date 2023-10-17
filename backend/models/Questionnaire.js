const mongoose = require('mongoose');

const QuestionnaireSchema = new mongoose.Schema({
    questions: [{
        question: {
            type: mongoose.Schema.ObjectId,
            required: [true, 'Questions require a question.']},
        weight: {
            type: Number,
            required: [true, 'Question requires a weight.']
        }
    }],
    categoryWeights: [{
        category: {
            type: String,
            enum: ['Environmental', 'Social', 'Governance'],
            required: [true, 'Category requires a name']
        },
        weight: {
            type: Number,
            required: [true, 'Category requires a weight']
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Questionnaire', QuestionnaireSchema);
