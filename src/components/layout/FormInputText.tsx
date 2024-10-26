import { Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'
interface FormInputProps {
  name: string
  control: any
  label: string
}

const FormInputText = ({ name, control, label }: FormInputProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <TextField
        label={label}
        fullWidth
        variant='outlined'
        size='small'
        value={value}
        onChange={onChange}
        error={!!error}
        helperText={error ? error.message : ''}
      />
    )}
  />
)

export default FormInputText
