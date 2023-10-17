const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Questionnaire = require('../models/Questionnaire');

// @desc    Get all questionnaires
// @route   GET /api/v1/questionnaires
// @access  Private
exports.getQuestionnaires = asyncHandler(async (req, res, next) => {
    const questionnaires = await Questionnaire.find();
    res.status(200).json({
        success: true,
        count: questionnaires.length,
        data: questionnaires,
    });
});

// @desc    Get single questionnaire
// @route   GET /api/v1/questionnaires/:questionnaireId
// @access  Private
exports.getQuestionnaire = asyncHandler(async (req, res, next) => {
    const questionnaire = await Questionnaire
        .findById(req.params.questionnaireId)
        .populate({
            path: 'questions.question',
            model: 'Question',
            select: 'question category'
       });

    if(!questionnaire) {
        return next(new ErrorResponse(`Questionnaire not found with objectId of ${req.params.questionnaireId}`, 404));
    }
    res.status(200).json({
        success: true,
        data: questionnaire,
    });
});

// @desc    Create questionnaire
// @route   POST /api/v1/questionnaires/
// @access  Private
exports.createQuestionnaire = asyncHandler(async (req, res, next) => {
    const questionnaire = await Questionnaire.create(req.body);
    res.status(201).json({
        success: true,
        data: questionnaire    
    });
});

// @desc    Update questionnaire
// @route   PUT /api/v1/questionnaires/:questionnaireId
// @access  Private
exports.updateQuestionnaire = asyncHandler(async (req, res, next) => {
    const questionnaire = await Questionnaire.findByIdAndUpdate(req.params.questionnaireId, req.body, {
        new: true,
        runValidators: true
    });
    if(!questionnaire) {
        return next(new ErrorResponse(`Questionnaire not found with objectId of ${req.params.questionnaireId}`, 404));
    }
    res.status(200).json({success: true, data: questionnaire});
});

// @desc    Delete questionnaire
// @route   DELETE /api/v1/questionnaires/:questionnaireId
// @access  Private
exports.deleteQuestionnaire = asyncHandler(async (req, res, next) => {
    const questionnaire = await Questionnaire.findByIdAndDelete(req.params.questionnaireId);
    if(!questionnaire) {
        return next(new ErrorResponse(`Questionnaire not found with objectId of ${req.params.questionnaireId}`, 404));
    }
    res.status(200).json({success: true, data: {}});

});