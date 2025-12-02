# GlamBook - Salon Booking System

A full-stack MERN (MongoDB, Express, React, Node.js) application for discovering and booking appointments at salons. Features separate dashboards for customers and salon owners with complete authentication and management capabilities.

## Features

### For Customers
- 🏪 **Salon Discovery**: Browse featured salons with ratings, locations, and services
- 🔍 **Search Functionality**: Search salons by name, location, or services
- 📅 **Appointment Booking**: Book appointments with preferred date and time
- 👤 **User Registration & Login**: Create account and manage bookings
- 💅 **Service Management**: View detailed service lists with pricing

### For Salon Owners
- 🎛️ **Salon Dashboard**: Complete management interface for salon owners
- ✏️ **Update Salon Information**: Edit name, location, contact, description, and image
- 🛍️ **Service Management**: Add, edit, delete services and update prices
- 🟢 **Open/Close Status**: Toggle salon availability status
- 📊 **View Bookings**: Track all appointments and bookings

### General
- 🔐 **Authentication System**: Secure login/register for users and salon owners
- 📱 **Responsive Design**: Beautiful, modern UI that works on all devices
- 🎨 **Beautiful UI**: Modern gradient design with smooth animations

## Tech Stack

- **Frontend**: React 19, CSS3, Font Awesome, Google Fonts (Poppins), Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens), bcryptjs
- **API**: RESTful API

## Project Structure

```
Saloon Booking System/
├── Backend/
│   ├── controllers/
│   │   ├── authController.js      # Authentication logic
│   │   ├── salonController.js     # Salon CRUD operations
│   │   └── bookingController.js   # Booking management
│   ├── models/
│   │   ├── User.js                # User model (customers & salon owners)
│   │   ├── Salon.js               # Salon model
│   │   └── Booking.js             # Booking model
│   ├── routes/
│   │   ├── authRoutes.js          # Authentication routes
│   │   ├── salonRoutes.js         # Salon routes
│   │   └── bookingRoutes.js       # Booking routes
│   ├── server.js                  # Express server setup
│   ├── seed.js                    # Database seeder
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js              # Navigation with auth buttons
│   │   │   ├── Hero.js                # Hero section with search
│   │   │   ├── SalonCard.js           # Salon card component
│   │   │   ├── SalonsList.js          # List of salons
│   │   │   ├── SalonModal.js         # Booking modal
│   │   │   ├── SalonRegistration.js   # Public salon registration
│   │   │   ├── SalonDashboard.js      # Salon owner dashboard
│   │   │   ├── LoginModal.js          # Login form
│   │   │   ├── RegisterModal.js       # Registration type selection
│   │   │   ├── UserRegistrationForm.js # User registration
│   │   │   ├── SalonRegistrationForm.js # Salon owner registration
│   │   │   └── Footer.js              # Footer component
│   │   ├── context/
│   │   │   ├── AuthContext.js         # Authentication state
│   │   │   └── SalonContext.js        # Salon data state
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── README.md
```

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Backend Setup

1. Navigate to the Backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the Backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/salon-booking
JWT_SECRET=your-secret-key-change-in-production
```

For MongoDB Atlas, use:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/salon-booking
JWT_SECRET=your-secret-key-change-in-production
```

4. (Optional) Seed the database with sample data:
```bash
npm run seed
```

5. Start the backend server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication

- `POST /api/auth/register/user` - Register a new customer
- `POST /api/auth/register/salon` - Register a salon owner with salon
- `POST /api/auth/login` - Login user/salon owner
- `GET /api/auth/me` - Get current user (protected)

### Salons

- `GET /api/salons` - Get all salons
- `GET /api/salons/search?query=searchTerm` - Search salons
- `GET /api/salons/:id` - Get salon by ID
- `GET /api/salons/owner/:salonId` - Get salon by owner
- `POST /api/salons` - Create new salon
- `PUT /api/salons/:id` - Update salon (info, services, status)
- `DELETE /api/salons/:id` - Delete salon

### Bookings

- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:id` - Get booking by ID
- `GET /api/bookings/salon/:salonId` - Get bookings by salon
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id/status` - Update booking status
- `DELETE /api/bookings/:id` - Delete booking

## Usage Guide

### For Customers

1. **Register/Login**:
   - Click "Sign Up" → Choose "User"
   - Fill in name, email, password, and phone
   - After registration, you're automatically logged in

2. **Browse Salons**:
   - View all salons on the homepage
   - Use search bar to find specific salons or services

3. **Book Appointment**:
   - Click "View Details" on any salon card
   - Fill in booking form (name, phone, service, date, time)
   - Submit to confirm booking

### For Salon Owners

1. **Register Salon**:
   - Click "Sign Up" → Choose "Salon Owner"
   - Fill in owner details and salon information
   - Add services with pricing
   - After registration, you're redirected to the dashboard

2. **Salon Dashboard**:
   - **View Information**: See all salon details
   - **Edit Information**: Click "Edit Information" to update details
   - **Manage Services**: Add, edit, or delete services
   - **Toggle Status**: Use "Open Shop" / "Close Shop" button
   - **Update Changes**: Click "Update Salon" to save all changes

3. **Login**:
   - After logging in as a salon owner, you're automatically redirected to the dashboard
   - Regular users see the main salon listing page

## Database Collections

### Users Collection
- Stores customer and salon owner accounts
- Fields: name, email, password (hashed), phone, userType, salonId

### Salons Collection
- Stores salon information
- Fields: name, location, contact, email, rating, image, description, services, isOpen

### Bookings Collection
- Stores appointment bookings
- Fields: salonId, clientName, clientPhone, service, date, time, status

## Viewing MongoDB Data

### Using MongoDB Compass (Recommended)
1. Download from: https://www.mongodb.com/try/download/compass
2. Connect using: `mongodb://localhost:27017` (or your connection string)
3. Browse the `salon-booking` database
4. View collections: `users`, `salons`, `bookings`

### Using MongoDB Shell
```bash
mongosh
use salon-booking
db.users.find().pretty()
db.salons.find().pretty()
db.bookings.find().pretty()
```

## Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/salon-booking
JWT_SECRET=your-secret-key-change-in-production
```

## Design Features

- Modern gradient header with sticky navigation
- Hero section with search functionality
- Responsive salon cards with hover effects
- Modal popups for login, registration, and booking
- Salon dashboard with intuitive management interface
- Beautiful color scheme (Purple primary, Red secondary)
- Smooth scrolling and animations
- Mobile-responsive design

## Development

### Running Both Servers

Open two terminal windows:

**Terminal 1 (Backend):**
```bash
cd Backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm start
```

### Available Scripts

**Backend:**
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with sample data

**Frontend:**
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Protected API routes
- Token expiration (30 days)
- Input validation

## Future Enhancements

- Email verification
- Password reset functionality
- Booking calendar view
- Payment integration
- Review and rating system
- Notification system
- Admin dashboard
- Analytics and reports

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support

For support, email support@glambook.com or open an issue in the repository.
