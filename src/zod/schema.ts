import { z } from "zod";

const UserSignUpSchema = z.object({
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  email: z.string().email(),
  phone: z
    .string()
    .regex(/^\d{10}$/, { message: "Phone number must be exactly 10 digits" })
    .refine((data) => !isNaN(parseInt(data)), {
      message: "Phone number must be a valid number",
    }),
});

const UserLoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "password cannot be less than 8 digits" })
    .max(12, { message: "password cannot be more than 12 digits" }),
});

const FileUploadSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(30, "Title is too long, expected 30 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(120, "Description is too long, expected 120 characters"),
});

const bioSchema = z.object({
  bio: z
    .string()
    .min(1, "bio is required")
    .max(500, "bio is too long, expected 500 characters"),
});

type bioType = z.infer<typeof bioSchema>;

type FileUploadSchemaType = z.infer<typeof FileUploadSchema>;

type UserLoginType = z.infer<typeof UserLoginSchema>;

type UserSignUpType = z.infer<typeof UserSignUpSchema>;
export type { UserSignUpType, UserLoginType, FileUploadSchemaType, bioType };
export { UserSignUpSchema, UserLoginSchema, FileUploadSchema, bioSchema };
