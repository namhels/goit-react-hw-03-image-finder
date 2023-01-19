import PropTypes from 'prop-types';
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { BsSearch } from 'react-icons/bs';

const schema = yup.object({
  inputValue: yup.string().required(),
});

const initialValues = {
  inputValue: '',
};

const Searchbar = ({ onSubmit }) => {
  const handleSubmit = async ({ inputValue }, { resetForm, setSubmitting }) => {
    await onSubmit(inputValue);
    setSubmitting(false);
    resetForm();
  };


  return (
    <header className="Searchbar">
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}>
          <Form className="SearchForm">
            <button type="submit" className="SearchForm-button">
              <BsSearch className="SearchForm-button-label"/>
            </button>
            <Field
              className="SearchForm-input"
              name="inputValue"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              />
          </Form>
      </Formik>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;