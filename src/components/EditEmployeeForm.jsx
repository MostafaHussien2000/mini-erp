import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
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

const base64ToFile = (base64, fileName) => {
  const byteString = atob(base64.split(",")[1]); // Decode Base64 (after the comma)
  const mimeType = base64.match(/data:(.*?);base64/)[1]; // Extract MIME type

  const byteArray = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    byteArray[i] = byteString.charCodeAt(i);
  }

  return new File([byteArray], fileName, { type: mimeType });
};

const fileToFileList = (file) => {
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(file);
  return dataTransfer.files; // FileList
};

function EditEmployeeForm({ close, employee, setEmployee }) {
  const [step, setStep] = useState(0);
  const methods = useForm({
    mode: "onBlur",
    resolver: zodResolver(newEmployeeValidation),
    defaultValues: {
      ...employee,
      image: fileToFileList(base64ToFile(employee.image, "profile-image.png")),
      base64: employee.image,
    },
  });

  const onSubmit = async (data) => {
    if (step !== 2) return;
    try {
      const response = await EmployeesInstance.updateEmployee(
        employee.id,
        data
      );

      console.log(response);

      setEmployee(response);

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
          <FormView
            methods={methods}
            step={step}
            defaultBase64={employee.image}
          />
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

export default EditEmployeeForm;

function FormView({ step, methods, defaultBase64 }) {
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
        <StepEmployeeImage methods={methods} defaultBase64={defaultBase64} />
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
