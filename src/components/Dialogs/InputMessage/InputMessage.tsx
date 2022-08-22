import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxlengthCreator, requiredField} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";

export type FormDataMessageType ={
    inputMessage:string
  }

const maxLength100=  maxlengthCreator(100)

const InputMessageForm: React.FC<InjectedFormProps<FormDataMessageType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name="inputMessage"
                       placeholder={"Enter your message"}
                       component={Textarea}
                       validate={[requiredField,maxLength100]}
                />
            </div>
            <div>
                <button>add message</button>
            </div>
        </form>
    )
}

 export const InputMessageReduxForm =reduxForm<FormDataMessageType>({
    // a unique name for the form
    form: 'inputMessage'
})(InputMessageForm)

