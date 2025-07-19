import React from 'react';
import { Panel, Container, Content, FlexboxGrid } from 'rsuite';

const TermsOfService = () => (
  <>
  <Panel bordered >
            <h2>Terms of Service</h2>
            <p>Welcome to MicroFin. By using our services, you agree to the following terms and conditions. Please read them carefully.</p>
            <h4>1. Acceptance of Terms</h4>
            <p>By accessing or using MicroFin, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
            <h4>2. Use of Service</h4>
            <p>You agree to use MicroFin only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account information.</p>
            <h4>3. Privacy</h4>
            <p>Your use of MicroFin is also governed by our Privacy Policy.</p>
            <h4>4. Modifications</h4>
            <p>We reserve the right to modify these Terms at any time. Continued use of the service constitutes acceptance of the new terms.</p>
            <h4>5. Contact</h4>
            <p>If you have any questions about these Terms, please contact us at support@microfin.com.</p>
            <p style={{ marginTop: 32, color: '#888', fontSize: 13 }}>Last updated: April 2024</p>
          </Panel></>
);

export default TermsOfService; 