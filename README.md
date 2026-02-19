# Web Application with Google Sheets & R2 Storage

A modern full-stack web application built with **Next.js 15** that uses **Google Sheets as a database** and **Cloudflare R2** for image storage. This project implements a complete CMS for managing car dealership inventory, categories, site settings, and user administration with a clean architecture pattern.

## 🚀 Features

### Core Functionality

- ✅ **Complete CRUD Operations** for 5 entity systems:
  - Cars Inventory Management (with slug auto-generation)
  - Categories Management
  - Site Settings Configuration
  - Menu Management (for additional products)
  - User Administration
- 🔐 **JWT Authentication System**
  - Access & refresh tokens
  - HttpOnly cookies + Bearer token support
  - Protected API routes with middleware

- 📸 **Multi-Image Upload**
  - Primary image selection
  - Upload to Cloudflare R2 storage
  - Multiple images per entity

- 🎨 **User Interface**
  - Admin dashboard for content management
  - Public-facing car listing and detail pages
  - Responsive design with Tailwind CSS
  - Toast notifications and modals

- 🏗️ **Clean Architecture**
  - Layered structure: Routes → Services → Repositories → Infrastructure
  - Complete separation of concerns
  - Type-safe with TypeScript

## 🛠️ Tech Stack

### Frontend

- **Next.js 15.5.12** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Styling
- **Geist Font** - Modern typography

### Backend

- **Google Sheets API** - Primary database (googleapis v171.2.0)
- **Cloudflare R2** - S3-compatible object storage for images
- **JWT** - Authentication (jsonwebtoken v9.0.3)
- **bcryptjs** - Password hashing

### Build Tools

- **Turbopack** - Fast bundler
- **ESLint 9** - Code linting
- **PostCSS** - CSS processing

## 📁 Project Structure

```
src/
├── app/
│   ├── (admin)/              # Admin dashboard pages
│   │   ├── admin-showroom/   # Car management UI
│   │   ├── categories/       # Category management UI
│   │   └── site-settings/    # Settings UI
│   ├── (user)/               # Public-facing pages
│   │   ├── cars/             # Car listing & detail pages
│   │   └── about/            # About page
│   └── api/                  # RESTful API endpoints
│       ├── cars/             # Car CRUD endpoints
│       ├── categories/       # Category CRUD endpoints
│       ├── site-settings/    # Settings CRUD endpoints
│       └── auth/             # Authentication endpoints
│
├── server/                   # Backend logic (Clean Architecture)
│   ├── auth/                 # JWT & authentication middleware
│   ├── service/              # Business logic layer
│   ├── repositories/         # Data access layer (Google Sheets)
│   ├── storage/              # R2 storage service
│   └── infra/                # External service clients
│
├── components/               # Reusable UI components
│   └── ui/                   # Button, Card, Table, Modal, etc.
│
├── features/                 # Feature-based UI modules
│   ├── cars/                 # Car listing view
│   ├── car-detail/           # Car detail view
│   └── admin-showroom/       # Admin features
│
├── hooks/                    # Custom React hooks
│   ├── useCars.ts
│   ├── useCategories.ts
│   └── useAuth.ts
│
├── services/                 # Frontend API service layer
│   ├── cars.service.ts
│   └── auth.service.ts
│
└── types/                    # TypeScript type definitions
    ├── cars.type.ts
    ├── categories.type.ts
    └── user.type.ts
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ installed
- Google Cloud account with Sheets API enabled
- Cloudflare account with R2 bucket created
- Service account credentials from Google Cloud

### Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd web-with-sheets-r2
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up Google Sheets**
   - Create a new Google Spreadsheet
   - Create sheets named: `cars`, `categories`, `site-settings`, `user-admins`, `menu`, `about`
   - Set up proper column headers (see Database Schema section)

4. **Configure Google Cloud Service Account**
   - Download service account JSON from Google Cloud Console
   - Save as `key_service_account.json` in project root
   - Share your Google Sheet with the service account email

5. **Set up Cloudflare R2**
   - Create an R2 bucket
   - Generate API tokens
   - Configure CORS if needed

6. **Configure environment variables**

Create a `.env.local` file in the project root:

```env
# Google Sheets Configuration
GOOGLE_SHEET_ID=your_spreadsheet_id_here

# Cloudflare R2 Storage
R2_ENDPOINT=https://your_account_id.r2.cloudflarestorage.com
R2_ACCESS_KEY=your_r2_access_key
R2_SECRET_KEY=your_r2_secret_key
R2_BUCKET=your-bucket-name
R2_PUBLIC_URL=https://pub-xxx.r2.dev

# JWT Authentication
JWT_SECRET_KEY=your_secret_key_here
JWT_EXPIRES_IN=3600

# Node Environment
NODE_ENV=development
```

7. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🗄️ Database Schema (Google Sheets)

### Sheet: `cars`

| Column | Field             | Type       | Description                     |
| ------ | ----------------- | ---------- | ------------------------------- |
| A      | id                | string     | Unique ID (CAR-{timestamp})     |
| B      | category          | string     | Car category                    |
| C      | title             | string     | Car title/edition               |
| D      | slug              | string     | URL-friendly slug               |
| E      | brand             | string     | Manufacturer brand              |
| F      | model             | string     | Car model                       |
| G      | year              | number     | Manufacturing year              |
| H      | price             | number     | Price in local currency         |
| I      | mileage           | number     | Mileage in km                   |
| J      | transmission      | string     | automatic/manual                |
| K      | fuel_type         | string     | gasoline/diesel/electric/hybrid |
| L      | condition         | string     | new/used                        |
| M      | seats             | number     | Number of seats                 |
| N      | engine_cc         | number     | Engine displacement             |
| O      | color             | string     | Car color                       |
| P      | status            | string     | available/sold/reserved         |
| Q      | is_featured       | boolean    | Featured on homepage            |
| R      | primary_image_url | string     | Main display image              |
| S      | image_urls        | string     | Comma-separated image URLs      |
| T      | description       | text       | Full description                |
| U      | created_at        | ISO string | Timestamp                       |

### Sheet: `categories`

| Column | Field      | Type       | Description     |
| ------ | ---------- | ---------- | --------------- |
| A      | id         | string     | CAT-{timestamp} |
| B      | name       | string     | Category name   |
| C      | created_at | ISO string | Timestamp       |
| D      | updated_at | ISO string | Timestamp       |

### Sheet: `site-settings`

| Column | Field            | Type       | Description      |
| ------ | ---------------- | ---------- | ---------------- |
| A      | id               | string     | SITE-{timestamp} |
| B      | whatsapp_number  | string     | Contact number   |
| C      | showroom_address | string     | Physical address |
| D      | instagram        | string     | Instagram handle |
| E      | google_maps      | string     | Google Maps URL  |
| F      | email            | string     | Contact email    |
| G      | opening_hours    | string     | Business hours   |
| H      | created_at       | ISO string | Timestamp        |

### Sheet: `user-admins`

| Column | Field    | Type   | Description     |
| ------ | -------- | ------ | --------------- |
| A      | name     | string | Admin name      |
| B      | username | string | Login username  |
| C      | password | string | Hashed password |

## 🔌 API Endpoints

### Authentication

| Method | Endpoint          | Auth | Description              |
| ------ | ----------------- | ---- | ------------------------ |
| POST   | `/api/auth/login` | ❌   | User login (returns JWT) |

### Cars Management

| Method | Endpoint         | Auth | Description            |
| ------ | ---------------- | ---- | ---------------------- |
| GET    | `/api/cars`      | ❌   | List cars (paginated)  |
| POST   | `/api/cars`      | ✅   | Create car with images |
| GET    | `/api/cars/[id]` | ❌   | Get single car         |
| PUT    | `/api/cars/[id]` | ✅   | Update car             |
| DELETE | `/api/cars/[id]` | ✅   | Delete car             |

### Categories Management

| Method | Endpoint               | Auth | Description     |
| ------ | ---------------------- | ---- | --------------- |
| GET    | `/api/categories`      | ❌   | List categories |
| POST   | `/api/categories`      | ✅   | Create category |
| GET    | `/api/categories/[id]` | ❌   | Get category    |
| PUT    | `/api/categories/[id]` | ✅   | Update category |
| DELETE | `/api/categories/[id]` | ✅   | Delete category |

### Site Settings

| Method | Endpoint                  | Auth | Description     |
| ------ | ------------------------- | ---- | --------------- |
| GET    | `/api/site-settings`      | ❌   | Get settings    |
| POST   | `/api/site-settings`      | ✅   | Create settings |
| PUT    | `/api/site-settings/[id]` | ✅   | Update settings |
| DELETE | `/api/site-settings/[id]` | ✅   | Delete settings |

**Note:** ✅ = Requires JWT token in `Authorization: Bearer {token}` header or `accessToken` cookie

## 🏗️ Architecture

This project follows **Clean Architecture** principles with clear separation of concerns:

```
┌─────────────────────────────────────┐
│     API Routes (Route Handlers)     │  ← HTTP layer
├─────────────────────────────────────┤
│          Service Layer              │  ← Business logic
├─────────────────────────────────────┤
│        Repository Layer             │  ← Data access
├─────────────────────────────────────┤
│    Infrastructure Layer             │  ← External services
│  (Google Sheets Client, R2 Client)  │
└─────────────────────────────────────┘
```

### Key Design Patterns

- **Repository Pattern** - Abstracts data access
- **Service Layer Pattern** - Encapsulates business logic
- **Middleware Pattern** - Authentication & authorization
- **DTO Pattern** - Type-safe data transfer objects
- **Mapper Pattern** - Entity transformations (cars module)

## 🔒 Security Notes

⚠️ **Important Security Considerations:**

1. **Password Hashing**: Ensure bcryptjs is properly implemented for password storage
2. **JWT Secret**: Use strong, random secret keys in production
3. **Environment Variables**: Never commit `.env.local` to version control
4. **Service Account**: Protect `key_service_account.json` - add to `.gitignore`
5. **CORS**: Configure R2 bucket CORS for production domains
6. **Rate Limiting**: Consider adding rate limiting for API endpoints

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables in Vercel dashboard
4. Upload `key_service_account.json` content to environment variable
5. Deploy!

### Environment Setup for Production

```bash
# Set NODE_ENV to production
NODE_ENV=production

# Use secure cookies
# Ensure JWT_SECRET_KEY is cryptographically secure
# Configure R2_PUBLIC_URL with your production CDN
```

## 📝 Development Scripts

```bash
# Development
npm run dev          # Start dev server with Turbopack

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Google Sheets API](https://developers.google.com/sheets/api) - Database solution
- [Cloudflare R2](https://www.cloudflare.com/products/r2/) - Object storage
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework

## 📧 Support

For support, email your-email@example.com or open an issue in the repository.

---

**Built with ❤️ using Next.js 15 & Google Sheets**
