import React from "react";

export default function SurveyOptions({handleSave}) {
  return (
    <div className='space-y-6'>
      <div>Survey Options</div>
      <button type="submit" className="btn-fill w-full">
        Show data
      </button>
    </div>
  );
}
