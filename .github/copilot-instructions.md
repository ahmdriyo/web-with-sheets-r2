# Project Analysis: Web Application with Google Sheets & R2 Storage

**Analysis Date:** February 10, 2026  
**Project Type:** Next.js 15 Backend API with Google Sheets Database  
**Status:** In Development (Partially Implemented)

---

## 1. Executive Summary

This is a **Next.js 15 API-only backend** that uses **Google Sheets as a database** and **Cloudflare R2** for image storage. The project implements a RESTful API for managing menu items, user authentication, and potentially other entities (cars, categories, site-settings). It follows a **layered architecture** pattern with clear separation between routes, services, and repositories.

**Primary Use Case:** Restaurant/food service menu management system with image uploads and admin authentication.

---

## 2. Technology Stack

### Core Framework

- **Next.js 15.5.12** - React framework with App Router
- **React 19.1.0** - UI library (minimal frontend implementation)
- **TypeScript 5** - Type safety
- **Turbopack** - Build tool (configured in dev/build scripts)

### Backend & Data

- **Google Sheets API (googleapis v171.2.0)** - Primary database
- **Google Cloud Service Account** - Authentication for Sheets API
- **Cloudflare R2 (@aws-sdk/client-s3)** - S3-compatible object storage for images

### Authentication & Security

- **jsonwebtoken (v9.0.3)** - JWT token generation/verification
- **bcryptjs (v3.0.3)** - Password hashing (imported but not actively used)
- **cookie (v1.1.1)** - Cookie parsing for auth tokens

### Development Tools

- **ESLint 9** - Code linting
- **Tailwind CSS 4** - Styling (minimal usage)
- **PostCSS** - CSS processing

---

## 3. Architecture & Design Patterns

### Layered Architecture (Clean Architecture Inspired)

```
┌─────────────────────────────────────┐
│     API Routes (Route Handlers)     │  ← HTTP endpoints
├─────────────────────────────────────┤
│          Service Layer              │  ← Business logic
├─────────────────────────────────────┤
│        Repository Layer             │  ← Data access
├─────────────────────────────────────┤
│    Infrastructure Layer             │  ← External services
│  (Google Sheets Client, R2 Client)  │
└─────────────────────────────────────┘
```

### Key Architectural Decisions

1. **Separation of Concerns**
   - **Routes** (`app/api/*/route.ts`) - Handle HTTP, auth middleware, request/response
   - **Services** (`app/lib/service/`) - Business logic, orchestration
   - **Repositories** (`app/lib/repositories/`) - Direct data operations on Google Sheets
   - **Infrastructure** (`app/lib/infra/`) - External service clients

2. **Middleware Pattern**
   - `authMiddleware()` - Validates JWT tokens, returns auth status
   - Applied at route level before service execution

3. **DTO Pattern**
   - Type definitions separate data transfer objects (CreateMenuDTO, UpdateMenuDTO)

---

## 4. Directory Structure Analysis

```
app/
├── api/                          # API Routes (Next.js 15 App Router)
│   ├── auth/login/route.ts       # ✅ Implemented - User login
│   ├── menu/route.ts             # ✅ Implemented - Menu CRUD
│   ├── menu/[id]/route.ts        # ✅ Implemented - Individual menu operations
│   ├── user-admin/route.ts       # ✅ Implemented - List users
│   ├── cars/route.ts             # ❌ Empty - Placeholder
│   ├── categories/route.ts       # ❌ Empty - Placeholder
│   └── site-settings/route.ts    # ❌ Empty - Placeholder
│
├── lib/                          # Business Logic & Infrastructure
│   ├── auth/                     # Authentication system
│   │   ├── jwt.ts                # JWT verification
│   │   ├── auth.middleware.ts    # Auth middleware with Bearer/Cookie support
│   │   └── index.ts              # Auth exports
│   │
│   ├── infra/                    # External service clients
│   │   └── google.sheets.client.ts  # Google Sheets API client
│   │
│   ├── storage/                  # File storage
│   │   ├── r2.client.ts          # Cloudflare R2 client
│   │   └── r2.service.ts         # Upload functions (single/multiple images)
│   │
│   ├── repositories/             # Data access layer
│   │   ├── menu/                 # ✅ Complete - All CRUD operations
│   │   ├── user-admin/           # ✅ Partial - Read operations only
│   │   ├── auth/                 # ❌ Empty
│   │   └── cars/                 # ❌ Empty
│   │
│   └── service/                  # Business logic layer
│       ├── menu/                 # ✅ Complete - All CRUD services
│       ├── user-admin/           # ❌ Empty
│       ├── auth/                 # ❌ Empty
│       └── cars/                 # ❌ Empty
│
└── types/                        # TypeScript type definitions
    ├── menu.type.ts              # Menu entity types & DTOs
    └── user.type.ts              # User entity types & DTOs
```

---

## 5. Key Components Deep Dive

### 5.1 Google Sheets Integration

**File:** [app/lib/infra/google.sheets.client.ts]

```typescript
// Singleton pattern for Google Sheets client
const auth = new google.auth.GoogleAuth({
  credentials: key_service_account, // Service account JSON
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export const sheetsData = google.sheets({ version: "v4", auth });
```

**Expected Spreadsheet Structure:**

- Sheet: `menu` - Columns: `A:F` (id, title, description, price, category, imageUrl)
- Sheet: `user-admins` - Columns: `A:C` (name, username, password)
- (Likely more sheets for cars, categories, site-settings)

**Data Operations:**

- `GET` - Reads all rows from range `A2:F` (skips header)
- `APPEND` - Adds new rows
- `UPDATE` - Modifies existing rows by row index
- `DELETE` - Clears specific row values

### 5.2 Cloudflare R2 Storage

**File:** [app/lib/storage/r2.service.ts]

**Upload Strategies:**

1. **Multiple Images** (`uploadImages`)
   - Array of files → Array of URLs
   - Naming: `menu/{timestamp}-{filename}`

2. **Single Image** (`uploadSingleImage`)
   - Custom folder support
   - Naming: `{folder}/{timestamp}-{filename}`

**URL Pattern:** `{R2_PUBLIC_URL}/{folder}/{timestamp}-{filename}`

### 5.3 Authentication System

**JWT Implementation:**

- **Access Token:** Short-lived (configurable via `JWT_EXPIRES_IN`)
- **Refresh Token:** 7 days (604800 seconds)
- **Storage:** Both `Authorization: Bearer {token}` header AND `authToken` HttpOnly cookie
- **Verification:** `verifyToken()` checks signature and expiration

**Security Features:**

- HttpOnly cookies (prevents XSS)
- Secure flag in production
- SameSite: lax (CSRF protection)

**⚠️ Security Concern:**

- Passwords stored in plain text in Google Sheets
- No bcrypt usage despite being imported
- Login checks plaintext password match

### 5.4 Menu Management (Fully Implemented)

**API Endpoints:**

- `GET /api/menu` - List menus (paginated)
- `POST /api/menu` - Create menu (with image upload)
- `GET /api/menu/[id]` - Get single menu
- `PUT /api/menu/[id]` - Update menu (optional image update)
- `DELETE /api/menu/[id]` - Delete menu

**Features:**

- Pagination (page, limit query params)
- Multiple image support (comma-separated URLs in Sheets)
- FormData handling for file uploads
- Price formatting (removes dots for storage)

---

## 6. Data Flow Example: Creating a Menu

```
┌──────────────┐
│   Client     │ POST /api/menu with FormData(title, description, price, category, image)
└──────┬───────┘
       │
       ▼
┌─────────────────────────────────────┐
│  app/api/menu/route.ts              │
│  - authMiddleware() checks token    │
│  - Calls createMenu service         │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│  app/lib/service/menu/              │
│  create-menu.service.ts             │
│  - Extracts FormData                │
│  - Validates image presence         │
│  - Uploads images to R2             │
│  - Calls repository                 │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│  app/lib/repositories/menu/         │
│  create-menu.repository.ts          │
│  - Generates ID (MNU-{timestamp})   │
│  - Appends row to Google Sheets     │
│  - Returns success response         │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│  Google Sheets & R2                 │
│  - Row added to 'menu' sheet        │
│  - Images stored in R2 bucket       │
└─────────────────────────────────────┘
```

---

## 7. API Endpoints Summary

### ✅ Implemented Endpoints

| Method | Endpoint          | Auth | Description                    |
| ------ | ----------------- | ---- | ------------------------------ |
| POST   | `/api/auth/login` | ❌   | User login, returns JWT tokens |
| GET    | `/api/menu`       | ✅   | List menus (pagination)        |
| POST   | `/api/menu`       | ✅   | Create menu with images        |
| GET    | `/api/menu/[id]`  | ✅   | Get single menu by ID          |
| PUT    | `/api/menu/[id]`  | ✅   | Update menu (optional image)   |
| DELETE | `/api/menu/[id]`  | ✅   | Delete menu by ID              |
| GET    | `/api/user-admin` | ❌   | List all admin users           |

### ❌ Placeholder Endpoints (Empty Files)

- `/api/cars/*`
- `/api/categories/*`
- `/api/site-settings/*`

---

## 8. Environment Variables Required

Based on code analysis, the following `.env` variables are needed:

```env
# Google Sheets
GOOGLE_SHEET_ID=your_spreadsheet_id

# Cloudflare R2
R2_ENDPOINT=https://your_account_id.r2.cloudflarestorage.com
R2_ACCESS_KEY=your_r2_access_key
R2_SECRET_KEY=your_r2_secret_key
R2_BUCKET=product-images
R2_PUBLIC_URL=https://pub-xxx.r2.dev

# JWT Authentication
JWT_SECRET_KEY=your_secret_key_here
JWT_EXPIRES_IN=3600  # Access token expiration in seconds (1 hour)

# Node Environment
NODE_ENV=development  # or 'production'
```

**Note:** The project includes `key_service_account.json` for Google API authentication.

---

## 9. Development Status & Findings

### ✅ Strengths

1. **Clean Architecture** - Well-separated concerns (routes → services → repositories)
2. **Type Safety** - Comprehensive TypeScript types and DTOs
3. **Modern Stack** - Using latest Next.js 15, React 19, Turbopack
4. **Flexible Auth** - Supports both Bearer tokens and cookies
5. **Pagination** - Implemented for list endpoints
6. **Documentation** - Excellent POSTMAN guide with examples
7. **Multiple Image Support** - Robust file upload handling

### ⚠️ Concerns & Issues

1. **Security Critical:**
   - Passwords stored in **plaintext** in Google Sheets
   - bcryptjs imported but **not used**
   - No password hashing on login

2. **Incomplete Features:**
   - Cars, Categories, Site-Settings endpoints are empty
   - No repository/service implementation for auth and user-admin
   - Refresh token generated but no refresh endpoint

3. **Error Handling:**
   - Generic error messages (`"Failed to fetch menu"`)
   - Password-related errors expose system info
   - No request validation (missing Zod/Joi)

4. **Data Consistency:**
   - No transaction support (Google Sheets limitation)
   - Image deletion not handled when menu deleted
   - Price formatting is ad-hoc (string manipulation)

5. **Code Quality:**
   - Some services in wrong location (repositories have service logic)
   - No input validation on FormData
   - Hardcoded page limits

### 🎯 Partially Implemented

- **Frontend:** Minimal React implementation (only placeholder page)
- **User Admin API:** Only GET endpoint, no create/update/delete
- **Image Management:** Upload works, but no cleanup on deletion

---

## 10. Testing & Development

### Current Scripts

```json
{
  "dev": "next dev --turbopack", // Development with Turbopack
  "build": "next build --turbopack", // Production build
  "start": "next start", // Production server
  "lint": "eslint" // Code linting
}
```

### Testing Recommendations

Based on [POSTMAN_GUIDE.md], testing requires:

- Postman or similar API client
- FormData support (not JSON for image uploads)
- Valid JWT token from `/api/auth/login`

---

## 11. Recommended Improvements

### High Priority (Security)

1. **Implement Password Hashing**

   ```typescript
   // In login route
   const hashedPassword = await bcrypt.hash(password, 10);
   const isValid = await bcrypt.compare(inputPassword, storedHash);
   ```

2. **Add Request Validation**
   - Install Zod: `npm install zod`
   - Validate all FormData/JSON inputs

3. **Environment Variable Validation**
   - Ensure all required env vars are set on startup

### Medium Priority (Features)

1. **Implement Refresh Token Endpoint**
   - `POST /api/auth/refresh` - Exchange refresh token for new access token

2. **Complete CRUD for User Admin**
   - POST, PUT, DELETE for user-admin management

3. **Implement Missing Endpoints**
   - Cars, Categories, Site-Settings

4. **Image Cleanup**
   - Delete images from R2 when menu items are deleted

### Low Priority (Code Quality)

1. **Add Input Validation Layer**
2. **Standardize Error Responses**
3. **Add Logging (Winston/Pino)**
4. **API Documentation (Swagger/OpenAPI)**
5. **Add Unit Tests**

---

## 12. Code Quality Observations

### ✅ Good Practices

- TypeScript strict mode enabled
- Consistent naming conventions
- Modular file structure
- Environment variable usage
- Async/await pattern
- Try-catch error handling

### ⚠️ Areas for Improvement

- No input validation schemas
- Console.error for logging (not production-ready)
- Magic numbers (7 days, row indices)
- No retry logic for external services
- Missing API rate limiting

---

## 13. Database Schema (Google Sheets)

### Sheet: `menu` (Columns A-F)

| Column | Field       | Type         | Example              |
| ------ | ----------- | ------------ | -------------------- |
| A      | id          | string       | MNU-1707234567890    |
| B      | title       | string       | Nasi Goreng          |
| C      | description | string       | Delicious fried rice |
| D      | price       | string       | 25000                |
| E      | category    | string       | Main Course          |
| F      | imageUrl    | string (CSV) | url1,url2,url3       |

### Sheet: `user-admins` (Columns A-C)

| Column | Field    | Type   | Example      |
| ------ | -------- | ------ | ------------ |
| A      | name     | string | Admin User   |
| B      | username | string | admin        |
| C      | password | string | ⚠️ PLAINTEXT |

---

## 14. Dependencies Analysis

### Production Dependencies (9 packages)

- **Critical:** googleapis, @aws-sdk/client-s3, jsonwebtoken
- **Utility:** bcryptjs (unused!), cookie
- **Framework:** next, react, react-dom

### Dev Dependencies (11 packages)

- **Build:** typescript, tailwindcss, postcss
- **Linting:** eslint, eslint-config-next
- **Types:** @types/\*

**Size Optimization Opportunity:** Remove bcryptjs if not implementing password hashing.

---

## 15. Frontend Implementation

**Current State:** Minimal

- Single page component (`app/page.tsx`) - displays test image
- Basic Tailwind CSS setup
- Geist fonts configured
- No interactive UI components

**Expected Use:** This appears to be a **backend API project** meant to be consumed by a separate frontend application (mobile app, web dashboard, etc.)

---

## 16. Development Workflow

1. **Setup:**

   ```bash
   npm install
   # Configure .env with all required variables
   # Add key_service_account.json from Google Cloud Console
   ```

2. **Run Development:**

   ```bash
   npm run dev  # Starts on http://localhost:3000
   ```

3. **Test APIs:**
   - Use Postman with provided guide
   - Login first to get JWT token
   - Use Bearer token for protected endpoints

4. **Deploy:**
   ```bash
   npm run build
   npm start
   ```

---

## 17. Technology Choices Rationale

### Why Google Sheets as Database?

**Pros:**

- No database infrastructure needed
- Easy data inspection/editing
- Low cost (free tier available)
- Familiar interface for non-technical users
- Real-time collaboration

**Cons:**

- Slow for large datasets (>10k rows)
- No ACID transactions
- API rate limits (100 requests/100 seconds)
- No relational integrity
- Limited query capabilities

**Verdict:** Suitable for **MVP/small-scale applications** with <1000 records and low concurrent users.

### Why Cloudflare R2?

- S3-compatible API (familiar developer experience)
- No egress fees (vs AWS S3)
- Global CDN included
- Cost-effective for image storage

---

## 18. Scalability Considerations

### Current Bottlenecks

1. **Google Sheets API Limits**
   - 100 requests per 100 seconds per user
   - 500 requests per 100 seconds per project

2. **No Caching Layer**
   - Every request hits Sheets API
   - No Redis/memory cache

3. **Sequential Image Uploads**
   - Could be parallelized

### Migration Path (Future)

If scaling beyond 10k users or 5k records:

1. Migrate to PostgreSQL/MongoDB
2. Add Redis caching
3. Use CDN for images
4. Implement database connection pooling

---

## 19. Conclusion

This is a **well-architected backend API** project using Next.js 15 with an unconventional choice of Google Sheets as the database. The code demonstrates **professional patterns** (layered architecture, TypeScript, JWT auth) but has **critical security gaps** (plaintext passwords) and **incomplete features** (placeholder endpoints).

**Best Use Case:** Small-scale restaurant menu management system, prototype/MVP, or learning project.

**Not Suitable For:** High-traffic production applications, applications requiring ACID compliance, systems with sensitive user data (without significant security improvements).

---

## 20. Quick Reference

### File Naming Conventions

- Routes: `route.ts` (Next.js App Router convention)
- Services: `{action}-{entity}.service.ts` (e.g., `create-menu.service.ts`)
- Repositories: `{action}-{entity}.repository.ts`
- Types: `{entity}.type.ts`

### ID Generation Pattern

```typescript
`MNU-${Date.now()}`; // Menu: MNU-1707234567890
// Expected pattern for other entities:
// CAR-{timestamp}, USR-{timestamp}, etc.
```

### Common Response Format

```json
{
  "message": "Success message",
  "status": 200,
  "data": {
    /* entity data */
  },
  "pagination": {
    /* for list endpoints */
  }
}
```

---

**Last Updated:** February 10, 2026  
**Analyzed By:** GitHub Copilot (Claude Sonnet 4.5)  
**Project Version:** 0.1.0
