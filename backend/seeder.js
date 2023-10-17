const fs = require('fs');
const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config({path: './config/config.env'});

const Question = require('./models/Question');
const Questionnaire = require('./models/Questionnaire');

mongoose.connect(process.env.MONGO_URI);

const questions = JSON.parse(fs.readFileSync(`${__dirname}/_data/esg-reporting.questions.json`, 'utf-8'));
const questionnaires = JSON.parse(fs.readFileSync(`${__dirname}/_data/esg-reporting.questionnaires.json`, 'utf-8'));

const importData = async () => {
    try {
        await Question.create(questions);
        console.log("Questions imported...");
        await Questionnaire.create(questionnaires);
        console.log("Questionnaires imported...");
        process.exit();
    } catch (err) {
        console.log(err);
    }
}

const deleteData = async () => {
    try {
        await Question.deleteMany();
        console.log("Questions deleted...");
        await Questionnaire.deleteMany();
        console.log("Questionnaires deleted...");
        process.exit();
    } catch (err) {
        console.log(err);
    }
}

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}