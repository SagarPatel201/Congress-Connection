import React from 'react';
import { Formik, Field, Form } from 'formik';
import { Link } from 'react-router-dom';
const Login = () => (
    <div>
        <h4>Login</h4>
        <Formik
            initialValues={{
                username: '',
                password: '',
            }}
            onSubmit={async (values) => {
                await new Promise((r) => setTimeout(r, 500));
                alert(JSON.stringify(values, null, 2));
            }}
        >
            <Form>
                <label htmlFor="username">Username</label>
                <Field id="username" name="username" placeholder="Enter Username Here" />

                <label htmlFor="password">Password</label>
                <Field id="password" name="password" placeholder="Enter Password Here" type="password" />

                <Link to="/home">
                    <button type="submit">Submit</button>
                </Link>

                
            </Form>
        </Formik>
    </div>
);

export default Login;