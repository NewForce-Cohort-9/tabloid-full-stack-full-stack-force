import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { login } from "../Managers/UserProfileManager";

export default function Login({setIsLoggedIn}) {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login({email, password})
      .then(r =>{
      if(r){
        // Assuming r contains user data, you might want to adjust based on your actual response
        const userProfile = {
          id: r.id, // or r.userId if that's how your response is structured
          displayName: r.displayName, // adjust as needed
          userTypeId: r.userTypeId, // Hardcoded UserTypeId
        };

        // Save to local storage
        localStorage.setItem("userProfile", JSON.stringify(userProfile));
      setIsLoggedIn(true)
      navigate('/')
      }
      else{
        alert("Invalid email or password")
      }
    })
  };

  return (
    <Form onSubmit={loginSubmit}>
      <fieldset>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Button>Login</Button>
        </FormGroup>
        <em>
          Not registered? <Link to="/register">Register</Link>
        </em>
      </fieldset>
    </Form>
  );
}