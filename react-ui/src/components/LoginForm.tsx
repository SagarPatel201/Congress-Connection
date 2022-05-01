import React from 'react';
import * as yup from 'yup';
import {useFormik} from 'formik';
import {Button, Grid, TextField} from "@mui/material"

const validationSchema = yup.object({
    username: yup
        .string()
        .required('Username is required'),
    password: yup
        .string()
        .required('Password is required')
});

const LoginForm = (props: any) => {
    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            await new Promise((r) => setTimeout(r, 500));
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "username" : values.username,
                    "password" : values.password
                })
            };
            console.log(values.username)
            console.log(values.password)
            fetch('http://cs431-02.cs.rutgers.edu:8080/login/authenticate', requestOptions)
                .then(async response => {
                    const validJSON = response.headers.get('content-type')?.includes('application/json');
                    const data = validJSON && await response.json();
                    if (!response.ok) {
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }
                    if(response.status === 200){
                        localStorage.setItem('JWT', data['jwt'])
                        localStorage.setItem('ID', data['id'])
                        window.location.reload();
                        props.onSuccess();
                    }else{
                        alert("Invalid Login")
                    }
                })
                .catch(error => {
                    console.error('There was an error!', error);
                    alert("Invalid Login")
                });

        }});

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
                        <TextField
                            fullWidth
                            label="Username"
                            name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            error={formik.touched.username && Boolean(formik.errors.username)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                        />
                    </Grid>
                    <Grid item >
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default LoginForm;