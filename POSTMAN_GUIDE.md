# How to Send FormData with Image in Postman

## Error Fix

The error "No number after minus sign in JSON" happens when you send JSON to an endpoint expecting FormData.

## Important: Update .env File

Add this line to your `.env` file:

```
R2_PUBLIC_URL=https://pub-YOUR_ACCOUNT_ID.r2.dev
```

**To get your R2 public URL:**

1. Go to Cloudflare Dashboard > R2
2. Select your bucket (`product-images`)
3. Go to Settings tab
4. Enable "Public Access" if not already enabled
5. Copy the "Public R2.dev Subdomain" URL
6. Or use your custom domain if you've set one up

## Postman Setup for Creating Menu (POST)

### 1. Set Authorization

- Tab: **Authorization**
- Type: **Bearer Token**
- Token: [paste your access token from login]

### 2. Configure Request

- Method: **POST**
- URL: `http://localhost:3001/api/menu`

### 3. Set Body (IMPORTANT!)

- Tab: **Body**
- Select: **form-data** (NOT raw JSON!)

### 4. Add Form Fields

Add these key-value pairs:

| KEY         | TYPE | VALUE                  |
| ----------- | ---- | ---------------------- |
| title       | Text | Nasi Goreng            |
| description | Text | Delicious fried rice   |
| price       | Text | 25000                  |
| category    | Text | Main Course            |
| image       | File | [Click "Select Files"] |

**For the image field:**

1. Change dropdown from "Text" to "File"
2. Click "Select Files" button
3. Choose your image file (JPG, PNG, etc.)

### 5. Send Request

Expected Response:

```json
{
  "message": "Menu added!",
  "id": "MNU-1707234567890",
  "imageUrl": "https://pub-xxx.r2.dev/menu/1707234567890-nasi-goreng.jpg"
}
```

## Postman Setup for Updating Menu (PUT)

### 1. Set Authorization

- Tab: **Authorization**
- Type: **Bearer Token**
- Token: [paste your access token]

### 2. Configure Request

- Method: **PUT**
- URL: `http://localhost:3001/api/menu/MNU-1707234567890`

### 3. Set Body

- Tab: **Body**
- Select: **form-data**

### 4. Add Form Fields

To update WITH a new image:
| KEY | TYPE | VALUE |
|-------------|------|----------------------------|
| title | Text | Nasi Goreng Special |
| description | Text | Extra delicious fried rice |
| price | Text | 30000 |
| category | Text | Main Course |
| image | File | [Select new image file] |

To update WITHOUT changing the image (keep existing image):
| KEY | TYPE | VALUE |
|-------------|------|----------------------------|
| title | Text | Nasi Goreng Special |
| description | Text | Extra delicious fried rice |
| price | Text | 30000 |
| category | Text | Main Course |

(Don't include the `image` field at all)

## Common Mistakes to Avoid

❌ **DON'T** select "raw" and "JSON" in Body tab
✅ **DO** select "form-data" in Body tab

❌ **DON'T** send image as base64 string
✅ **DO** select "File" type and upload actual file

❌ **DON'T** forget to set Bearer token
✅ **DO** add Authorization header with valid token

## JavaScript/Fetch Example

```javascript
// 1. Get token
const loginRes = await fetch("http://localhost:3001/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    username: "admin",
    password: "password",
  }),
});
const { data } = await loginRes.json();
const token = data.token.accessToken;

// 2. Create FormData
const formData = new FormData();
formData.append("title", "Nasi Goreng");
formData.append("description", "Delicious fried rice");
formData.append("price", "25000");
formData.append("category", "Main Course");

// 3. Add image from file input
const fileInput = document.querySelector('input[type="file"]');
formData.append("image", fileInput.files[0]);

// 4. Send request
const response = await fetch("http://localhost:3001/api/menu", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    // DON'T set Content-Type - browser will set it automatically with boundary
  },
  body: formData,
});

const result = await response.json();
console.log(result);
```

## React Example with File Upload

```jsx
import { useState } from "react";

function MenuForm() {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    if (file) {
      data.append("image", file);
    }

    const token = localStorage.getItem("accessToken");

    const response = await fetch("http://localhost:3001/api/menu", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });

    const result = await response.json();
    console.log(result);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Price"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
      />
      <input
        type="text"
        placeholder="Category"
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Troubleshooting

### Error: "No number after minus sign in JSON"

**Cause:** Sending JSON instead of FormData
**Fix:** In Postman, select "form-data" NOT "raw JSON"

### Error: "Image is required"

**Cause:** No file uploaded or field name is wrong
**Fix:** Make sure field name is exactly `image` and type is `File`

### Error: "Unauthorized"

**Cause:** Missing or invalid Bearer token
**Fix:** Login first, copy accessToken, add to Authorization > Bearer Token

### Images not showing up

**Cause:** R2_PUBLIC_URL not configured or bucket not public
**Fix:**

1. Add R2_PUBLIC_URL to .env
2. Make sure your R2 bucket has public access enabled
3. Restart your dev server after updating .env
