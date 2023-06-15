import React from 'react'
import { login } from '../../redux/AuthReducer'
import { Redirect } from 'react-router-dom'
import styles from './Login.module.css'
import { Button, Checkbox, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { requiredMaxLengthField } from '../../utils/validators/validators'

const LoginReduxForm = () => {
   const dispatch = useAppDispatch()
   const captchaURL = useAppSelector(state => state.auth.captchaURL)

   const formik = useFormik({
      initialValues: {
         email: '',
         password: '',
         rememberMe: false,
         captcha: '',
      },
      validate: values =>
         requiredMaxLengthField({
            values: { email: values.email, password: values.password },
            maxLength: 30,
         }),
      onSubmit: values => {
         dispatch(login(values))
      },
   })

   const testUserLogin = () => {
      const values = {
         email: 'free@samuraijs.com',
         password: 'free',
         rememberMe: false,
         captcha: '',
      }

      dispatch(login(values))
   }

   return (
      <form onSubmit={formik.handleSubmit} className={styles.loginForm}>
         <div>
            <TextField
               error={!!formik.errors.email}
               className={styles.inputForm}
               placeholder={'Email'}
               {...formik.getFieldProps('email')}
            />
            {formik.errors.email && (
               <div className={styles.errorMessage}>{formik.errors.email}</div>
            )}
         </div>
         <div>
            <TextField
               error={!!formik.errors.password}
               type={'password'}
               className={styles.inputForm}
               placeholder={'Password'}
               {...formik.getFieldProps('password')}
            />
            {formik.errors.password && (
               <div className={styles.errorMessage}>{formik.errors.password}</div>
            )}
         </div>
         <div className={styles.checkboxBlock}>
            <Checkbox {...formik.getFieldProps('rememberMe')} />
            <span className={styles.checkbox}>remember me</span>
         </div>
         {captchaURL && (
            <div className={styles.captchaBlock}>
               <img src={captchaURL} alt={'0'} />
               <TextField className={styles.inputForm} {...formik.getFieldProps('captcha')} />
            </div>
         )}
         <Button
            variant={'outlined'}
            color="inherit"
            size={'small'}
            style={{ color: 'white' }}
            type={'submit'}
         >
            Login
         </Button>
         <Button
            variant={'outlined'}
            color="info"
            size={'small'}
            onClick={testUserLogin}
            style={{ color: 'rgba(214, 223, 237, 0.67)' }}
         >
            test user
         </Button>
      </form>
   )
}

export const Login = () => {
   const isAuth = useAppSelector(state => state.auth.isAuth)

   if (isAuth) {
      return <Redirect to={'/profile/userId'} />
   }

   return (
      <div className={styles.block}>
         <h1 style={{ color: 'rgba(214, 223, 237, 0.67)' }}>LOGIN</h1>
         <LoginReduxForm />
      </div>
   )
}
