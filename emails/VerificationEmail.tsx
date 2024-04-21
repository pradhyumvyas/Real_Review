import * as React from 'react';

interface EmailTemplateProps {
  username: string;
  otp:string;
}

export default function VerificationEmail({
  username, otp
}:EmailTemplateProps){
  return(
  <div>
    <h1>Welcome, {username}!</h1>
    <h3>Your OTP is {otp}, please verify from this OTP</h3>
  </div>
)};
