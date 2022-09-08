import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {maxlengthCreator, requiredField} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/AuthReducer";
import {Redirect} from "react-router-dom";
import {storeType} from "../../redux/redux-store";
import styles from "./Login.module.css"


type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
    error: string | null
}

const maxlength30 = maxlengthCreator(30)


const LoginForm: React.FC<InjectedFormProps<FormDataType>> = ({handleSubmit,error}) => {
    console.log(error)
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field name="login"
                       placeholder={"Login"}
                       component={Input}
                       validate={[requiredField, maxlength30]}
                />
            </div>
            <div>
                <Field name="password"
                       type={"password"}
                       placeholder={"Password"}
                       component={Input}
                       validate={[requiredField, maxlength30]}
                />
            </div>
            <div>
                <Field name="rememberMe"
                       type={"checkbox"}
                       component={Input}
                /> remember me
            </div>
            <div>
                <button>Login</button>
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
    error:null | string
   }

const Login = (props: LoginPropsType) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.login, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile/:userId'}/>
    }

    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
            {props.error && <div className={styles.errorMessage}>{props.error}</div> }
        </div>

    )
}

const mapStateToProps = (state: storeType) => ({
    isAuth: state.auth.isAuth,
    error: state.auth.error
})

export default connect(mapStateToProps, {login})(Login)