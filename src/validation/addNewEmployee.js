import * as z from "zod";

export const newEmployeeValidation = z.object({
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
