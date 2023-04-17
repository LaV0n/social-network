import React from 'react'
import { Button, TextField } from '@mui/material'
import classes from './PostInput.module.css'
import { useFormik } from 'formik'
import { useAppDispatch } from '../../../../redux/store'
import { addPost } from '../../../../redux/ProfileReducer'
import { requiredMaxLengthField } from '../../../../utils/validators/validators'

export const PostInput = () => {
   const dispatch = useAppDispatch()

   const formik = useFormik({
      initialValues: {
         post: '',
      },
      validate: values => requiredMaxLengthField({ values, maxLength: 10 }),
      onSubmit: (values, { resetForm }) => {
         dispatch(addPost(values.post))
         resetForm({ values: { post: '' } })
      },
   })

   return (
      <form onSubmit={formik.handleSubmit} className={classes.inputBlock}>
         <div>
            <TextField
               placeholder={'Enter your message'}
               {...formik.getFieldProps('post')}
               error={!!formik.errors.post}
            />
            {formik.errors.post && <div className={classes.errorMessage}>{formik.errors.post}</div>}
         </div>
         <div>
            <Button variant="outlined" color="inherit" style={{ color: 'white' }} type={'submit'}>
               post
            </Button>
         </div>
      </form>
   )
}
