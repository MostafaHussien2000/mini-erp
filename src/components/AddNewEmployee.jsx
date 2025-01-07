import React, { useState } from "react";
import PopUp from "../ui/PopUp";
import Icons from "../ui/Icons";

function AddNewEmployee({ close }) {
  const [currentStep, setCurrentStep] = useState(1);

  const formSteps = [
    {
      stepCount: 1,
      stepName: "Personal Data",
      Component: PersonalDataStep,
    },
    {
      stepCount: 2,
      stepName: "Image",
      Component: UploadImageStep,
    },
    {
      stepCount: 3,
      stepName: "Review",
      Component: PreviewDataStep,
    },
  ];

  const submitFormHandler = (e) => {
    e.preventDefault();

    console.log(e.target[0]);
  };

  return (
    <PopUp close={close}>
      <header className="add-new-employee__header">
        <h1>Add New Employee</h1>
        <button type="button" onClick={close}>
          <Icons.Close />
        </button>
      </header>

      <hr style={{ opacity: 0.2 }} />

      <FormStepIndicator
        steps={formSteps}
        current={currentStep}
        setStep={setCurrentStep}
      />

      <form
        action="POST"
        className="add-new-employee__form"
        onSubmit={submitFormHandler}
      >
        {formSteps[currentStep - 1].Component({
          next: () => setCurrentStep((current) => current + 1),
          back: () => setCurrentStep((current) => current - 1),
        })}
      </form>
    </PopUp>
  );
}

export default AddNewEmployee;

function FormStepIndicator({ steps, current, setStep }) {
  return (
    <ul className="add-new-employee__stepper">
      {steps.map((step, idx) => (
        <>
          <li
            className={`add-new-employee__stepper__step ${
              step.stepCount === current ? "active" : ""
            }`}
            key={step.stepCount}
          >
            <span className="add-new-employee__stepper__step__circle"></span>
            <span className="add-new-employee__stepper__step__text">
              {step.stepName}
            </span>
          </li>
          {idx < steps.length - 1 ? (
            <li className="add-new-employee__stepper__road">
              <hr />
            </li>
          ) : null}
        </>
      ))}
    </ul>
  );
}

function PersonalDataStep({ next }) {
  return (
    <>
      <h1>Step 1 - Personal Data</h1>
      <div className="add-new-employee__form__input-container">
        <label htmlFor="employee-name">Name</label>
        <input
          type="text"
          name="employee-name"
          id="employee-name"
          placeholder="Enter Employee Name"
        />
      </div>
      <div className="add-new-employee__form__input-container">
        <label htmlFor="employee-startDate">Start Date</label>
        <input
          type="date"
          name="employee-startDate"
          id="employee-startDate"
          placeholder="Start Date"
        />
      </div>
      <div className="add-new-employee__form__input-container">
        <label htmlFor="employee-role">Role</label>
        <select defaultValue={"none"} name="employee-role" id="employee-role">
          <option value="none" disabled>
            Select Role
          </option>
          <option value="">IT</option>
          <option value="">Software</option>
          <option value="">Data Entry</option>
        </select>
      </div>
      <div className="add-new-employee__form__input-container">
        <label htmlFor="employee-email">Email</label>
        <input
          type="email"
          name="employee-email"
          id="employee-email"
          placeholder="Enter E-mail"
        />
      </div>
      <div className="add-new-employee__form__input-container">
        <label htmlFor="employee-phone">Phone</label>
        <input
          type="tel"
          name="employee-phone"
          id="employee-phone"
          placeholder="Enter Phone Number"
        />
      </div>
      <div className="add-new-employee__form__buttons">
        <button type="button" onClick={next}>
          Next
        </button>
      </div>
    </>
  );
}

function UploadImageStep({ next, back }) {
  return (
    <>
      <h1>Step 2 - Upload Image</h1>
      <div className="add-new-employee__form__input-container image-upload">
        <div>
          <Icons.ImagePlus />
          <label htmlFor="employee-image">
            <Icons.Plus /> Upload Image
          </label>
        </div>
        <input
          type="file"
          name="employee-image"
          accept=".jpg, .jpeg, .png"
          id="employee-image"
        />
      </div>
      <div className="add-new-employee__form__buttons">
        <button type="button" onClick={back}>
          Back
        </button>
        <button type="button" onClick={next}>
          Next
        </button>
      </div>
    </>
  );
}

function PreviewDataStep({ back, submit }) {
  return (
    <>
      <h1>Step 3 - Preview Data</h1>
      <div className="add-new-employee__form__buttons">
        <button type="button" onClick={back}>
          Back
        </button>
        <button type="submit">Apply</button>
      </div>
    </>
  );
}
