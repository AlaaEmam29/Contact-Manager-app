import React, { useState } from 'react'
import { Tabs, Tab, Box } from '@mui/material'

interface LetterTabsProps {
  letters: string[]
  onLetterSelect: (letter: string) => void
}

const LetterTabs = ({ letters, onLetterSelect }: LetterTabsProps) => {
  const [selectedTab, setSelectedTab] = useState(0)

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue)
    onLetterSelect(letters[newValue])
  }

  return (
    <Box
      sx={{
        width: '100%',
        margin: '1rem auto',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'white',
        boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.1)',
        borderRadius: '5px',
        padding: '0.5rem',
      }}
    >
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        variant='scrollable'
        scrollButtons
        color='primary'
        allowScrollButtonsMobile
        aria-label='scrollable auto tabs'
      >
        {letters.map((letter, index) => (
          <Tab key={letter} label={letter} value={index} />
        ))}
      </Tabs>
    </Box>
  )
}

export default LetterTabs
