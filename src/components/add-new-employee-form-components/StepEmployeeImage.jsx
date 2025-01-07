import React, { useState } from "react";
import Icons from "../../ui/Icons";

function StepEmployeeImage({ methods, defaultBase64 = "" }) {
  const [base64Image, setBase64Image] = useState(defaultBase64);

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

export default StepEmployeeImage;
