import React from "react";

function StepEmployeeInformation({ methods }) {
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

export default StepEmployeeInformation;
