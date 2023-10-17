const express = require("express");
const {
    getQuestionnaireResponses,
    getQuestionnaireResponse,
    createQuestionnaireResponse,
    updateQuestionnaireResponse,
    deleteQuestionnaireResponse
} = require('../controllers/questionnaireResponses');
const QuestionnaireResponse = require('../models/QuestionnaireResponse');
const advancedResults = require('../middleware/advancedResults')

const router = express.Router();

router
    .route('/')
    .get(advancedResults(QuestionnaireResponse), getQuestionnaireResponses)
    .post(createQuestionnaireResponse);

router
    .route('/:questionnaireResponseId')
    .get(getQuestionnaireResponse)
    .put(updateQuestionnaireResponse)
    .delete(deleteQuestionnaireResponse);

module.exports = router;