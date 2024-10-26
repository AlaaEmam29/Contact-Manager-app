import { TextField } from '@mui/material'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
}

const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <TextField
      label='Search Contacts'
      value={value}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
      variant='standard'
      margin='normal'
    />
  )
}

export default SearchInput
