import React, { useState, useRef } from 'react';
import {
  Form,
  Button,
  Checkbox,
  SelectPicker,
  Message,
  Modal,
  Schema,
  Stack,
  Divider,
  Panel
} from 'rsuite';
import TermsOfService from '../Terms/TermsOfService';
import PrivacyPolicy from '../Privacy/PrivacyPolicy';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
import SocialLogins from './SocialLogins';
import { FaShieldAlt } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../../../../redux/auth';
const { StringType, BooleanType } = Schema.Types;

const businessTypes = [
  { label: 'Sole Proprietorship', value: 'sole' },
  { label: 'Partnership', value: 'partnership' },
  { label: 'Corporation', value: 'corporation' },
  { label: 'Nonprofit', value: 'nonprofit' },
  { label: 'Other', value: 'other' },
];

const model = Schema.Model({
  firstName: StringType().isRequired('First name is required.'),
  lastName: StringType().isRequired('Last name is required.'),
  phone: StringType().isRequired('Phone number is required.'),
  businessName: StringType().isRequired('Business name is required.'),
  email: StringType().isEmail('Please enter a valid email address.').isRequired('Email is required.'),
  password: StringType().minLength(6, 'Password must be at least 6 characters.').isRequired('Password is required.'),
  confirmPassword: StringType()
    .addRule((value, data) => value === data.password, 'Passwords do not match.')
    .isRequired('Please confirm your password.'),
  businessType: StringType().isRequired('Select a business type.'),
  agree: BooleanType().isRequired('You must agree to the Terms of Service and Privacy Policy.'),
  marketing: BooleanType().isRequired('You must agree to receive updates and promotional emails from MicroFin.')
});
const Field = React.forwardRef((props, ref) => {
  const { name, message, label, accepter, error, ...rest } = props;
  return (
    <Form.Group ref={ref} className={error ? 'has-error' : ''}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} errorMessage={error} {...rest} />
      <Form.HelpText>{message}</Form.HelpText>
    </Form.Group>
  );
});
export default function Signup({ onSocialLogin, onSignInLinkClick }) {
  const { theme } = useTheme();
  const themeVars = getThemeVars(theme);
  const [formValue, setFormValue] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessName: '',
    businessType: '',
    password: '',
    confirmPassword: '',
    agree: false,
    marketing: false,
  });
  const [formError, setFormError] = useState({});
  const [error, setError] = useState('');
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const formRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(state => state.auth);
  const handleSubmit = (e) => {
    if (!formRef.current.check()) return;
    if (!formValue.agree) {
      setError('You must agree to the Terms of Service and Privacy Policy.');
      return;
    }
    setError('');
    dispatch(signupUser(formValue))
      .then((user) => {
        // Optionally redirect after signup
        if (user && user.uid) {
          navigate('/dashboard');
        }
      })
      .catch((err) => {
        // Error is handled by Redux, but you can set local error if needed
      });
  };
  const handleGoogle = () => alert('Google sign up (demo)');
  const handleMicrosoft = () => alert('Microsoft sign up (demo)');
  // Optionally clear backend error on input change
  const handleFormChange = (val) => {
    setFormValue(val);
    if (auth.error) {
      // Optionally dispatch an action to clear error, or just ignore
      // dispatch(clearAuthError());
    }
  };

  return (
    <div
      style={{
        background: themeVars.bgMain,
        color: themeVars.textMain,
        transition: 'background 0.2s, color 0.2s',
      }}
    >
      <Panel bordered >

      
      <Form
        fluid
        ref={formRef}
        model={model}
        formValue={formValue}
        onChange={handleFormChange}
        formError={formError}
        onCheck={setFormError}
        onSubmit={handleSubmit}
        checkTrigger="change"
        style={{
          // background: themeVars.cardBg,
          color: themeVars.cardText,
          // boxShadow: themeVars.shadow,
          padding: 32,
          maxWidth: 620,
          margin: 'auto',
          // border: `1px solid ${themeVars.borderColor}`
        }}
      >
        <Form.Group >
          <Stack spacing={4}>
            <Stack.Item>
              <Form.ControlLabel>First Name</Form.ControlLabel>
              <Form.Control name="firstName" placeholder="First Name" style={{ flex: 1 }} />
            </Stack.Item>
            <Stack.Item>
              <Form.ControlLabel>Last Name</Form.ControlLabel>
              <Form.Control name="lastName" placeholder="Last Name" style={{ flex: 1 }} />
            </Stack.Item>
          </Stack>
          </Form.Group>
        <Form.Group >
          <Form.ControlLabel>Email</Form.ControlLabel>
          <Form.Control name="email" type="email" placeholder="john@example.com" style={{ flex: 1 }} />
        </Form.Group>
        <Form.Group >
          <Form.ControlLabel>Phone</Form.ControlLabel>
          <Form.Control name="phone" placeholder="+1 (555) 123-4567" />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel>Business Name</Form.ControlLabel>
          <Form.Control name="businessName" placeholder="Your Business Name" />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel>Business Type</Form.ControlLabel>
          <Field
            name="businessType"
            accepter={SelectPicker}
            style={{ width: '100%' }}
            searchable={false}
            data={businessTypes}
            error={formError.businessType}
          />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel>Password</Form.ControlLabel>
          <Form.Control name="password" type="password" placeholder="Create a strong password" autoComplete="new-password" />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel>Confirm Password</Form.ControlLabel>
          <Form.Control name="confirmPassword" type="password" placeholder="Confirm your password" autoComplete="new-password" />
        </Form.Group>
           <Checkbox name="agree" checked={formValue.agree} onChange={(v, checked) => setFormValue({ ...formValue, agree: checked })} errorMessage={formError.agree}>
            I agree to the &nbsp;
            <a style={{ color: themeVars.textLink, cursor: 'pointer' }} onClick={() => setShowTerms(true)}>Terms of Service</a>
            &nbsp;and &nbsp;
            <a style={{ color: themeVars.textLink, cursor: 'pointer' }} onClick={() => setShowPrivacy(true)}>Privacy Policy</a>
          </Checkbox>
            
             <Checkbox name="marketing" checked={formValue.marketing} onChange={(v, checked) => setFormValue({ ...formValue, marketing: checked })} errorMessage={formError.marketing}>
              I would like to receive updates and promotional emails from MicroFin
            </Checkbox>
           
        {error && <Message type="error" showIcon>{error}</Message>}
        {auth.error && <Message type="error" showIcon>{auth.error}</Message>}

        <Button appearance="primary" type="submit" block style={{ marginTop: 8, marginBottom: 8, background: themeVars.ctaBg, color: themeVars.ctaText }} loading={auth.loading} disabled={auth.loading}>
          {auth.loading ? 'Creating Account...' : 'Create Account'}
        </Button>
        <div style={{ textAlign: 'center', marginBottom: 8, marginTop: 8 }}>
          Already have an account?{' '}
          <NavLink to="/login" style={{ color: themeVars.textLink, textDecoration: 'underline' }}>
            Sign in
          </NavLink>
        </div>
          <Divider style={{ margin: '12% 0' }} />
          <div style={{ color: themeVars.textSecondary, fontSize: 13, padding: '10px 0', textAlign: 'center' }}>Or sign up with</div>
          <SocialLogins onGoogle={handleGoogle} onMicrosoft={handleMicrosoft} />
      <div style={{  padding: '5%'}}>
</div>
        
      </Form>
      </Panel>
      <div style={{ padding: '5%', background: themeVars.cardBg,}} >

      </div>
      <Panel bordered style={{ color: themeVars.subText, fontSize: 13, padding: 16}}>
        <Stack  spacing={20} alignItems='flex-start' justifyContent='center' >
          <Stack.Item>
            <div>
              <FaShieldAlt size={18}/>
            </div>
            </Stack.Item>
            <Stack.Item>
            <span style={{ fontSize: 15, fontWeight: 600, marginBottom: 4, color: themeVars.textMain }}>Your data is secure</span>
              <div >
                <span style={{ fontSize: 11, fontWeight: 400 }}>We use bank-level encryption to protect your information and never share your data with third parties.</span>
              </div>
            </Stack.Item>
        </Stack>
        </Panel>
      <Modal open={showTerms} onClose={() => setShowTerms(false)} size='lg' style={{ color: themeVars.textMain }}>
        <Modal.Body style={{ background: themeVars.cardBg, color: themeVars.cardText }}>
          <TermsOfService />
          <div style={{ marginTop: 16, textAlign: 'center' }}>
            By creating an account, you agree to our Terms of Service.
          </div>
          <div style={{ marginTop: 16, textAlign: 'center' }}>
            <Button appearance="primary" onClick={() => setShowTerms(false)} style={{ background: themeVars.ctaBg, color: themeVars.ctaText }}>Close</Button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal open={showPrivacy} onClose={() => setShowPrivacy(false)} size='lg' style={{ color: themeVars.textMain }}>
        <Modal.Body style={{ background: themeVars.cardBg, color: themeVars.cardText }}>
          <PrivacyPolicy />
          <div style={{ marginTop: 16, textAlign: 'center' }}>
            By creating an account, you agree to our Privacy Policy.
          </div>
          <div style={{ marginTop: 16, textAlign: 'center' }}>
            <Button appearance="primary" onClick={() => setShowPrivacy(false)} style={{ background: themeVars.ctaBg, color: themeVars.ctaText }}>Close</Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
