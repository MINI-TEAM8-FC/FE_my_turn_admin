import React from "react";
import styled from "styled-components";
import { Form, Input, Button } from "antd";

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledForm = styled(Form)`
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

const LoginForm = () => {
  const onFinish = (values) => {
    console.log("Received values of form:", values);
    // 로그인 로직 구현 및 서버와의 통신 등 추가 작업을 여기서 수행합니다.
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <FormContainer>
      <StyledForm name="login-form" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <StyledButton type="primary" htmlType="submit">
            로그인
          </StyledButton>
        </Form.Item>
      </StyledForm>
    </FormContainer>
  );
};

export default LoginForm;
