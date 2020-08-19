// Helper styles for demo
import "./helper.css";
import { MoreResources, DisplayFormikState } from "./helper";

import React from "react";
import { render } from "react-dom";
import { Formik } from "formik";
import * as Yup from "yup";

const App = () => (
  <div className="app">
    <h1>
      Basic{" "}
      <a
        href="https://github.com/jaredpalmer/formik"
        target="_blank"
        rel="noopener noreferrer"
      >
        Formik
      </a>{" "}
      Demo
    </h1>

    <Formik
      initialValues={{ title: "", text: "" }}
      onSubmit={async (values, { setErrors }) => {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        };
        await fetch("http://localhost:3000/posts", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            alert(JSON.stringify(data, null, 2));

            if (data.validationErrors) {
              alert(JSON.stringify(data.validationErrors[0], null, 2));
              setErrors(
                data.validationErrors.reduce(
                  (acc, { property, constraints }) => ({
                    ...acc,
                    [property]: constraints.length,
                  }),
                  {}
                )
              );
            }

            if (data.errors) {
              setErrors(
                data.errors.reduce(
                  (acc, { path, message }) => ({
                    ...acc,
                    [path[0]]: message,
                  }),
                  {}
                )
              );
            }
          });
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string().required("Required"),
        text: Yup.string().required("Required"),
      })}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return (
          <form onSubmit={handleSubmit}>
            <label htmlFor="title" style={{ display: "block" }}>
              Title
            </label>
            <input
              id="title"
              placeholder="Message Title"
              type="text"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.title && touched.title
                  ? "text-input error"
                  : "text-input"
              }
            />
            {errors.title && touched.title && (
              <div className="input-feedback">{errors.title}</div>
            )}
            <label htmlFor="text" style={{ display: "block" }}>
              Text
            </label>
            <input
              id="text"
              placeholder="Enter your message"
              type="text"
              value={values.text}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.text && touched.text ? "text-input error" : "text-input"
              }
            />
            {errors.text && touched.text && (
              <div className="input-feedback">{errors.text}</div>
            )}

            <button
              type="button"
              className="outline"
              onClick={handleReset}
              disabled={!dirty || isSubmitting}
            >
              Reset
            </button>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>

            <DisplayFormikState {...props} />
          </form>
        );
      }}
    </Formik>

    <MoreResources />
  </div>
);

render(<App />, document.getElementById("root"));
