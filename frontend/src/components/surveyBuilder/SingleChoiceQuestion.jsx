import React from "react";
import SurveyCard from "./SurveyCard";
import {useChoice} from "../../hooks/useSurveyBuilder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

<FontAwesomeIcon
  className="text-xl text-orange-300 hover:text-orange-500 cursor-pointer"
  icon={faTrashCan}
  onClick={(e) => remove(e, index)}
/>;

export default function SingleChoiceQuestion({ index }) {
  const { get, getAll, insert, formUpdate, remove } = useChoice(index);

  const choices = getAll();

  return (
    <SurveyCard index={index}>
      <ul className="flex flex-col gap-1">
        {choices.map((qc, qcIndex) => (
          <li
            key={qc.id}
            className="flex items-center align-middle justify-between text-gray-700 font-medium"
          >
            <div className="rounded px-2 w-full flex gap-4">
              <input type="radio" disabled />
              <input
                id="choice"
                className="text-gray-700 bg-transparent p-2 rounded w-full border border-transparent justify-self-start focus:outline-none focus:border-violet-500"
                type="text"
                placeholder="Enter option..."
                value={get(qcIndex).choice || ''}
                onChange={(e) => formUpdate(e, qcIndex)}
              />
            </div>
            <FontAwesomeIcon
              className="text-sm text-orange-200 hover:text-orange-300 cursor-pointer justify-self-end"
              icon={faTrashCan}
              onClick={(e) => remove(qcIndex)}
            />
          </li>
        ))}
        <li
          className="cursor-pointer mt-2 py-2 text-gray-500 font-semibold flex justify-center rounded  bg-violet-50 hover:bg-violet-100 hover:text-violet-500"
          onClick={() => insert()}
        >
          + Add Option
        </li>
      </ul>
    </SurveyCard>
  );
}
