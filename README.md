# ExportEzy - Export Management System

ExportEzy is a modern, responsive web application designed to streamline export management, inventory tracking, and shipment monitoring for businesses of all sizes. Built with React, Vite, and Tailwind CSS, it offers an intuitive interface for managing your export operations efficiently.

## 🌟 Features

### 📦 Inventory Management
- Track inventory items with detailed information
- Monitor stock levels with color-coded status indicators
- Filter and search inventory by category, stock level, and keywords
- View item details including SKU, location, supplier, and value
- Responsive design works on desktop and mobile devices

### 🚢 Shipment Tracking
- Monitor active shipments with real-time status updates
- Track shipment progress with visual indicators
- View detailed shipment information including origin, destination, and carrier
- Filter shipments by status, priority, and client

### 👥 Client Management
- Manage client information and contact details
- Track order history and shipment status by client
- View client activity and engagement metrics

### 📊 Dashboard
- Get an overview of key metrics at a glance
- View active shipments, low stock alerts, and recent activities
- Quick access to important actions and reports

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite 4
- **Styling**: Tailwind CSS 3.4, PostCSS
- **Icons**: Lucide React
- **Routing**: React Router DOM 7
- **State Management**: React Hooks (useState, useEffect, useContext)
- **Build Tool**: Vite
- **Code Quality**: ESLint

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone [your-repository-url]
   cd ExportEzy
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## 📂 Project Structure

```
ExportEzy/
├── public/               # Static files
├── src/
│   ├── assets/           # Images, fonts, etc.
│   ├── components/       # Reusable UI components
│   │   ├── ui/           # Base UI components (Card, Button, etc.)
│   │   ├── Layout.jsx    # Main application layout
│   │   └── ...
│   ├── contexts/         # React contexts
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Page components
│   │   ├── Dashboard.jsx
│   │   ├── Inventory.jsx
│   │   ├── Shipments.jsx
│   │   └── Clients.jsx
│   ├── App.jsx           # Main App component
│   └── main.jsx          # Application entry point
├── .gitignore
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## 📝 Mock Data

The application uses mock data for demonstration purposes. The following API endpoints are available:

- `GET /api/inventory` - Get all inventory items
- `GET /api/shipments` - Get all shipments
- `GET /api/clients` - Get all clients
- `GET /api/dashboard/stats` - Get dashboard statistics

### Sample Inventory Item

```json
{
  "id": 1,
  "name": "Electronic Components",
  "description": "Various electronic components and circuits",
  "category": "Electronics",
  "location": "Warehouse A - Section 1",
  "stockLevel": 25,
  "threshold": 50,
  "supplier": "TechSupply Co.",
  "unitPrice": 15.99,
  "value": "₹399.75",
  "sku": "ELEC-001",
  "lastUpdated": "2024-09-18"
}
```

### Sample Shipment

```json
{
  "id": 1,
  "trackingNumber": "SH-2024-001",
  "client": "GlobalTech Inc.",
  "origin": "New York, USA",
  "destination": "London, UK",
  "status": "Delivered",
  "estimatedDelivery": "2024-09-20",
  "actualDelivery": "2024-09-19",
  "carrier": "DHL Express",
  "weight": "125 kg",
  "value": "$15,000",
  "priority": "High",
  "progress": 100,
  "description": "Electronic components for manufacturing"
}
```

## 🎨 Styling

The application uses Tailwind CSS for styling with a custom color palette and responsive design. The main color scheme includes:

- Primary: Blue (#3B82F6)
- Success: Green (#10B981)
- Warning: Yellow (#F59E0B)
- Danger: Red (#EF4444)
- Dark: Gray (#1F2937)
- Light: Gray (#F3F4F6)

## 🧪 Testing

To run the test suite:

```bash
npm test
# or
yarn test
```

## 🏗️ Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/) for the amazing build tooling
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the beautiful icons
- [React](https://reactjs.org/) for the component-based UI library
