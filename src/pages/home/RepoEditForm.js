import React from "react";
import { Input, Form, Button } from "antd";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class RepoEditForm extends React.Component {
  componentDidMount() {
    // To disable submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        await this.props.handleEditSubmit({
          currentRepo: this.props.repo,
          newRepoProps: {
            name: values.name
          }
        });
      }
    });
  };

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    // Only show error after a field is touched.
    const newRepoNameError = isFieldTouched("name") && getFieldError("name");

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item
          validateStatus={newRepoNameError ? "error" : ""}
          help={newRepoNameError || ""}
        >
          {getFieldDecorator("name", {
            rules: [
              { required: true, message: "Please input a new repo name!" }
            ]
          })(<Input name="name" placeholder="New repo name" />)}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: "normal_login" })(RepoEditForm);
