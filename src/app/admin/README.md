# Admin Dashboard

## Overview
The Admin Dashboard provides a comprehensive interface for managing the bookstore inventory. It allows administrators to add, edit, delete, and view books with their associated details.

## Features

### 📚 Book Management
- **Add New Books**: Complete form with all book details
- **Edit Existing Books**: Modify book information including price, quantity, and images
- **Delete Books**: Remove books from inventory with confirmation
- **View All Books**: Comprehensive table view with all book information

### 📊 Inventory Tracking
- **Quantity Management**: Track stock levels for each book
- **Low Stock Alerts**: Visual indicators for books with quantity < 5
- **Price Management**: Set and update book prices
- **Image Management**: Upload and manage book cover images

### 🎨 User Interface
- **Modern Design**: Clean, professional interface with gradient backgrounds
- **Responsive Layout**: Works on desktop, tablet, and mobile devices
- **Interactive Elements**: Hover effects, animations, and smooth transitions
- **Form Validation**: Required field validation and user feedback

## Access
Navigate to `/admin` in your application to access the admin dashboard.

## API Endpoints
The admin dashboard uses the following API endpoints:
- `GET /api/book` - Fetch all books
- `POST /api/book` - Add new book
- `PUT /api/book/{id}` - Update existing book
- `DELETE /api/book/{id}` - Delete book
- `POST /api/upload` - Upload book images

## Security
- Admin route is protected by `AdminGuard`
- Form validation prevents invalid data submission
- Confirmation dialogs for destructive actions

## Usage
1. **Adding a Book**: Fill out the form and click "Add Book"
2. **Editing a Book**: Click the "Edit" button on any book row
3. **Deleting a Book**: Click the "Delete" button and confirm
4. **Uploading Images**: Use the file input or provide an image URL

## Future Enhancements
- Bulk operations (import/export)
- Advanced filtering and search
- Sales analytics and reporting
- User management
- Category management 