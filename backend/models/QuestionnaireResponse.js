const mongoose = require('mongoose');

const QuestionnaireResponseSchema = new mongoose.Schema({
    questionnaire: {
        type: mongoose.Schema.ObjectId,
        required: [true, 'Questions require a question.'],
    },
    answers: [{
        question: {
            type: mongoose.Schema.ObjectId,
            required: [true, "Question required."]
        },
        answer: {
            type: Number,
            required: [true, "Question answer required."]
        },
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('QuestionnaireResponse', QuestionnaireResponseSchema);
