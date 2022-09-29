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
                       fullName: 'Full name is required'
                   }
            }
            if (!values.aboutMe) {
                return {
                    aboutMe: 'About Me is required'
                }
            }
            if (!values.lookingForAJobDescription) {
                return {
                    lookingForAJobDescription: 'Description is required'
                }
            }
        },
        initialValues: {
            fullName: '',
            lookingForAJob: false,
            lookingForAJobDescription: '',
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
                            label={'Full Name'}
                            inputProps={{ style: { color: "var(--textMainColor)" } }}
                            {...formik.getFieldProps('fullName')}
                        />
                        {formik.errors.fullName ? <div style={{color:'var(--textErrorColor)'}}>{formik.errors.fullName}</div> : null}
                        <TextField
                            label={'About Me'}
                            inputProps={{ style: { color: "var(--textMainColor)" } }}
                            margin={'normal'}
                            {...formik.getFieldProps('aboutMe')}
                        />
                        {formik.errors.aboutMe ? <div style={{color:'var(--textErrorColor)'}}>{formik.errors.aboutMe}</div> : null}
                        <TextField
                            label={'Job Description'}
                            inputProps={{ style: { color: "var(--textMainColor)" } }}
                            margin={'normal'}
                            {...formik.getFieldProps('lookingForAJobDescription')}
                        />
                        {formik.errors.lookingForAJobDescription ? <div style={{color:'var(--textErrorColor)'}}>{formik.errors.lookingForAJobDescription}</div> : null}
                        <FormControlLabel
                            label={'Are you looking for a job'}
                            control={<Checkbox
                                inputProps={{ style: { color: "var(--textMainColor)" } }}
                                {...formik.getFieldProps("lookingForAJob")}
                                checked={formik.values.lookingForAJob}
                            />}
                        />
                        <TextField
                            label={'github'}
                            inputProps={{ style: { color: "var(--textMainColor)" } }}
                            margin={'normal'}
                            {...formik.getFieldProps('github')}
                        />
                        <TextField
                            label={'vk'}
                            inputProps={{ style: { color: "var(--textMainColor)" } }}
                            margin={'normal'}
                            {...formik.getFieldProps('vk')}
                        />
                        <TextField
                            label={'facebook'}
                            inputProps={{ style: { color: "var(--textMainColor)" } }}
                            margin={'normal'}
                            {...formik.getFieldProps('facebook')}
                        />
                        <TextField
                            label={'instagram'}
                            inputProps={{ style: { color: "var(--textMainColor)" } }}
                            margin={'normal'}
                            {...formik.getFieldProps('instagram')}
                        />
                        <TextField
                            label={'twitter'}
                            inputProps={{ style: { color: "var(--textMainColor)" } }}
                            margin={'normal'}
                            {...formik.getFieldProps('twitter')}
                        />
                        <TextField
                            label={'website'}
                            inputProps={{ style: { color: "var(--textMainColor)" } }}
                            margin={'normal'}
                            {...formik.getFieldProps('website')}
                        />
                        <TextField
                            label={'youtube'}
                            inputProps={{ style: { color: "var(--textMainColor)" } }}
                            margin={'normal'}
                            {...formik.getFieldProps('youtube')}
                        />
                        <TextField
                            label={'mainLink'}
                            inputProps={{ style: { color: "var(--textMainColor)" } }}
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