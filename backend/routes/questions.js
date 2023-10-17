const express = require("express");
const {
    getQuestions,
    getQuestion,
    createQuestion,
    updateQuestion,
    deleteQuestion
} = require('../controllers/questions');
const Question = require('../models/Question');
const advancedResults = require('../middleware/advancedResults')

const router = express.Router({mergeParams: true});

router
    .route('/')
    .get(advancedResults(Question), getQuestions)
    .post(createQuestion);

router
    .route('/:questionId')
    .get(getQuestion)
    .put(updateQuestion)
    .delete(deleteQuestion);

module.exports = router;