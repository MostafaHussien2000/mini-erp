import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import PopUp from "../ui/PopUp";
import Icons from "../ui/Icons";
import { Employees } from "../api/Employees";
import StepEmployeeInformation from "./add-new-employee-form-components/StepEmployeeInformation";
import StepEmployeeImage from "./add-new-employee-form-components/StepEmployeeImage";
import StepReviewData from "./add-new-employee-form-components/StepReviewData";
import FormStepIndicator from "./add-new-employee-form-components/FormStepIndicator";
import { newEmployeeValidation } from "../validation/addNewEmployee";

const fieldsForEachStep = [
  ["name", "startDate", "role", "email", "phone"],
  ["image", "base64"],
  ["activeStatus"],
];

const EmployeesInstance = new Employees();

function AddNewEmployeeForm({ close, setEmployees }) {
  const [step, setStep] = useState(0);

  const methods = useForm({
    mode: "onBlur",
    resolver: zodResolver(newEmployeeValidation),
  });

  const onSubmit = async (data) => {
    if (step !== 2) return;
    try {
      const response = await EmployeesInstance.addNewEmployee(data);

      setEmployees((current) => [...current, response]);

      return response;
    } catch (err) {
      console.error(err);
    } finally {
      close();
    }
  };

  const goBack = () => {
    setStep((current) => current - 1);
  };

  const goForward = async (e) => {
    e.preventDefault();

    const checker = await stepChecker(step);

    if (checker) setStep((current) => current + 1);
  };

  const stepChecker = async (step) => {
    const fieldsForCurrentStep = fieldsForEachStep[step];

    const isValid = await methods.trigger(fieldsForCurrentStep);

    return isValid;
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

      <FormStepIndicator current={step + 1} />

      <FormProvider {...methods}>
        <form
          className="add-new-employee__form"
          action="POST"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <FormView methods={methods} step={step} />
          <div className="add-new-employee__form__buttons">
            {step < 2 ? (
              <>
                <button type="button" onClick={goForward}>
                  Next
                </button>
              </>
            ) : (
              <>
                <button
                  type="submit"
                  className={methods.isSubmitting ? "submitting" : ""}
                >
                  Add Data
                </button>
              </>
            )}
            {step > 0 ? (
              <button type="button" onClick={goBack}>
                Back
              </button>
            ) : (
              <></>
            )}
          </div>
        </form>
      </FormProvider>
    </PopUp>
  );
}

export default AddNewEmployeeForm;

function FormView({ step, methods }) {
  return (
    <>
      <section
        style={{ display: step === 0 ? "block" : "none" }}
        className={`form-view ${step === 0 ? "inAction" : ""}`}
      >
        <StepEmployeeInformation methods={methods} />
      </section>
      <section
        style={{ display: step === 1 ? "block" : "none" }}
        className={`form-view ${step === 1 ? "inAction" : ""}`}
      >
        <StepEmployeeImage methods={methods} />
      </section>
      <section
        style={{ display: step === 2 ? "block" : "none" }}
        className={`form-view ${step === 3 ? "inAction" : ""}`}
      >
        <StepReviewData methods={methods} />
      </section>
    </>
  );
}
