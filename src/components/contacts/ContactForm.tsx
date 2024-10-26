import React, { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Grid, Typography, Avatar, Box, MenuItem, Select, FormControl } from '@mui/material'
import FormInputText from '@components/layout/FormInputText'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { Contact, Title } from '@types'
import { titleOptions } from '@utils/constants'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@stores/store'
import { editContact, addContact } from '@stores/slices/contactsSlice'
import { optionalSchema, requiredSchema } from '@schema/contact'

interface ContactFormProps {
  contactToEdit?: Contact
}

const ContactForm = ({ contactToEdit }: ContactFormProps) => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const schema = contactToEdit ? optionalSchema : requiredSchema
  type ContactFormData = z.infer<typeof schema>

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: contactToEdit?.name.first || '',
      lastName: contactToEdit?.name.last || '',
      email: contactToEdit?.email || '',
      phone: contactToEdit?.phone || '',
      title: (contactToEdit?.name.title?.toLowerCase() || titleOptions[0]) as Title,
      street: contactToEdit?.location?.street.name || '',
      city: contactToEdit?.location?.city || '',
      state: contactToEdit?.location?.state || '',
      country: contactToEdit?.location?.country || '',
      postcode: String(contactToEdit?.location?.postcode) || '',
    },
    mode: 'all',
  })

  const imageFile = watch('image')

  useEffect(() => {
    if (contactToEdit) {
      setValue('title', contactToEdit?.name.title.toLowerCase() as Title)
      setValue('firstName', contactToEdit.name.first)
      setValue('lastName', contactToEdit.name.last)
      setValue('email', contactToEdit.email)
      setValue('phone', contactToEdit.phone)
      setValue('image', contactToEdit.picture.large)
      setValue('street', contactToEdit.location?.street.name)
      setValue('city', contactToEdit.location?.city)
      setValue('state', contactToEdit.location?.state)
      setValue('country', contactToEdit.location?.country)
      setValue('postcode', String(contactToEdit?.location?.postcode))
      setValue('number', String(contactToEdit.location?.street?.number))

    }
  }, [contactToEdit, setValue])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setValue('image', e.target.files[0])
    }
  }

  const removeImage = () => {
    setValue('image', null)
  }

  const onSubmit = async (data: ContactFormData) => {
    const contact: Contact = {
      name: {
        title: data.title!,
        first: data.firstName!,
        last: data.lastName!,
      },
      email: data.email!,
      phone: data.phone!,
      picture: {
        large: imageFile
          ? imageFile instanceof File
            ? URL.createObjectURL(imageFile)
            : imageFile
          : 'https://via.placeholder.com/150',
        medium: '',
        thumbnail: '',
      },
      location: {
        street: {
          number: data.number!,
          name: data.street!,
        },
        city: data.city!,
        state: data.state!,
        country: data.country!,
        postcode: data?.postcode !
      },
      login: { uuid: contactToEdit?.login.uuid || uuidv4(), username: '' },
    }

    if (contactToEdit) {
      dispatch(editContact(contact))
    } else {
      dispatch(addContact(contact))
    }
    navigate('/')
  }

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant='h4' gutterBottom>
          {contactToEdit ? 'Edit Contact' : 'Add Contact'}
        </Typography>
        <Box display='flex' flexDirection='column' alignItems='center' mt={3}>
          <input
            type='file'
            accept='image/*'
            hidden
            onChange={handleImageChange}
            id='avatar-upload'
          />
          <label htmlFor='avatar-upload'>
            {imageFile ? (
              <Avatar
                src={
                  imageFile
                    ? imageFile instanceof File
                      ? URL.createObjectURL(imageFile)
                      : imageFile
                    : contactToEdit?.picture.large
                }
                sx={{ width: 150, height: 150, cursor: 'pointer', border: '2px solid #ccc' }}
                alt='Selected Contact'
              />
            ) : (
              <Box
                sx={{
                  width: 150,
                  height: 150,
                  cursor: 'pointer',
                  border: '2px solid #ccc',
                  display: 'flex',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  alignItems: 'center',
                }}
              >
                <Typography variant='h5'>Upload Image</Typography>
              </Box>
            )}
          </label>
          {(contactToEdit?.picture.large || imageFile) && (
            <Button variant='contained' color='error' onClick={removeImage}>
              Remove Image
            </Button>
          )}
        </Box>
        <Grid container spacing={2} mt={4}>
           <Grid item xs={12} sm={4} md={2}>
            <FormControl fullWidth>
              <Controller
                name='title'
                control={control}
                render={({ field }) => (
                  <Select {...field} fullWidth error={!!errors.title}>
                    {titleOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.title && <Typography color='error'>{errors.title.message}</Typography>}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} md={5}>
            <FormInputText name='firstName' control={control} label='First Name' />
          </Grid>
          <Grid item xs={12} sm={4} md={5}>
            <FormInputText name='lastName' control={control} label='Last Name' />
          </Grid>
          <Grid item xs={12}>
            <FormInputText name='email' control={control} label='Email' />
          </Grid>
          <Grid item xs={12}>
            <FormInputText name='phone' control={control} label='Phone Number' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInputText name='number' control={control} label='Street Number' />
          </Grid>
           <Grid item xs={12} sm={6}>
            <FormInputText name='street' control={control} label='Street Name' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInputText name='city' control={control} label='City' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInputText name='state' control={control} label='State' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInputText name='country' control={control} label='Country' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInputText name='postcode' control={control} label='Postcode' />
          </Grid>

          <Grid item xs={12}>
            <Button type='submit' variant='contained' color='info' disabled={!isValid}>
              {contactToEdit ? 'Update Contact' : 'Add Contact'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default ContactForm
