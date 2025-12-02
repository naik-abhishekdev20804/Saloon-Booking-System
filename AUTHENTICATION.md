# Authentication System Documentation

## Overview

The GlamBook application now includes a complete authentication system that allows users to:
- Register as regular users (customers)
- Register as salon owners
- Login to access their accounts
- Maintain session state across page refreshes

## Backend Implementation

### Models

**User Model** (`Backend/models/User.js`)
- Stores user credentials and information
- Supports two user types: `user` and `salon`
- Passwords are hashed using bcryptjs
- Includes `salonId` reference for salon owners

### Authentication Routes

**Endpoints** (`Backend/routes/authRoutes.js`):
- `POST /api/auth/register/user` - Register a new user
- `POST /api/auth/register/salon` - Register a salon owner with salon
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Security Features

- **Password Hashing**: Uses bcryptjs with salt rounds
- **JWT Tokens**: JSON Web Tokens for session management
- **Token Expiration**: 30 days
- **Protected Routes**: Middleware to verify tokens

## Frontend Implementation

### Components

1. **LoginModal** (`frontend/src/components/LoginModal.js`)
   - Email and password login form
   - Error handling and loading states
   - Link to switch to registration

2. **RegisterModal** (`frontend/src/components/RegisterModal.js`)
   - Initial screen to choose account type (User or Salon)
   - Routes to appropriate registration form

3. **UserRegistrationForm** (`frontend/src/components/UserRegistrationForm.js`)
   - Basic user registration
   - Fields: Name, Email, Phone, Password, Confirm Password
   - Password validation

4. **SalonRegistrationForm** (`frontend/src/components/SalonRegistrationForm.js`)
   - Salon owner registration
   - Includes account info and salon details
   - Service management with dynamic fields

### Context API

**AuthContext** (`frontend/src/context/AuthContext.js`)
- Manages authentication state
- Provides login, register, and logout functions
- Handles token storage in localStorage
- Automatically fetches user data on app load

### Header Updates

The Header component now:
- Shows Login/Register buttons when not authenticated
- Displays user name and Logout button when authenticated
- Opens modals for login/registration

## User Flow

### Registration Flow

1. **User clicks "Sign Up"** → RegisterModal opens
2. **Choose account type**:
   - **User**: Simple form with name, email, phone, password
   - **Salon**: Full form with account info + salon details + services
3. **Submit form** → API call → User logged in automatically → Modal closes

### Login Flow

1. **User clicks "Login"** → LoginModal opens
2. **Enter email and password** → Submit
3. **API validates** → Token stored → User logged in → Modal closes

### Logout Flow

1. **User clicks "Logout"** → Token removed → User state cleared → Redirected to homepage

## API Request Format

### Register User
```json
POST /api/auth/register/user
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890"
}
```

### Register Salon
```json
POST /api/auth/register/salon
{
  "name": "Jane Smith",
  "email": "jane@salon.com",
  "password": "password123",
  "phone": "+1234567890",
  "shopName": "Beauty Salon",
  "contactNumber": "+1234567890",
  "location": "New York, NY",
  "description": "Premium salon",
  "services": [
    { "name": "Haircut", "price": 45 },
    { "name": "Manicure", "price": 35 }
  ]
}
```

### Login
```json
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Protected Routes
```
GET /api/auth/me
Headers: Authorization: Bearer <token>
```

## Environment Variables

Add to `Backend/.env`:
```env
JWT_SECRET=your-secret-key-change-in-production
PORT=5000
MONGODB_URI=mongodb://localhost:27017/salon-booking
```

## Security Considerations

1. **JWT Secret**: Change the default JWT_SECRET in production
2. **Password Strength**: Currently minimum 6 characters - consider adding more validation
3. **HTTPS**: Use HTTPS in production to protect tokens
4. **Token Storage**: Tokens stored in localStorage - consider httpOnly cookies for better security
5. **Rate Limiting**: Consider adding rate limiting to prevent brute force attacks

## Future Enhancements

- Email verification
- Password reset functionality
- Social media login (Google, Facebook)
- Two-factor authentication
- User profile management
- Booking history for users
- Salon dashboard for owners

