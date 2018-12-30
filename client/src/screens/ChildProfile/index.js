import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { withRouter } from "react-router-dom";
import { Query, Mutation, compose } from "react-apollo";
import { Button, Form, Input, Select, Radio } from "antd";
import withState from "recompose/withState";
import { SITTE_QUERY } from "../../graphql/queries/SITTE_QUERY";
import { Allergies } from "../../components/Allergies";
import { CREATE_ALLERGY } from "../../graphql/mutations/CREATE_ALLERGY";

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

const AddAllergyPanel = styled.div`
  position: fixed;
  height: 100vh;
  width: 50vw;
  background-color: grey;
  top: 0;
  right: 0;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  transform: translateX(${({ isOpen }) => (isOpen ? "0%" : "100%")});
  transition: transform 500ms ease-in;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  padding-top: 5rem;
  > * {
    color: white;
    font-weight: light;
  }
`;

const Error = styled.div`
  color: red;
`;

const Child = ({ isOpen, setOpen, match, mutate }) => (
  <Query
    variables={{
      where: {
        id: match.params.id
      }
    }}
    query={SITTE_QUERY}
  >
    {({ data, loading, error }) => {
      if (loading) {
        return "loading...";
      }
      if (error) {
        return "Something went wrong";
      }
      return (
        <React.Fragment>
          <div
            style={{
              filter: isOpen && "blur(4px)"
            }}
          >
            <h2>{`${data.sitte.firstName} ${data.sitte.lastName}`}</h2>
            <Allergies
              onAllergyAdd={() => {
                console.log("Show edit popout");
                setOpen(open => !open);
              }}
              data={data.sitte.allergies}
            />
          </div>
          <AddAllergyPanel isOpen={isOpen}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2>Add Allergy</h2>
              <Button
                icon="close"
                onClick={() => {
                  setOpen(open => !open);
                }}
              />
            </div>
            <Mutation
              mutation={CREATE_ALLERGY}
              refetchQueries={[
                {
                  query: SITTE_QUERY
                }
              ]}
            >
              {createAllergy => (
                <Formik
                  initialValues={{
                    name: "",
                    type: "",
                    severity: "",
                    comment: ""
                  }}
                  validate={values => {
                    const errors = {};

                    if (!values.name) {
                      errors.name = "You must have an allergy name.";
                    }

                    if (!values.type) {
                      errors.type = "You must have an allergy type.";
                    }

                    if (!values.severity) {
                      errors.severity = "You must have an allergy severity";
                    }

                    return errors;
                  }}
                  onSubmit={async values => {
                    console.log("Submit", values);
                    createAllergy({
                      id: match.params.id,
                      ...values
                    });
                  }}
                >
                  {({
                    handleChange,
                    handleSubmit,
                    touched,
                    errors,
                    isSubmitting,
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      <FormItem label="Name*">
                        <Input
                          type="text"
                          name="name"
                          onChange={handleChange}
                        />
                        {errors.name && touched.name && (
                          <Error>{errors.name}</Error>
                        )}
                      </FormItem>
                      <FormItem label="Type">
                        <Select
                          name="type"
                          style={{ width: 200 }}
                          placeholder="Select a type"
                          onChange={handleChange}
                        >
                          <Option value="FOOD">Food</Option>
                          <Option value="DRUG">Drug</Option>
                        </Select>
                      </FormItem>
                      <FormItem label="Severity">
                        <Select
                          name="severity"
                          style={{ width: 200 }}
                          placeholder="Severity"
                          onChange={handleChange}
                        >
                          <Option value="HIGH">High</Option>
                          <Option value="MEDIUM">Medium</Option>
                          <Option value="LOW">Low</Option>
                        </Select>
                      </FormItem>
                      <FormItem label="comment">
                        <TextArea
                          rows={4}
                          name="comment"
                          onChange={handleChange}
                        />
                        {errors.comment && touched.comment && (
                          <Error>{errors.comment}</Error>
                        )}
                      </FormItem>
                      <Button
                        htmlType="submit"
                        type="primary"
                        disabled={isSubmitting}
                      >
                        Add Allergy
                      </Button>
                    </Form>
                  )}
                </Formik>
              )}
            </Mutation>
          </AddAllergyPanel>
        </React.Fragment>
      );
    }}
  </Query>
);

Child.propTypes = {
  match: PropTypes.shape({
    id: PropTypes.string
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
};

export default compose(
  withRouter,
  withState("isOpen", "setOpen", true)
)(Child);
