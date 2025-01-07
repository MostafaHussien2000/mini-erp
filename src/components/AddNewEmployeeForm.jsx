import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import * as z from "zod";
import PopUp from "../ui/PopUp";
import Icons from "../ui/Icons";
import SwitchButton from "../ui/SwitchButton";
import { Employees } from "../api/Employees";

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

const fieldsForEachStep = [
  ["name", "startDate", "role", "email", "phone"],
  ["image", "base64"],
  ["activeStatus"],
];

const validationSchema = z.object({
  name: z
    .string()
    .nonempty("Employee name is required.")
    .min(3, "Names can not be less than 3 characters."),
  startDate: z.string().nonempty("Date can not be empty."),
  role: z.string().nonempty("Please select a role."),
  email: z
    .string()
    .nonempty("Email is required.")
    .email("Please provide a valid email."),
  phone: z.string().regex(/^\d{11}$/i, "Phone number must be 11 digits."),
  image: z
    .instanceof(FileList)
    .refine(
      (files) => files?.length === 1,
      "You need to upload one image file."
    )
    .refine(
      (files) => files && files[0]?.type.startsWith("image/"),
      "File must be an image."
    ),
  base64: z.string().nonempty(),
  activeStatus: z.boolean({ required_error: "Activation status is required" }),
});

const EmployeesInstance = new Employees();

function AddNewEmployeeForm({ close }) {
  const [step, setStep] = useState(0);

  const methods = useForm({
    mode: "onBlur",
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    if (step !== 2) return;
    try {
      const response = await EmployeesInstance.addNewEmployee(data);

      if (!response.ok) throw new Error("Failed to add the employee.");

      const resData = await response.json();

      console.log(resData);
    } catch (err) {
      console.error(err);
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

      <FormStepIndicator steps={formSteps} current={step + 1} />

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
        <StepOne methods={methods} />
      </section>
      <section
        style={{ display: step === 1 ? "block" : "none" }}
        className={`form-view ${step === 1 ? "inAction" : ""}`}
      >
        <StepTwo methods={methods} />
      </section>
      <section
        style={{ display: step === 2 ? "block" : "none" }}
        className={`form-view ${step === 3 ? "inAction" : ""}`}
      >
        <ReviewEmployeeDetails methods={methods} />
      </section>
    </>
  );
}

function StepOne({ methods }) {
  return (
    <>
      <div className="add-new-employee__form__input-container">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" {...methods.register("name")} />
        {methods.formState.errors.name?.message && (
          <p>{methods.formState.errors.name?.message}</p>
        )}
      </div>

      <div className="add-new-employee__form__input-container">
        <label htmlFor="startDate">Start Date</label>
        <input
          type="date"
          name="startDate"
          {...methods.register("startDate")}
        />
        {methods.formState.errors.startDate?.message && (
          <p>{methods.formState.errors.startDate?.message}</p>
        )}
      </div>

      <div className="add-new-employee__form__input-container">
        <label htmlFor="role">Role</label>
        <select
          defaultValue={""}
          name="role"
          id="role"
          {...methods.register("role")}
        >
          <option disabled value="">
            Select Role
          </option>
          <option value="IT">IT</option>
          <option value="Software">Software</option>
          <option value="Data Entry">Data Entry</option>
        </select>
        {methods.formState.errors.role?.message && (
          <p>{methods.formState.errors.role?.message}</p>
        )}
      </div>

      <div className="add-new-employee__form__input-container">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" {...methods.register("email")} />
        {methods.formState.errors.email?.message && (
          <p>{methods.formState.errors.email?.message}</p>
        )}
      </div>

      <div className="add-new-employee__form__input-container">
        <label htmlFor="phone">Phone</label>
        <input type="text" name="phone" {...methods.register("phone")} />
        {methods.formState.errors.phone?.message && (
          <p>{methods.formState.errors.phone?.message}</p>
        )}
      </div>
    </>
  );
}

function StepTwo({ methods }) {
  const [base64Image, setBase64Image] = useState("");

  const handleImageRemove = () => {
    methods.resetField("image");
    methods.resetField("base64");

    setBase64Image("");
  };

  return (
    <section>
      <label>Upload Image</label>
      {base64Image.length === 0 ? (
        <div className={"add-new-employee__form__input-container image-upload"}>
          <div>
            <Icons.ImagePlus />
            <label htmlFor="image-upload-input">
              <Icons.Plus /> Upload Image
            </label>
          </div>

          {methods.formState.errors.image?.message && (
            <p>{methods.formState.errors.image?.message}</p>
          )}
        </div>
      ) : (
        <div className="add-new-employee__form__input-container image-preview">
          <div>
            <img
              onClick={() => setBase64Image("")}
              src={base64Image}
              className="image-preview"
            />
            <div className="add-new-employee__form__input-container image-preview__info">
              <h3>{methods.watch().image[0].name}</h3>
              <div className="add-new-employee__form__input-container image-preview__info__actions">
                <label
                  htmlFor="image-upload-input"
                  className="add-new-employee__form__input-container image-preview__info__actions__button"
                >
                  <Icons.Replace />
                  Change
                </label>
                <button
                  onClick={handleImageRemove}
                  className="add-new-employee__form__input-container image-preview__info__actions__button"
                >
                  <Icons.Trash />
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <input
        style={{ display: "none" }}
        type="file"
        id="image-upload-input"
        accept=".png, .jpg, .jpeg"
        {...methods.register("image")}
        onChange={async (e) => {
          await methods.register("image").onChange(e);
          const file = e.target.files[0];

          if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();

            reader.onload = () => {
              setBase64Image(reader.result);
              methods.setValue("base64", reader.result);
            };

            reader.readAsDataURL(file);
          }
        }}
      />
    </section>
  );
}

function ReviewEmployeeDetails({ methods }) {
  return (
    <section>
      <div className="preview-section">
        <h2>Summary</h2>
        <table>
          <tbody>
            <tr>
              <td className="field-name">Employee</td>
              <td className="with-image">
                <img src={methods.watch().base64} alt={methods.watch().name} />
                <span>{methods.watch().name}</span>
              </td>
            </tr>
            <tr>
              <td className="field-name">Role</td>
              <td>{methods.watch().role}</td>
            </tr>
            <tr>
              <td className="field-name">E-Mail</td>
              <td>{methods.watch().email}</td>
            </tr>
            <tr>
              <td className="field-name">Phone</td>
              <td>{methods.watch().phone}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="preview-section double">
        <div className="preview-section">
          <h2>Date</h2>
          <table>
            <tbody>
              <tr>
                <td className="field-name">Start Date</td>
                <td>{methods.watch().startDate}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="preview-section">
          <h2>Active</h2>
          <table>
            <tbody>
              <tr>
                <td className="field-name">Active Status</td>
                <td>
                  <SwitchButton
                    inputName={"activeStatus"}
                    extra={methods.register("activeStatus")}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function FormStepIndicator({ steps, current }) {
  return (
    <ul className="add-new-employee__stepper">
      {steps.map((step, idx) => (
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
          {idx < steps.length - 1 ? (
            <li className="add-new-employee__stepper__road">
              <hr />
            </li>
          ) : null}
        </React.Fragment>
      ))}
    </ul>
  );
}
