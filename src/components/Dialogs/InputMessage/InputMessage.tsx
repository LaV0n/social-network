import React from 'react'
import { requiredMaxLengthField } from '../../../utils/validators/validators'
import { Button, TextField } from '@mui/material'
import styles from './InputMessage.module.css'
import { useFormik } from 'formik'

export type FormDataMessageType = {
   addMessage: (message: string) => void
}
export const InputMessageForm = ({ addMessage }: FormDataMessageType) => {
   const formik = useFormik({
      initialValues: {
         message: '',
      },
      validate: values => requiredMaxLengthField({ values, maxLength: 100 }),
      onSubmit: (values, { resetForm }) => {
         addMessage(values.message)
         resetForm({ values: { message: '' } })
      },
   })
   return (
      <form onSubmit={formik.handleSubmit} className={styles.form}>
         <TextField
            sx={{ width: '100%', input: { color: 'white' } }}
            placeholder={'Enter your message'}
            {...formik.getFieldProps('message')}
            error={!!formik.errors.message}
         />
         <Button variant="outlined" color="inherit" type={'submit'} style={{ marginLeft: '20px' }}>
            add message
         </Button>
      </form>
   )
}
