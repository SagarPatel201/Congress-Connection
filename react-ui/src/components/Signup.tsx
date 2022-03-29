import React from 'react';
import { Formik, Field, Form } from 'formik';

const Signup = () => (
    <div>
        <h4>Sign Up</h4>
        <Formik
            initialValues={{
                username: '',
                password1: '',
            }}
            onSubmit={async (values) => {
                await new Promise((r) => setTimeout(r, 500));
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        "username" : values.username,
                        "password" : values.password1
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
                    if(response.status == 200){
                        console.log(response)
                        alert("Success, your account was created!")
                    }else if(response.status == 409){
                        alert("Account Already Exists!")
                    }else{
                        alert("Account Creation Failed")
                    }
                })
                .catch(error => {
                    console.error('There was an error!', error);
                    alert("Account Creation Failed")
                });

            }}
        >
            <Form>
                <label htmlFor="username">Username</label>
                <Field id="username" name="username" placeholder="Enter Username Here" />

                <label htmlFor="password1">Password</label>
                <Field id="password1" name="password1" placeholder="Enter Password Here" type="password" />

                <button type="submit">Submit</button>
            </Form>
        </Formik>
    </div>
);

export default Signup;