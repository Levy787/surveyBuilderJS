import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

import {useQuestion} from "../../hooks/useSurveyBuilder";
import {useFocus} from "../../hooks/useFocus";

export default function SurveyCard({ index, children }) {
  const {get, formUpdate, remove: removeQuestion} = useQuestion();
  const {index: focusIndex, focus, unfocus} = useFocus();
  const question = get(index);
  const selected = (index === focusIndex);

  const remove = (e, index) => {
    unfocus(e);
    removeQuestion(index);  
  }

  return (
    <li
      className={`p-8 rounded-xl bg-white list-none border-2 space-y-4 ${
        selected ? "border-violet-500" : "hover:border-violet-300"
      }`}
      onClick={(e) => focus(e, index)}
      draggable={true}
    >
      <div className="flex justify-between">
        <div className="text-sm text-gray-600 font-semibold px-2 py-1 rounded bg-violet-100">
          {`Question ${index + 1}`}
        </div>
        <FontAwesomeIcon
          className="text-xl text-red-300 hover:text-red-500 cursor-pointer"
          icon={faTrashCan}
          onClick={(e) => remove(e, index)}
        />
      </div>
      <input
        id="question"
        className="question-input max-w-full text-lg font-medium"
        type="text"
        placeholder="Enter question..."
        onChange={(e) => formUpdate(e, index)}
        value={question.question}
      />
      {children && Array.isArray(children) ? children.map((c) => c) : children}
    </li>
  );
}
