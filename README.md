# 🏡 WanderLust

WanderLust is a full-stack Airbnb-inspired web application where users can discover, create, edit, and review property listings.

The project is built with **Node.js, Express.js, MongoDB, EJS, and Bootstrap**, with authentication, image uploads, reviews, validation, and interactive maps.

## ✨ Features

* 🔐 User authentication and authorization
* 🏠 Create, view, edit, and delete property listings
* 🖼️ Upload listing images using Cloudinary
* ⭐ Add and delete reviews with ratings
* 🗺️ Display listing locations using Mapbox
* 📍 Store geographic coordinates for listings
* ✅ Server-side validation using Joi
* 🚨 Custom error handling
* 🔒 Protected routes for authenticated users
* 💬 Flash messages for success and error notifications
* 📱 Responsive design for desktop, tablet, and mobile
* 💰 Listing price formatting
* 🗃️ MongoDB database with Mongoose
* 🧹 Cascade deletion of associated reviews when a listing is deleted

## 🛠️ Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript
* EJS
* EJS-Mate
* Bootstrap 5
* Font Awesome

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Passport.js
* Passport-Local-Mongoose
* Joi
* Multer
* Cloudinary
* Mapbox

### Development Tools

* Git
* GitHub
* VS Code
* MongoDB Atlas
* Render

## 📁 Project Structure

```text
WanderLust/
│
├── controllers/
│
├── models/
│   ├── Listing.js
│   ├── Review.js
│   └── User.js
│
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
│
├── views/
│   ├── layouts/
│   │   └── boilerplate.ejs
│   │
│   ├── listings/
│   │   ├── index.ejs
│   │   ├── show.ejs
│   │   ├── new.ejs
│   │   ├── edit.ejs
│   │   └── error.ejs
│   │
│   └── users/
│
├── public/
│   ├── css/
│   │   └── style.css
│   └── js/
│
├── data/
│   └── data.js
│
├── schemaValidation.js
├── app.js
├── package.json
├── .env
└── README.md
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/mashrursifar/airbnb.git
```

### 2. Navigate into the project

```bash
cd airbnb
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the root directory:

```env
ATLASDB_URL=your_mongodb_atlas_connection_string

SECRET=your_session_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret

MAP_TOKEN=your_mapbox_access_token
```

> Never commit your `.env` file to GitHub.

### 5. Start the application

```bash
node app.js
```

For development, you can also use:

```bash
nodemon app.js
```

The application will run at:

```text
http://localhost:8080
```

## 🗄️ Database

WanderLust uses **MongoDB** with **Mongoose**.

The main collections are:

### Users

Stores registered user information and authentication data.

### Listings

Stores property information such as:

* Title
* Description
* Image
* Price
* Location
* Country
* Owner
* Geographic coordinates
* Reviews

### Reviews

Stores:

* Rating
* Comment
* Author
* Listing reference
* Timestamp

## 🔐 Authentication

Authentication is implemented using:

* Passport.js
* Passport-Local
* Passport-Local-Mongoose
* Express Session
* Connect-Mongo

Users can:

* Register
* Login
* Logout
* Create listings
* Edit their own listings
* Delete their own listings
* Add reviews
* Delete their own reviews

Protected routes require the user to be authenticated.

## 🖼️ Image Upload

Listing images are uploaded using **Multer** and stored on **Cloudinary**.

The application stores the Cloudinary image URL and filename in MongoDB instead of storing image files directly on the server.

Example:

```javascript
image: {
    url: String,
    filename: String
}
```

## 🗺️ Map Integration

WanderLust uses **Mapbox** to display the location of each listing.

Listings contain geographic coordinates using GeoJSON:

```javascript
geometry: {
    type: {
        type: String,
        enum: ["Point"],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
}
```

These coordinates are used to place markers on the map.

## ⭐ Reviews and Ratings

Authenticated users can submit reviews for listings.

Each review contains:

```text
Rating
Comment
Author
Listing
Created At
```

Reviews are associated with their corresponding listing using MongoDB references.

When a listing is deleted, its associated reviews can also be removed to keep the database clean.

## ✅ Validation

Listing data is validated using **Joi** before being stored in the database.

Validation includes fields such as:

* Title
* Description
* Price
* Location
* Country
* Image URL

Invalid requests are handled using custom Express error handling.

## 🚨 Error Handling

The project uses custom error handling with:

```text
ExpressError
wrapAsync
```

`wrapAsync` is used to handle asynchronous Express routes without repeatedly writing `try/catch` blocks.

Example:

```javascript
router.get(
    "/:id",
    wrapAsync(async (req, res) => {
        // route logic
    })
);
```

## 📱 Responsive Design

The frontend is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile devices

Bootstrap's responsive grid system is used together with custom CSS.

## 🚀 Deployment

The application can be deployed using platforms such as **Render**.

A production deployment requires environment variables to be configured on the hosting platform.

Required services include:

* MongoDB Atlas
* Cloudinary
* Mapbox

## 🔮 Future Improvements

Some possible improvements for future versions:

* 🔎 Advanced listing search
* 🏷️ Listing categories and filters
* ❤️ Wishlist/favorite listings
* 📅 Booking functionality
* 💳 Online payments
* 📩 Email notifications
* 🔔 Real-time notifications
* 👤 User profile pages
* 🧭 Improved map search
* 🖼️ Multiple image uploads
* ☁️ Better image optimization
* 📊 Admin dashboard

## 🎯 Project Purpose

This project was developed as a practical full-stack web development project to understand how a real-world application works from frontend to backend.

It demonstrates concepts including:

* RESTful routing
* MVC architecture
* CRUD operations
* Authentication and authorization
* Database relationships
* File uploads
* API integration
* Server-side validation
* Error handling
* Session management
* Responsive UI
* Cloud deployment

## 👨‍💻 Author

**Mashrur Sifar**

BSc in Computer Science & Engineering
Daffodil International University

GitHub: [mashrursifar](https://github.com/mashrursifar)

---

⭐ If you find this project useful, consider giving it a star!
