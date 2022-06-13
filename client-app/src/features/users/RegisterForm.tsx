import { Formik, Form, ErrorMessage } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Header,} from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { store, useStore } from "../../app/stores/store";
import UserStore from "../../app/stores/UserStore";
import * as Yup from 'yup';
import ValidationErrors from "../errors/ValidationErrors";


export default observer(function RegisterForm() {
    const {userStore} = useStore();
    return (
        <Formik 
            initialValues={{displayName:'', username:'', email:'', password:'', error: null}}
            onSubmit={(values, {setErrors}) => userStore.register(values).catch(error => 
                setErrors({error}))}
            validationSchema={Yup.object({
                displayName: Yup.string().required('Display Name is a required field.'),
                username: Yup.string().required('Username is a required field.'),
                email: Yup.string().required('Email is a required field!').email('The email is not valid.'),
                password: Yup.string().required('Password is a required field.'),
            })}
            >

            {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete="off">
                    <Header as='h2' content='Login to Reactivities' color='teal' textAlign="center"/>
                    <MyTextInput name='displayName' placeholder='Display Name'/>
                    <MyTextInput name='username' placeholder='Username'/>
                    <MyTextInput name='email' placeholder='Email'/>
                    <MyTextInput name='password' placeholder='Password' type='password'/>
                    <ErrorMessage
                        name='error' render={() => <ValidationErrors errors={errors.error}
                        />}
                    />
                    <Button disabled={!isValid || !dirty || isSubmitting}loading={isSubmitting} positive content='Register' type='submit'/>
                </Form>
            )}
        </Formik>
    )
})