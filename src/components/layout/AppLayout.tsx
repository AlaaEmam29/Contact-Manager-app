import React from 'react'
import { AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material'
import { NavLink, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import SearchInput from './SearchInput'
import { setSearchQuery } from '@stores/slices/contactsSlice'

interface AppLayoutProps {
  children: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const searchQuery = useSelector((state: any) => state.contacts.searchQuery)

  const handleSearchChange = (value: string) => {
    dispatch(setSearchQuery(value))
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        justifyContent: 'space-between',
      }}
    >
      <AppBar
        position='static'
        sx={{ bgcolor: 'white', boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.1)' }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: { xs: '0.5rem', md: '1rem' },
          }}
        >
          <Typography variant='h6' component={'div'} color='primary'>
            Contact Manager
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: { xs: '0rem', md: '1rem' },
            }}
          >
            <NavLink to='/'>
              <Button color='inherit'>Home</Button>
            </NavLink>
            <NavLink to='/about'>
              <Button color='inherit'>About</Button>
            </NavLink>
          </Box>

          {location.pathname === '/' && (
            <Box
              sx={{
                width: { xs: '20rem', md: '30rem' },
              }}
            >
              <SearchInput value={searchQuery} onChange={handleSearchChange} />
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth='xl' sx={{ margin: '2rem auto' }}>
        {children}
      </Container>

      <Box
        component='footer'
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          color: 'primary.main',
          bgColor: 'white',
          textAlign: 'center',
        }}
      >
        <Typography variant='subtitle1'>
          © {new Date().getFullYear()} Contact Manager - Built with love
        </Typography>
      </Box>
    </Box>
  )
}

export default AppLayout
