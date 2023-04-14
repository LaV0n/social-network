import React, { useEffect, useState } from 'react'
import { Alert, Snackbar } from '@mui/material'
import { useAppSelector } from '../../redux/redux-store'

export const ErrorBlock = () => {
   const errorMessage = useAppSelector(state => state.auth.error)
   const [open, setOpen] = useState(!!errorMessage)

   const onCloseHandler = () => {
      setOpen(false)
   }
   useEffect(() => {
      setOpen(!!errorMessage)
   }, [errorMessage])

   return (
      <Snackbar open={open} autoHideDuration={5000} onClose={onCloseHandler} sx={{ width: '100%' }}>
         <Alert
            variant="filled"
            severity={'error'}
            style={{ position: 'absolute', bottom: 0 }}
            onClose={onCloseHandler}
         >
            {errorMessage}
         </Alert>
      </Snackbar>
   )
}
