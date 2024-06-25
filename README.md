# Review Project

This project is a web application for managing and sending anonymous reviews. Users can sign up and log in using their email, verify their account via an email OTP, or authenticate using OAuth like (Sign In with Google). Once verified, users can receive anonymous reviews from the user via registered user unique username.

## Features

- **User Authentication**: Sign up and log in using email.
- **Email Verification**: Verify accounts with an OTP sent to the user's email.
- **OAuth Integration**: Authenticate using third-party services.
- **Anonymous Reviews**: Send anonymous reviews to verified accounts.
- **Manage Reviews**: View and manage reviews sent by users.
- **Tech Stack**: Built with Next.js, MongoDB, and NextAuth.js.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

Make sure you have the following installed on your local machine:

- Node.js
- MongoDB

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/pradhyumvyas/Real_Review.git
   cd review-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
      Create a `.env.local` file in the root directory and add the following environment variables:
   
      ```bash
      MONGODB_URI=your_mongodb_uri
      RESEND_API_KEY= your_sendgrid_api_key
      NEXTAUTH_SECRET_KEY= your_nextauth_secret_key
      OPENAI_API_KEY= your_openai_api_key
      INSTAGRAM_CLIENT_ID= your_instagram_client_id
      INSTAGRAM_CLIENT_SECRET= your_instagram_client_secret
      GOOGLE_CLIENT_ID= your_google_client_id
      GOOGLE_CLIENT_SECRET= your_google_client_secret
      ```
      
4. **Run the development server**
   ```bash
      npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### Project Structure
    Here's an overview of the project's structure:
       
      ```
      review-project/
      ├── src/
      │   ├── app/
      │   │   ├── (app)/            #Main app components
      │   │   ├── (auth)/           #Authentication components
      │   │   ├── api/              #API routes
      │   │   ├── User/             #User components
      │   ├── components/           #Tailwind CSS components
      │   ├── context/              #Global context
      │   ├── helper/               #Helper functions
      │   ├── lib/                  #Utility functions
      │   ├── model/                #Mongoose models
      │   ├── schemas/              #zod validation schemas
      │   ├── types/                #Typescript types
      │   ├── middleware.ts         #Middleware functions   
      ├── .env
      ├── .gitignore
      ├── next.config.js
      ├── package.json
      ├── tailwind.config.js
      ├── README.md
      ```

### Authentication Flow
1. Email Signup/Login: Users can sign up or log in using their email. An OTP is sent to the provided email for verification.
2. Email Verification: Users enter the OTP recieved on their email to verify their email address.
3. OAuth Authentication: Users can also log in using third-party OAuth providers like Google, Facebook.
4. Anonymous Reviews: Once logged in and verified, People can share anonymous reviews to registered users.
  - Route for sending reviews is `/u/<username>`.
  - use [send_review](http://localhost:3000/u/one2) link to send reviews.

### Tech Stack
   - Next.js: A React framework for server-rendered applications.
   - MongoDB: A NoSQL database for storing user data and reviews.
   - NextAuth.js: Authentication for Next.js applications.
   - Resend Email: For sending email OTPs.
