import React from 'react';
import * as yup from 'yup';
import {useFormik} from 'formik';
import {Button, Grid, TextField} from "@mui/material"

const validationSchema = yup.object({
    username: yup
        .string()
        .required('Username is required'),
    password1: yup
        .string()
        .required('Password is required'),
    password2: yup
        .string()
        .required('Password is required')
        .oneOf([yup.ref('password1'), null], 'Passwords must match')
});

const SignUpForm = (props: { onSuccess: () => void }) => {
    const formik = useFormik({
        initialValues: {
            username: '',
            password1: '',
            password2: '',
        },
        validationSchema,
        onSubmit: async (values: { username: any; password1: any; }) => {
            await new Promise((r) => setTimeout(r, 500));
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    "username": values.username,
                    "password": values.password1
                })
            };
            fetch('http://cs431-02.cs.rutgers.edu:8080/login/save', requestOptions)
                .then(async response => {
                    const validJSON = response.headers.get('content-type')?.includes('application/json');
                    const data = validJSON && await response.json();
                    if (!response.ok) {
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }
                    if (response.status === 200) {
                        props.onSuccess();
                    } else if (response.status === 409) {
                        alert("Account Already Exists!")
                    } else {
                        alert("Account Creation Failed")
                    }
                })
                .catch(error => {
                    console.error('There was an error!', error);
                    alert("Account Creation Failed")
                });
        }
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Grid
                    container
                    direction={"row"}
                    spacing={2}
                    justifyContent={"center"}
                >
                    <Grid item xs={12}>
                        <TextField fullWidth label="Username" name="username" onChange={formik.handleChange}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Password" type="password" name="password1" onChange={formik.handleChange}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Confirm Password" type="password" name="password2" onChange={formik.handleChange}/>
                    </Grid>
                    <Grid item>
                        <Button type="submit" variant="contained" color="primary">Sign Up</Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
};

export default SignUpForm;