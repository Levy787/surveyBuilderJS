import useArrayHook from "./generic/useArrayHook";
import useAttributeHook from "./generic/useAttributeHook";
import { useSurveyBuilderContext } from "../context/SurveyBuilderContext";

import { v4 as uuid } from "uuid";

const defaultValidationOption = { minNum: null, maxNum: null, minLen: null };
const defaultScoringOption = { id: null, choice_id: null, val_1: null, val_2: null, sign: null, score: null };
const defaultChoice = { id: null, choice: null };
const defaultQuestion = {
    id: null,
    title: "",
    type: "Numeric",
    question: "",
    placeholder: "",
    required: false,
    category: "",
    scoringWeight: null,
    choices: [],
    applyValidation: false,
    applyScoring: false,
    validationOptions: {},
    scoringOptions: [],
};

export function useChoice(questionIndex) {
    return useArrayHook(questionIndex, useQuestion, 'choices', defaultChoice);
}

export function useValidation(questionIndex) {
    return useAttributeHook(questionIndex, useQuestion, 'validationOptions', defaultValidationOption);
}

export function useScoring(questionIndex) {
    return useArrayHook(questionIndex, useQuestion, 'scoringOptions', defaultScoringOption);
}

export function useSurveySettings() {
    const { state, update: updateSurvey } = useSurveyBuilderContext()

    const formUpdate = (e) => {
        let value = e.target.value;
        if (e.target.type === "checkbox") {
            value = e.target.checked;
        }
        update(e.target.id, value);
    };

    const update = (key, val) => {
        updateSurvey(key, val);
    };

    return { survey: state, update, formUpdate };
}

export function useQuestion() {
    const { state, update: updateParent } = useSurveyBuilderContext();
    const questionsKey = 'questions';

    const get = (index) => {
        return state[questionsKey][index];
    };

    const getAll = () => {
        return state[questionsKey];
    };

    const insert = (index = getAll().length) => {
        const calc = [...getAll()];
        calc.splice(index, 0, { ...defaultQuestion, id: uuid() });
        updateParent(questionsKey, calc);
    };

    const update = (index, key, val) => {
        const calc = getAll().map((k, i) =>
            i === index ? { ...k, [key]: val } : k
        );
        updateParent(questionsKey, calc);
    };

    const formUpdate = (e, index) => {
        let value = e.target.value;
        if (e.target.type === "checkbox") {
            value = e.target.checked;
        }
        update(index, e.target.id, value);
    };

    const remove = (index) => {
        updateParent(
            questionsKey,
            getAll().filter((_k, i) => i !== index)
        );
    };
    return { get, getAll, insert, update, formUpdate, remove };
} 
