import {z} from 'zod' ;
export const memoryschema = z.object({
  title: z
    .string()
    .min(3, { message: "title must be atleast 3 characters long" })
    .max(50, { message: "title must be less than 50 characters" }),
  description: z
    .string()
    .min(10, { message: "description must be atleast 10 characters long" })
    .max(250, { message: "title must be less than 250 characters" }),
  link: z.string(),
  type: z.enum(["video", "tweet", "link"], {
    message: "select from video || tweet || link",
  }),
  tags: z
    .string()
    .min(3, { message: "add atleast one tag" })
    .max(100, { message: "max tags " }),
});
export type FormFields = z.infer<typeof memoryschema>;