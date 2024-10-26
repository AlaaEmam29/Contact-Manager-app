import parsePhoneNumber from 'libphonenumber-js'
import { z } from 'zod'
import { Title } from '@types'
import { titleOptionsType } from '@utils/constants'
const zPhoneNumber = z
  .string()
  .refine(
    (value) => {
      const phoneNumber = parsePhoneNumber(value, { defaultCountry: 'EG' })
      return phoneNumber?.isValid()
    },
    {
      message: 'Invalid phone number',
    },
  )
  .transform((value) => {
    const phoneNumber = parsePhoneNumber(value, { defaultCountry: 'EG' })
    return phoneNumber?.formatInternational()
  })

  const requiredSchema = z.object({
    title: z.enum(titleOptionsType, {
      errorMap: () => ({ message: 'Select a valid title' }),
    }),
    firstName: z.string().min(1, 'First name is required').max(50, 'First name is too long'),
    lastName: z.string().min(1, 'Last name is required').max(50, 'Last name is too long'),
    email: z.string().email('Invalid email format'),
    phone: zPhoneNumber,
    image: z.any().optional(),
    street: z.string().min(1, 'Street is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    country: z.string().min(1, 'Country is required'),
    postcode: z.string().min(1, 'Postcode is required'),
    number :z.string().optional()
  })
  
  const optionalSchema = z.object({
    title: z
      .enum(titleOptionsType)
      .optional()
      .transform((val) => val?.toLowerCase() as Title),
    firstName: z.string().max(50, 'First name is too long').optional(),
    lastName: z.string().max(50, 'Last name is too long').optional(),
    email: z.string().email('Invalid email format').optional(),
    phone: zPhoneNumber.optional(),
    image: z.any().optional(),
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    postcode: z.string().optional(),
    number :z.string().optional()

  })
  
export { requiredSchema, optionalSchema }
