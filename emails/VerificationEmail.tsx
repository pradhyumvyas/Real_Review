import * as React from 'react';

interface EmailTemplateProps {
  username: string;
  otp:string;
}

export default function VerificationEmail({
  username, otp
}:EmailTemplateProps){
  console.log("Email Template", username, otp)
  return(
  <div>
    <h1>Welcome, {username}! </h1>
    <h3>Your OTP is {otp}, please verify from this OTP</h3>
    <h4>From your Big Brother</h4>
  </div>
)};
