import React from "react";

const formSteps = [
  {
    stepCount: 1,
    stepName: "Personal Data",
  },
  {
    stepCount: 2,
    stepName: "Image",
  },
  {
    stepCount: 3,
    stepName: "Review",
  },
];

function FormStepIndicator({ current }) {
  return (
    <ul className="add-new-employee__stepper">
      {formSteps.map((step, idx) => (
        <React.Fragment key={step.stepCount}>
          <li
            className={`add-new-employee__stepper__step ${
              step.stepCount === current ? "active" : ""
            }`}
          >
            <span className="add-new-employee__stepper__step__circle"></span>
            <span className="add-new-employee__stepper__step__text">
              {step.stepName}
            </span>
          </li>
          {idx < formSteps.length - 1 ? (
            <li className="add-new-employee__stepper__road">
              <hr />
            </li>
          ) : null}
        </React.Fragment>
      ))}
    </ul>
  );
}

export default FormStepIndicator;
