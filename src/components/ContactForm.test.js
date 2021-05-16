import React from 'react';
import { fireEvent, getByText, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
    render( <ContactForm /> );
});

test('renders the contact form header', () => {
    render( <ContactForm /> )
    const header = screen.getByText(/contact form/i)
    expect(header).toBeTruthy();
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less than 5 characters into first name', async () => {
    //Step 1. Render the form. Step 2. Get the element. Step 3. Test
    render( <ContactForm /> )
    const firstNameInput = screen.getByLabelText('First Name');
    userEvent.type(firstNameInput, 'Samantha');
    const error = screen.getByTestId();
});

test('renders THREE error messages if user enters no values into any fields.', async() => {
    render( <ContactForm /> )
    const submit = screen.getByTestId('sumbit')
    userEvent.click(submit)
    const error = screen.getAllByTestId('error')
    expect(error).toHaveLength(3);
});

test('renders ONE error message if user enters a valid first name and last name, but no email', async() => {
    render( <ContactForm /> )
    const submit = screen.getByTestId('submit')
    const firstNameInput = screen.getByLabelText('First Name');
    const lastNameInput = screen.getByLabelText('Last Name');

    userEvent.type(firstNameInput, 'Harry');
    userEvent.type(lastNameInput, 'Potter');

    userEvent.click(submit)

    const error = screen.getAllByTestId('error')
    expect(error).toHaveLength();
});

test('renders "email must be a valid email address" if an invaid email is entered', async() => {
    render( <ContactForm /> )
    const submit = screen.getByTestId('submit')
    const emailInput = screen.getByLabelText('email');

    userEvent.type(emailInput, 'Harry');
    userEvent.click(submit)

    const emailError = screen.getByText(/email must be a valid email address/)
    expect(emailError).toBeInTheDocument();
});

test('renders "lastname is a required field" if a last name is not entered', async() => {
    render( <ContactForm /> )
    const submit = screen.getByTestId('submit')
    const lastNameInput = screen.getByLabelText('last name');

    userEvent.type(lastNameInput, '');
    userEvent.click(submit)

    const LastNameError = screen.getByText(/lastName field is required/)
    expect(LastNameError).toBeInTheDocument();
});

test('renders all fields when submitted. Does NOT render error message if text is not submitted.', async() => {
    render( <ContactForm /> )

    const submit = screen.getByTestId('submit')
    const firstNameInput = screen.getByLabelText('first name');
    const lastNameInput = screen.getByLabelText('last name');
    const emailInput = screen.getByLabelText('email');

    userEvent.type(firstNameInput, 'Harry');
    userEvent.type(lastNameInput, 'Potter');
    userEvent.type(emailInput, 'harrypotter@gmail.com');
    userEvent.click(submit)

    expect(screen.getByTestId('firstnamedisplay')).toBeInTheDocument()
    expect(screen.getByTestId('lastnamedisplay')).toBeInTheDocument()
    expect(screen.getByTestId('emaildisplay')).toBeInTheDocument()
    expect(screen.queryAllByTestId('messagedisplay')).toHaveLength(0)
});

test('renders all fields text when all fields are submitted', async() => {
    //expect all things with text ids from display component
});