const express = require("express");
const {
    getQuestionnaires,
    getQuestionnaire,
    createQuestionnaire,
    updateQuestionnaire,
    deleteQuestionnaire
} = require('../controllers/questionnaire');
const Questionnaire = require('../models/Questionnaire');
const advancedResults = require('../middleware/advancedResults')

// Include other resource routers
const questionRouter = require('./questions');

const router = express.Router();

// Reroute into other resource routers

router.use('/:questionnaireId/questions', questionRouter);

router
    .route('/')
    .get(advancedResults(Questionnaire), getQuestionnaires)
    .post(createQuestionnaire);

router
    .route('/:questionnaireId')
    .get(getQuestionnaire)
    .put(updateQuestionnaire)
    .delete(deleteQuestionnaire);

module.exports = router;