import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxlengthCreator, requiredField} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";
import {Button} from "@mui/material";
import styles from './InputMessage.module.css'

export type FormDataMessageType = {
    inputMessage: string
}

const maxLength100 = maxlengthCreator(100)

const InputMessageForm: React.FC<InjectedFormProps<FormDataMessageType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={styles.form}>
            <Field name="inputMessage"
                   placeholder={"Enter your message"}
                   component={Textarea}
                   validate={[requiredField, maxLength100]}
            />
            <Button variant="outlined"
                    color="inherit"
                    onClick={props.handleSubmit}
                    style={{marginLeft:'20px'}}
            >add message</Button>
        </form>
    )
}

export const InputMessageReduxForm = reduxForm<FormDataMessageType>({
    // a unique name for the form
    form: 'inputMessage'
})(InputMessageForm)

