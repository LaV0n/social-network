import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {maxlengthCreator, requiredField} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/AuthReducer";
import {Redirect} from "react-router-dom";
import {storeType} from "../../redux/redux-store";
import styles from "./Login.module.css"
import {Button} from "@mui/material";


type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
    error: string | null
}

const maxlength30 = maxlengthCreator(30)


const LoginForm: React.FC<InjectedFormProps<FormDataType>> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div>
                <Field name="login"
                       className={styles.inputForm}
                       placeholder={"Login"}
                       component={Input}
                       validate={[requiredField, maxlength30]}
                />
            </div>
            <div>
                <Field name="password"
                       type={"password"}
                       className={styles.inputForm}
                       placeholder={"Password"}
                       component={Input}
                       validate={[requiredField, maxlength30]}
                />
            </div>
            <div className={styles.checkboxBlock}>
                <Field name="rememberMe"
                       type={"checkbox"}
                       component={Input}
                />
                <span className={styles.checkbox}>remember me</span>
            </div>
            <div>
                <Button variant={'outlined'}
                        color="inherit"
                        size={'small'}
                        style={{color: 'white'}}
                        onClick={handleSubmit}
                >Login</Button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType>({
    form: 'login'
})(LoginForm)

type LoginPropsType = {
    login: (email: string, password: string, rememberMe: boolean) => void
    isAuth: boolean
    error: null | string
}

const Login = (props: LoginPropsType) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.login, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile/userId'}/>
    }

    return (
        <div className={styles.block}>
            <h1 style={{color: 'rgba(214, 223, 237, 0.67)'}}>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
            {props.error && <div className={styles.errorMessage}>{props.error}</div>}
        </div>

    )
}

const mapStateToProps = (state: storeType) => ({
    isAuth: state.auth.isAuth,
    error: state.auth.error
})

export default connect(mapStateToProps, {login})(Login)