import {useFormik} from "formik";
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField} from "@mui/material";
import {updateProfileData} from "../../../redux/ProfileReducer";
import { useAppDispatch } from "../../../hoc/hook";
import style from "./ProfileInfoForm.module.css"


export const ProfileInfoForm = () => {

    const dispatch=useAppDispatch();

    const formik = useFormik({
        validate: (values) => {
            if (!values.fullName) {
                return {
                    fullname: 'fullname is required'
                }
            }
            if (!values.aboutMe) {
                return {
                    aboutMe: 'aboutMe is required'
                }
            }
            if (!values.lookingForAJobDescription) {
                return {
                    lookingForAJobDescription: 'lookingForAJobDescription is required'
                }
            }
        },
        initialValues: {
            lookingForAJob: false,
            lookingForAJobDescription: '',
            fullName: '',
            aboutMe:'',
            github: '',
            vk: '',
            facebook: '',
            instagram: '',
            twitter: '',
            website: '',
            youtube: '',
            mainLink: '',
        },
        onSubmit: values => {
            dispatch(updateProfileData(values));
        },
    })
    return (
        <div >
            <form onSubmit={formik.handleSubmit} className={style.container}>
                <FormControl>
                    <FormLabel className={style.title}>
                      Personal Information
                    </FormLabel>
                    <FormGroup className={style.inputBlock}>
                        <TextField
                            label={'Fullname'}
                            {...formik.getFieldProps('fullName')}
                        />
                        {formik.errors.fullName ? <div style={{color:'red'}}>{formik.errors.fullName}</div> : null}
                        <TextField
                            label={'aboutMe'}
                            margin={'normal'}
                            {...formik.getFieldProps('aboutMe')}
                        />
                        {formik.errors.aboutMe ? <div style={{color:'red'}}>{formik.errors.aboutMe}</div> : null}
                        <TextField
                            label={'lookingForAJobDescription'}
                            margin={'normal'}
                            {...formik.getFieldProps('lookingForAJobDescription')}
                        />
                        {formik.errors.lookingForAJobDescription ? <div style={{color:'red'}}>{formik.errors.lookingForAJobDescription}</div> : null}
                        <FormControlLabel
                            label={'lookingForAJob'}
                            control={<Checkbox
                                {...formik.getFieldProps("lookingForAJob")}
                                checked={formik.values.lookingForAJob}
                            />}
                        />
                        <TextField
                            label={'github'}
                            margin={'normal'}
                            {...formik.getFieldProps('github')}
                        />
                        <TextField
                            label={'vk'}
                            margin={'normal'}
                            {...formik.getFieldProps('vk')}
                        />
                        <TextField
                            label={'facebook'}
                            margin={'normal'}
                            {...formik.getFieldProps('facebook')}
                        />
                        <TextField
                            label={'instagram'}
                            margin={'normal'}
                            {...formik.getFieldProps('instagram')}
                        />
                        <TextField
                            label={'twitter'}
                            margin={'normal'}
                            {...formik.getFieldProps('twitter')}
                        />
                        <TextField
                            label={'website'}
                            margin={'normal'}
                            {...formik.getFieldProps('website')}
                        />
                        <TextField
                            label={'youtube'}
                            margin={'normal'}
                            {...formik.getFieldProps('youtube')}
                        />
                        <TextField
                            label={'mainLink'}
                            margin={'normal'}
                            {...formik.getFieldProps('mainLink')}
                        />
                        <Button type={'submit'}
                                variant="outlined"
                                color="inherit"
                                style={{color:'white'}}>
                            SAVE</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </div>
    )
}