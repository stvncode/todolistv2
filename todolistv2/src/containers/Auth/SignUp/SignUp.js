import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Formik, Field} from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

import {FormWrapper, StyledForm} from '../../../hoc/layout/elements';
import Input from '../../../components/UI/Forms/Input/Input';
import Button from '../../../components/UI/Forms/Button/Button';
import Heading from '../../../components/UI/Headings/Heading';
import Message from '../../../components/UI/Message/Message';

import * as actions from '../../../store/actions';

const MessageWrapper = styled.div`
    position: absolute;
    bottom: -2rem;
`;

const SignUpSchema = Yup.object().shape({
    firstName: Yup.string()
    .required('Your first name is required.')
    .min(3, 'Too short.')
    .max(25, 'Too much'),
    lastName: Yup.string()
    .required('Your last name is required.')
    .min(3, 'Too short.')
    .max(25, 'Too much'),
    email: Yup.string()
    .email('Invalid email.')
    .required('The email is required.'),
    password: Yup.string()
    .required('The password is required')
    .min(8, 'Too short.'),
    confirmPassword: Yup.string()
     .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('You need to confirm your password'),
});

const SignUp = ({signUp, loading, error, cleanUp}) => {
    useEffect(() => {
        return () => {
            cleanUp();
        };
    }, [cleanUp]);

    return (
        <Formik
        initialValues={{
            firstName: '',
            LastName: '',
            email: '',
            password:'',
            onfirmPassword: ''
        }}
        validationSchema={SignUpSchema}
        onSubmit={async (values, { setSubmitting }) => {
            await signUp(values);
            setSubmitting(false);
            }}
        >
        {({isSubmitting, isValid}) => (
            <FormWrapper>
                <Heading noMargin size="h1" color="white">
                    Sign up for an account
                </Heading>
                <Heading bold size="h4" color="white">
                    I'm happy to see you stranger <span role="img" aria-label="smiley">🙂</span>
                </Heading>
                <StyledForm>
                    <Field 
                        type="text" 
                        name="firstName" 
                        placeholder="Your first name.." 
                        component={Input}
                    />
                    <Field 
                        type="text" 
                        name="lastName" 
                        placeholder="Your last name.." 
                        component={Input}
                    />
                    <Field 
                        type="email" 
                        name="email" 
                        placeholder="Your email.." 
                        component={Input}
                    />
                    <Field 
                        type="password" 
                        name="password" 
                        placeholder="Your password.."
                        component={Input}
                    />
                    <Field 
                        type="password" 
                        name="confirmPassword" 
                        placeholder="Confirm your password"
                        component={Input}
                    />
                    <Button 
                    disabled={!isValid || isSubmitting} 
                    loading={loading ? 'Signing up...' : null} 
                    type="submit"
                    >
                        SignUp
                    </Button>
                    <MessageWrapper>
                        <Message error show={error}>
                            {error}
                        </Message>
                    </MessageWrapper>
                </StyledForm>
            </FormWrapper>
        )}
        </Formik>
    );
};

const mapStateToProps = ({auth}) => ({
    loading: auth.loading,
    error: auth.error,
});

const mapDispatchToProps = {
    signUp: actions.signUp,
    cleanUp: actions.clean
};

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(SignUp);
