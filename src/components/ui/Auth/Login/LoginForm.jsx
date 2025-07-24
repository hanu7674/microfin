import React, { useState, useRef } from 'react';
import { Form, Button, Checkbox, Stack, Schema, Message, InputGroup } from 'rsuite';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
 
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../../redux/auth';

const { StringType } = Schema.Types;
const model = Schema.Model({
  email: StringType().isRequired('Email is required'),
  password: StringType().isRequired('Password is required'),
});

const LoginForm = () => {
    const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(state => state.auth);
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
    remember: false,
  });
  const [formError, setFormError] = useState({});
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const formRef = useRef();
  
  const handleSubmit = () => {
    if (!formRef.current.check()) return;
    setError('');
    console.log(formValue);
    if (!formValue.remember) {
      sessionStorage.setItem('remember', false);
    } else {
      sessionStorage.setItem('remember', true);
      sessionStorage.setItem('email', formValue.email);
      sessionStorage.setItem('password', formValue.password);
    }

    dispatch(loginUser(formValue.email, formValue.password, '/dashboard', navigate))
  }
  
  const handleFormChange = (val) => {
    setFormValue(val);
    if (auth.error) {
       
    }
  };
  
  return (
    <>
    {error && <Message type="error" showIcon>{error}</Message>}
    {auth.error && <Message type="error" showIcon>{auth.error}</Message>}
    
  <Form fluid 
  model={model} 
  onSubmit={handleSubmit}
   onCheck={setFormError}
  ref={formRef}
  formValue={formValue}
  formError={formError}
  onChange={handleFormChange}
  checkTrigger="change"
  style={{ marginTop: 16 }}
  >  
    <Form.Group>
      <Form.ControlLabel>Email Address</Form.ControlLabel>
      <Form.Control name="email" type="email" placeholder="Enter your email" autoComplete="email" />
    </Form.Group>
    <Form.Group>
      <Form.ControlLabel>Password</Form.ControlLabel>
      <InputGroup>
        <Form.Control 
          name="password" 
          type={passwordVisible ? 'text' : 'password'} 
          placeholder="Enter your password" 
          autoComplete="current-password" 
        />
        <InputGroup.Button onClick={() => setPasswordVisible(!passwordVisible)}>
          {passwordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
        </InputGroup.Button>
      </InputGroup>
    </Form.Group>
    <Stack justifyContent='space-between'>
      <Stack.Item>
      <Checkbox name="remember" checked={formValue.remember} onChange={(v, checked) => setFormValue({ ...formValue, remember: checked })} errorMessage={formError.remember}>
        Remember me
      </Checkbox>
      </Stack.Item>
      <Stack.Item>
        <a href="#" >Forgot password?</a>
      </Stack.Item>
    </Stack>
    

    <Button appearance="primary" block style={{ background: '#111', color: '#fff', fontWeight: 600, marginBottom: 8 }} type='submit' loading={auth.loading} disabled={auth.loading}>
      {auth.loading ? 'Signing In...' : 'Sign In'}
    </Button>
    <div style={{ textAlign: 'center', fontSize: 14, marginBottom: 8 }}>
      Don't have an account? <NavLink to="/signup" style={{ fontWeight: 500 }}>Sign up</NavLink>
    </div>
  </Form>
  </>
);
}

export default LoginForm; 