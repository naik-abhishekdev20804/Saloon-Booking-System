# GlamBook - Salon Booking System

A full-stack MERN (MongoDB, Express, React, Node.js) application for discovering and booking appointments at salons. Salon owners can register their businesses, and customers can search, view details, and book appointments.

## Features

- 🏪 **Salon Discovery**: Browse featured salons with ratings, locations, and services
- 🔍 **Search Functionality**: Search salons by name, location, or services
- 📝 **Salon Registration**: Salon owners can register their business with services and pricing
- 📅 **Appointment Booking**: Customers can book appointments with preferred date and time
- 💅 **Service Management**: View detailed service lists with pricing
- 📱 **Responsive Design**: Beautiful, modern UI that works on all devices

## Tech Stack

- **Frontend**: React 19, CSS3, Font Awesome, Google Fonts (Poppins)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **API**: RESTful API

## Project Structure

```
Saloon Booking System/
├── Backend/
│   ├── controllers/
│   │   ├── salonController.js
│   │   └── bookingController.js
│   ├── models/
│   │   ├── Salon.js
│   │   └── Booking.js
│   ├── routes/
│   │   ├── salonRoutes.js
│   │   └── bookingRoutes.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── Hero.js
│   │   │   ├── SalonCard.js
│   │   │   ├── SalonsList.js
│   │   │   ├── SalonModal.js
│   │   │   ├── SalonRegistration.js
│   │   │   └── Footer.js
│   │   ├── context/
│   │   │   └── SalonContext.js
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
```

For MongoDB Atlas, use:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/salon-booking
```

4. Start the backend server:
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

3. Install axios (if not already installed):
```bash
npm install axios
```

4. Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Salons

- `GET /api/salons` - Get all salons
- `GET /api/salons/search?query=searchTerm` - Search salons
- `GET /api/salons/:id` - Get salon by ID
- `POST /api/salons` - Create new salon
- `PUT /api/salons/:id` - Update salon
- `DELETE /api/salons/:id` - Delete salon

### Bookings

- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:id` - Get booking by ID
- `GET /api/bookings/salon/:salonId` - Get bookings by salon
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id/status` - Update booking status
- `DELETE /api/bookings/:id` - Delete booking

## Usage

1. **View Salons**: The homepage displays all registered salons with their ratings, locations, and services.

2. **Search**: Use the search bar in the hero section to search for salons by name, location, or service type.

3. **Register Salon**: 
   - Scroll to the "Register Your Salon" section
   - Fill in salon information (name, contact, email, location)
   - Add services with pricing
   - Click "Register Salon"

4. **Book Appointment**:
   - Click "View Details" on any salon card
   - Fill in the booking form with your details
   - Select a service, date, and time
   - Submit the booking

## Design Features

- Modern gradient header with sticky navigation
- Hero section with search functionality
- Responsive salon cards with hover effects
- Modal popup for salon details and booking
- Beautiful color scheme (Purple primary, Red secondary)
- Smooth scrolling and animations
- Mobile-responsive design

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/salon-booking
```

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
