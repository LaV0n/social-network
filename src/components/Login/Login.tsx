import React from "react";
import { requiredField} from "../../utils/validators/validators";
import {login} from "../../redux/AuthReducer";
import {Redirect} from "react-router-dom";
import styles from "./Login.module.css"
import {Button, Checkbox, TextField} from "@mui/material";
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../hoc/hook";

const LoginReduxForm = () => {

    const dispatch = useAppDispatch()
    const captchaURL = useAppSelector(state => state.auth.captchaURL)

    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',
            rememberMe: false,
            captchaURL: ''
        },
        validate: values => {
            requiredField(values.login)
            requiredField(values.password)
        },
        onSubmit: values => {
            dispatch(login(values.login, values.password, values.rememberMe, values.captchaURL))
        }
    })
    return (
        <form onSubmit={formik.handleSubmit} className={styles.loginForm}>
            <div>
                <TextField
                    className={styles.inputForm}
                    placeholder={"Login"}
                    {...formik.getFieldProps('login')}

                />
            </div>
            <div>
                <TextField
                    type={"password"}
                    className={styles.inputForm}
                    placeholder={"Password"}
                    {...formik.getFieldProps('password')}

                />
            </div>
            <div className={styles.checkboxBlock}>
                <Checkbox

                    {...formik.getFieldProps("rememberMe")}
                />
                <span className={styles.checkbox}>remember me</span>
            </div>
            {captchaURL &&
                <div className={styles.captchaBlock}>
                    <img src={captchaURL} alt={'0'}/>
                    <TextField
                        className={styles.inputForm}
                        {...formik.getFieldProps("captchaURL")}

                    />
                </div>}
            <div>
                <Button variant={'outlined'}
                        color="inherit"
                        size={'small'}
                        style={{color: 'white'}}
                        type={'submit'}
                >Login</Button>
            </div>
        </form>
    )
}


export const Login = () => {
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const error = useAppSelector(state => state.auth.error)


    if (isAuth) {
        return <Redirect to={'/profile/userId'}/>
    }

    return (
        <div className={styles.block}>
            <h1 style={{color: 'rgba(214, 223, 237, 0.67)'}}>LOGIN</h1>
            <LoginReduxForm/>
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>

    )
}

