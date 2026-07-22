# Bigreams

Bigreams is a React and Tailwind CSS storefront for premium fabrics, tailoring, and ready-to-wear products. It includes a responsive shopping experience, a persistent browser cart, guest checkout, and MongoDB-backed orders and reviews.

## Main features

- Responsive React storefront with Tailwind CSS
- Fabric categories and best-selling products
- Product information drawer for fabric categories
- Cart with quantity controls, removal, totals, and browser persistence
- Guest checkout without requiring an account
- MongoDB order storage with generated order references
- Post-order star rating and review storage
- Sticky responsive navigation with cart item count

## Technology

### Frontend

- React 19
- Vite
- Tailwind CSS
- React Router
- React Scroll
- Lucide React

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- CORS
- dotenv

## Project structure

```text
bassingment/
├── README.md
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/                 # Product, hero, logo, and blog images
│   │   ├── components/             # Reusable storefront components
│   │   │   ├── drawer/              # Product details and order form drawer
│   │   │   ├── BestSeller.jsx
│   │   │   ├── FabricCategories.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ProductCard.jsx
│   │   ├── context/
│   │   │   ├── CartContext.jsx      # Shared cart state and localStorage sync
│   │   │   └── useCart.js           # Cart context hook
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Cart.jsx              # Cart, checkout, confirmation, and review
│   │   │   └── Customize.jsx
│   │   ├── services/
│   │   │   └── api.js               # Shared backend request helper
│   │   ├── App.jsx                  # Frontend routes and global navbar
│   │   └── main.jsx                 # React entry point and CartProvider
│   ├── package.json
│   └── vite.config.js
└── server/
    ├── config/
    │   └── db.js                    # MongoDB connection
    ├── controllers/
    │   └── guestOrderController.js  # Guest orders and reviews
    ├── models/
    │   ├── guestOrder.js             # Guest order document schema
    │   └── guestReview.js             # Order review schema
    ├── routes/
    │   └── guestRoutes.js             # Public checkout and review routes
    ├── app.js                        # Express middleware and API mounting
    ├── index.js                      # Database connection and server startup
    ├── package.json
    └── .env                          # Local database and server configuration
```

## How the application works

### Storefront flow

1. `main.jsx` wraps the application in `CartProvider`.
2. `Home.jsx` renders the landing page sections, including `BestSeller` and `FabricCategories`.
3. `ProductCard` calls `addToCart(product)` when its cart icon is selected.
4. `CartContext` stores cart items in React state and synchronizes them to `localStorage`.
5. `Navbar` reads `cartCount` from the same context and links to `/cart`.

### Fabric drawer flow

1. `FabricCategories` keeps the selected fabric in component state.
2. Clicking a fabric card's “Shop Now” button selects that product.
3. `ProductDrawer` opens and displays the selected image, title, category, price, and description.
4. Closing the drawer clears the selected product.

### Checkout and review flow

1. The customer reviews cart items on `/cart` and enters delivery details.
2. `Cart.jsx` sends the customer, items, and notes to `POST /api/orders` through `services/api.js`.
3. The backend validates the request, calculates the total, creates an order number, and saves a `GuestOrder` document in MongoDB.
4. After success, the frontend clears the cart and displays the order reference.
5. The customer can submit a rating and comment.
6. `POST /api/reviews` verifies the order number and email, then saves a `GuestReview` linked to that order.

## API endpoints

The backend runs with the `/api` prefix.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/health` | Check server availability |
| `POST` | `/api/orders` | Create a guest order |
| `GET` | `/api/orders/lookup?orderNumber=...&email=...` | Look up an order |
| `POST` | `/api/reviews` | Submit one review for an order |
| `GET` | `/api/reviews` | Read recent guest reviews |

### Create order request

```json
{
  "customer": {
    "name": "Aarav Sharma",
    "email": "aarav@example.com",
    "phone": "+91 9876543210",
    "address": "12 Park Street",
    "city": "Kolkata",
    "state": "West Bengal",
    "pincode": "700016"
  },
  "items": [
    {
      "id": "tartan-red-checkered-fabric",
      "title": "Unstitched Tartan Red Checkered Fabric",
      "price": 289,
      "quantity": 1,
      "image": "/assets/fabric1.jpg"
    }
  ],
  "notes": "Please call before delivery"
}
```

## Local setup

### Requirements

- Node.js 18 or newer
- MongoDB running locally or a MongoDB connection string

### Start the backend

```bash
cd server
npm install
```

Create or update `server/.env`:

```env
DB=mongodb://localhost:27017/sales-backend
PORT=3000
CLIENT_URL=http://localhost:5173
```

Start the API:

```bash
node index.js
```

The backend is available at `http://localhost:3000`.

### Start the frontend

```bash
cd client
npm install
npm run dev
```

The Vite development server normally runs at `http://localhost:5173`.

To use a different API URL, create `client/.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

## Useful commands

From `client/`:

```bash
npm run dev       # Start development server
npm run build     # Create production build
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

## Notes

- Guest cart contents are stored in the browser. Orders and reviews are stored in MongoDB.
- The current checkout records the order and review; payment processing is not connected yet.
- The server must be running and MongoDB must be reachable for checkout and reviews to work.
