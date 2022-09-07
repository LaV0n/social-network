import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../../common/FormsControls/FormsControls";
import {maxlengthCreator, requiredField} from "../../../../utils/validators/validators";
import { Button } from "@mui/material";

export type FormDataType ={
    postInput:string
}

const maxLength10=  maxlengthCreator(10)

const PostInputForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name="postInput"
                       placeholder={"Enter your message"}
                       component={Textarea}
                       validate={[requiredField,maxLength10]}
                />
            </div>
            <div>
                <Button variant="outlined"
                        onClick={props.handleSubmit}
                        color="inherit"
                        style={{color:'white'}}
                    >post</Button>
            </div>
        </form>
    )
}

export const PostInputReduxForm =reduxForm<FormDataType>({
    // a unique name for the form
    form: 'postInput'
})(PostInputForm)

