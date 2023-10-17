const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Question = require('../models/Question');

// @desc    Get all questions
// @route   GET /api/v1/questions
// @access  Private
exports.getQuestions = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

// @desc    Get single question
// @route   GET /api/v1/questions/:questionId
// @access  Private
exports.getQuestion = asyncHandler(async (req, res, next) => {
    const question = await Question.findById(req.params.questionId);
    if(!question) {
        return next(new ErrorResponse(`Question not found with objectId of ${req.params.questionId}`, 404));
    }
    res.status(200).json({
        success: true,
        data: question,
    });
});

// @desc    Create question
// @route   POST /api/v1/questions/
// @access  Private
exports.createQuestion = asyncHandler(async (req, res, next) => {
    const question = await Question.create(req.body);
    res.status(201).json({
        success: true,
        data: question    
    });
});

// @desc    Update question
// @route   PUT /api/v1/questions/:questionId
// @access  Private
exports.updateQuestion = asyncHandler(async (req, res, next) => {
    const question = await Question.findByIdAndUpdate(req.params.questionId, req.body, {
        new: true,
        runValidators: true
    });
    if(!question) {
        return next(new ErrorResponse(`Question not found with objectId of ${req.params.questionId}`, 404));
    }
    res.status(200).json({success: true, data: question});
});

// @desc    Delete question
// @route   DELETE /api/v1/questions/:questionId
// @access  Private
exports.deleteQuestion = asyncHandler(async (req, res, next) => {
    const question = await Question.findByIdAndDelete(req.params.questionId);
    if(!question) {
        return next(new ErrorResponse(`Question not found with objectId of ${req.params.questionId}`, 404));
    }
    res.status(200).json({success: true, data: {}});

});