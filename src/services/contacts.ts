import { createAsyncThunk } from '@reduxjs/toolkit'
import API from '@services/api'
import { RESULTPERPAGE } from '@utils/constants'

const fetchContacts = createAsyncThunk('contacts/fetchContacts', async (_, thunkAPI) => {
  try {
    const response = await API(
      `?seed=abc&results=${RESULTPERPAGE}&inc=name,picture,phone,email,login,location`, {
        signal: thunkAPI.signal,
      }
    )
    return response.data.results
  } catch (error: any) {
    console.log('Failed to fetch contacts', error.response?.data || error.message)
    return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch contacts')
  }
})

export { fetchContacts }
