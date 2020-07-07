import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';

export const SignupForm = () => {
  // Notice that we have to initialize ALL of fields with values. These
  // could come from props, but since we don't want to prefill this form,
  // we just use an empty string. If you don't do this, React will yell
  // at you.

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: values => {
      let email = values.email;
      axios.post(`http://localhost:8080/api/user/newsletter-subscribe`, { email })
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <button type="submit">Submit</button>
    </form>
  );
};