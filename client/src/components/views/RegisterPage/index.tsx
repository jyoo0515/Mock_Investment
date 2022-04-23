import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import apiClient from 'api/axios';

interface registerData {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

function RegisterPage() {
  const [form, setForm] = useState<registerData>({ username: '', password: '', firstName: '', lastName: '' });
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
    apiClient.post('/users/register', form).then((res) => alert(res.data.id));
    setForm({ username: '', password: '', firstName: '', lastName: '' });
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
        <Form.Group className="mb-3" controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="Password" name="firstName" onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Password" name="lastName" onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default RegisterPage;
