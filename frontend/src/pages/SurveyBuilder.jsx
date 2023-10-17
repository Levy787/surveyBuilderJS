import React from "react";

import NumericQuestion from "../components/surveyBuilder/NumericQuestion";
import SingleChoiceQuestion from "../components/surveyBuilder/SingleChoiceQuestion";
import SideBar from "../components/layout/SideBar";

import QuestionOptions from "../components/surveyBuilder/QuestionOptions";
import SurveyOptions from "../components/surveyBuilder/SurveyOptions";

import { useSurveySettings, useQuestion } from "../hooks/useSurveyBuilder";

import { useFocus } from "../hooks/useFocus";

export default function SurveyBuilder() {
  const { survey, formUpdate: updateSettings } = useSurveySettings();
  const { getAll: getAllQuestions, insert: insertQuestion } = useQuestion();
  const { index: focusIndex, unfocus } = useFocus();

  const handleSave = (e) => {
    e.preventDefault();
    console.log(survey);
    console.log(focusIndex);
  };

  const questions = getAllQuestions();

  return (
    <form className="flex h-full " onSubmit={handleSave}>
      <SideBar>
        {focusIndex !== null ? <QuestionOptions /> : <SurveyOptions />}
      </SideBar>
      <div
        className="w-full h-full overflow-y-auto"
        onClick={(e) => unfocus(e)}
      >
        <div className="px-24 w-full space-y-4 py-8 ">
          <input
            type="text"
            className="input w-full text-xl text-gray-700 font-medium border border-transparent bg-transparent hover:bg-violet-50 focus:bg-violet-50 focus:border-violet-500"
            id="title"
            placeholder="Survey title..."
            value={survey.title}
            onChange={updateSettings}
          />
          <ul className="flex flex-col gap-4">
            {questions.map((field, index) => {
              switch (field.type) {
                case "Numeric":
                  return <NumericQuestion key={field.id} index={index} />;
                case "Single-Choice":
                  return <SingleChoiceQuestion key={field.id} index={index} />;
                default:
                  return <NumericQuestion key={field.id} index={index} />;
              }
            })}
          </ul>
          <button
            type="button"
            onClick={() => insertQuestion()}
            className="btn-fill w-full"
          >
            Add Question
          </button>
        </div>
      </div>
    </form>
  );
}
