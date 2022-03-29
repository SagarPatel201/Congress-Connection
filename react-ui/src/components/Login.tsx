import React from 'react';
import { Formik, Field, Form } from 'formik';
import { Link } from 'react-router-dom';

const Login = (props: any) => (
    <div>
        <h4>Login</h4>
        <Formik
            initialValues={{
                username: '',
                password: '',
            }}
            onSubmit={async (values) => {
                await new Promise((r) => setTimeout(r, 500));
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        "username" : values.username,
                        "password" : values.password
                    })
                };
                fetch('http://cs431-02.cs.rutgers.edu:8080/login/authenticate', requestOptions)
                .then(async response => {
                    const validJSON = response.headers.get('content-type')?.includes('application/json');
                    const data = validJSON && await response.json();
                    if (!response.ok) {
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }
                    if(response.status == 200){
                        console.log("ASDF")
                        props.navigate('/home');
                    }else{
                        alert("Invalid Login")
                    }
                })
                .catch(error => {
                    console.error('There was an error!', error);
                    alert("Invalid Login")
                });

            }}
        >
            <Form>
                <label htmlFor="username">Username</label>
                <Field id="username" name="username" placeholder="Enter Username Here" />

                <label htmlFor="password">Password</label>
                <Field id="password" name="password" placeholder="Enter Password Here" type="password" />

                <button type="submit">Submit</button>
                <Link to ="/signup">
                    <p>Create New Account</p>
                </Link>
            </Form>
        </Formik>
    </div>
);

export default Login;