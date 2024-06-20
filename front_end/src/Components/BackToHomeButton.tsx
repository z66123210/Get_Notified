import { Button } from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import React from 'react'

function BackToHomeButton() {

  return (
    <Button
    startIcon={<ArrowBackRoundedIcon />}
    component="a"
    href="/"
    sx={{ ml: '-8px', mt: '12px' }}
  >
    Back to Home
  </Button>
  )
}

export default BackToHomeButton