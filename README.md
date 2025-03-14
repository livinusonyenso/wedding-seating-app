# Wedding Seat app

## Overview
The **Wedding Seat app** is a web application that allows wedding guests to quickly find their assigned seats. It provides a seamless experience for guests to search for their table, view the wedding hall layout, and register for a seat if they are not on the guest list.

## Features
- **Guest Search**: Guests can search for their assigned table by entering their name.
- **Table Layout View**: Displays a wedding hall layout with assigned seating.
- **Guest Registration**: Unregistered guests can check in and be assigned to available tables.
- **Real-Time Updates**: Seat availability is dynamically updated when guests claim tables.
- **User-Friendly Interface**: Designed to be accessible for all ages with a responsive UI.

## Tech Stack
- **Frontend**: Next.js, React

## Project Structure
```plaintext
📂 project-root
 ├── 📁 components      # Reusable components (TableLayout, SearchGuest, GuestForm)
 ├── 📁 pages           # Next.js pages (EventPage, API routes)
 ├── 📁 styles          # CSS Module files for styling
 ├── 📄 page.tsx        # Main event page
 ├── 📄 SearchGuest.tsx # Search guest component
 ├── 📄 TableLayout.tsx # Displays wedding hall layout with tables
 ├── 📄 GuestForm.tsx   # Guest registration form
 ├── 📄 README.md       # Documentation
```

## Installation & Setup
### Clone the repository
```sh
git clone https://github.com/livinusonyenso/wedding-seating-app.git
```

### Navigate to the project directory
```sh
cd wedding-seat-app
```

### Install dependencies
```sh
npm install
```

### Run the development server
```sh
npm run dev
```

### Open in browser
Visit [http://localhost:3000](http://localhost:3000) to access the app.

## API Endpoints
### GET /api/event/:id
Retrieves wedding event details and table layout.

### GET /api/event/:id/guests?q={name}
Searches for a guest by name.

### POST /api/event/:id/guest
Registers a new guest and assigns them a table.

## Usage Guide
### Searching for a Guest
1. Enter your name in the search bar.
2. Click "Search" to find your assigned table.

### Registering as a Guest
1. Click "Register" if your name is not found.
2. Fill in your name, phone number, and number of guests.
3. Select an available table and confirm your seat ( in development ) .

## Contribution
We welcome contributions! Feel free to fork this repository and submit pull requests.

## License
This project is licensed under the MIT License.
