const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const QuestionnaireResponse = require('../models/QuestionnaireResponse');

// @desc    Get all questionnaireResponses
// @route   GET /api/v1/questionnaireResponses
// @access  Private
exports.getQuestionnaireResponses = asyncHandler(async (req, res, next) => {
    const questionnaireResponses = await QuestionnaireResponse.find();
    res.status(200).json({
        success: true,
        count: questionnaireResponses.length,
        data: questionnaireResponses,
    });
});

// @desc    Get single questionnaireResponse
// @route   GET /api/v1/questionnaireResponses/:questionnaireResponseId
// @access  Private
exports.getQuestionnaireResponse = asyncHandler(async (req, res, next) => {
    const questionnaireResponse = await QuestionnaireResponse
        .findById(req.params.questionnaireResponseId)
        .populate({
            path: 'questionnaire',
            model: 'Questionnaire',
            select: 'questions categoryWeights'
        })
        .populate({
            path: 'answers.question',
            model: 'Question',
            select: 'question category'
       });

    if(!questionnaireResponse) {
        return next(new ErrorResponse(`QuestionnaireResponses not found with objectId of ${req.params.questionnaireResponseId}`, 404));
    }
    res.status(200).json({
        success: true,
        data: questionnaireResponse,
    });
});

// @desc    Create questionnaireResponses
// @route   POST /api/v1/questionnaireResponses/
// @access  Private
exports.createQuestionnaireResponse = asyncHandler(async (req, res, next) => {
    const questionnaireResponse = await QuestionnaireResponse.create(req.body);
    res.status(201).json({
        success: true,
        data: questionnaireResponse    
    });
});

// @desc    Update questionnaireResponses
// @route   PUT /api/v1/questionnaireResponses/:questionnaireId
// @access  Private
exports.updateQuestionnaireResponse = asyncHandler(async (req, res, next) => {
    const questionnaireResponse = await QuestionnaireResponse
        .findByIdAndUpdate(req.params.questionnaireResponseId, req.body, {
            new: true,
            runValidators: true
        });
    if(!questionnaireResponse) {
        return next(new ErrorResponse(`QuestionnaireResponse not found with objectId of ${req.params.questionnaireResponseId}`, 404));
    }
    res.status(200).json({success: true, data: questionnaireResponse});
});

// @desc    Delete questionnaireResponse
// @route   DELETE /api/v1/questionnaireResponses/:questionnaireResponseId
// @access  Private
exports.deleteQuestionnaireResponse = asyncHandler(async (req, res, next) => {
    const questionnaireResponse = await QuestionnaireResponse.findByIdAndDelete(req.params.questionnaireResponseId);
    if(!questionnaireResponse) {
        return next(new ErrorResponse(`QuestionnaireResponse not found with objectId of ${req.params.questionnaireResponseId}`, 404));
    }
    res.status(200).json({success: true, data: {}});

});