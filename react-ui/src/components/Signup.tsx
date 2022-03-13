import React from 'react';
import { Formik, Field, Form } from 'formik';

const Signup = () => (
    <div>
        <h4>Sign Up</h4>
        <Formik
            initialValues={{
                username: '',
                password1: '',
                password2: '',
            }}
            onSubmit={async (values) => {
                await new Promise((r) => setTimeout(r, 500));
                alert(JSON.stringify(values, null, 2));
            }}
        >
            <Form>
                <label htmlFor="username">Username</label>
                <Field id="username" name="username" placeholder="Enter Username Here" />

                <label htmlFor="password1">Password</label>
                <Field id="password1" name="password1" placeholder="Enter Password Here" type="password" />

                <label htmlFor="password2">Confirm Password</label>
                <Field id="password2" name="password2" placeholder="Enter Password Here" type="password" />

                <button type="submit">Submit</button>
            </Form>
        </Formik>
    </div>
);

export default Signup;