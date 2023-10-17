import React from "react";
import SurveyCard from "./SurveyCard";
import {useQuestion} from "../../hooks/useSurveyBuilder";

export default function NumericQuestion({ index }) {
  const {get, formUpdate} = useQuestion();
  const question = get(index);

  return (
    <SurveyCard
      index={index}
    >
      <input
        className="input max-w-full mb-4"
        id="placeholder"
        type="text"
        placeholder="Placeholder text..."
        value={question.placeholder}
        onChange={(e) => formUpdate(e, index)}
      />
    </SurveyCard>
  );
}
