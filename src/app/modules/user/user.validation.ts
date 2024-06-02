import { z } from 'zod'
const userValidationSchema = z.object({
  //   id: z.string(), as it will be generated at the back -end
  password: z
    .string({ invalid_type_error: 'Password must be string' })
    .max(20, { message: 'Password can not be more than 20 characters' })
    .optional(),
})

export default uservalidation = {
  userValidationSchema,
}
