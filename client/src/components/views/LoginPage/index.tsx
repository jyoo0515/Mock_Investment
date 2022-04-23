import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import apiClient from 'api/axios';
import { useNavigate } from 'react-router-dom';
import useAuthAction from 'recoil/auth/useAuthAction';

interface loginData {
  username: string;
  password: string;
}

function LoginPage() {
  const [form, setForm] = useState<loginData>({ username: '', password: '' });
  const navigate = useNavigate();
  const authAction = useAuthAction();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    apiClient.post('/users/login', form).then((res) => {
      authAction.authorize();
      navigate('/');
    });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" name="username" onChange={handleChange} />
          <Form.Text className="text-muted">We'll never share your username with anyone else.</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Keep me logged in" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default LoginPage;
