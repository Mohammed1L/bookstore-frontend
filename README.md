<img width="1470" height="837" alt="Screenshot 1447-02-15 at 5 23 56 PM" src="https://github.com/user-attachments/assets/474c3256-36fb-4caf-974c-dc194716875e" /># BookstoreFrontend
# 📚 Bookstore Project

The **Bookstore Project** is a full-stack web application for buying and selling books.  
It is designed as a training project to apply best practices in **full-stack development**.

---

## 🚀 Tech Stack

**Frontend:**  
- TypeScript  
- Angular  
- CSS  
- HTML  

**Backend:**  
- C#  
- .NET  
- MS SQL  

**Other Tools & Services:**  
- Azure DevOps  
- GitHub  

---

## 📌 Project Phases

1. **Documentation & Design**  
   - Design a loosely coupled yet cohesive system.

2. **Backend Implementation**  
   - Build RESTful APIs and integrate with database.

3. **Frontend Implementation**  
   - Build interactive UI and connect to backend.

---
## 📌 Pictures
   <img width="1470" height="844" alt="Screenshot 1447-02-15 at 5 23 03 PM" src="https://github.com/user-attachments/assets/2beefaae-18ce-4de3-840c-8b37f7792a2c" />
<img width="1470" height="691" alt="Screenshot 1447-02-15 at 5 24 35 PM" src="https://github.com/user-attachments/assets/949e6b09-416c-4029-8fd0-bacf96c6593b" />
<img width="1436" height="834" alt="Screenshot 1447-02-15 at 5 25 48 PM" src="https://github.com/user-attachments/assets/aa576afd-27a5-4e6b-9f31-d01f0093fe30" />
<img width="1470" height="835" alt="Screenshot 1447-02-15 at 5 16 36 PM" src="https://github.com/user-attachments/assets/8555bab4-fd76-41d5-8569-1807b8c66056" />
<img width="1470" height="833" alt="Screenshot 1447-02-15 at 5 27 36 PM" src="https://github.com/user-attachments/assets/9279b081-3b6d-4a47-8845-9c4acffaf2aa" />
<img width="1469" height="834" alt="Screenshot 1447-02-15 at 5 19 26 PM" src="https://github.com/user-attachments/assets/03aa473e-362f-490a-b589-d5fb72561ffd" />
<img width="1470" height="715" alt="Screenshot 1447-02-15 at 5 20 34 PM" src="https://github.com/user-attachments/assets/edac8a10-fe73-405d-96a9-0d179d74564c" />
<img width="1470" height="841" alt="Screenshot 1447-02-15 at 5 21 07 PM" src="https://github.com/user-attachments/assets/0b6e7272-ad35-4157-97d3-c2227c62953a" />
![Uploading Screenshot 1447-02-15 at 5.23.56 PM.png…]()









---
## 👥 User Roles

- **Admin**  
  - Add sellers  
  - Edit user and seller data  
  - Manage permissions  

- **Seller**  
  - Add books  

- **Regular User**  
  - Create an account  
  - Buy books  

---

## 🗄️ ER Diagram

<img width="845" height="585" alt="image" src="https://github.com/user-attachments/assets/3320df17-7712-4b18-8f0f-f3ba44cfef07" />


---

## 🔄 Flow Chart

<img width="860" height="470" alt="image" src="https://github.com/user-attachments/assets/5b93eaa6-be24-4edd-87f0-b167ce5b449a" />


---

## 📜 Sequence Diagrams

- **Addin a book to cart**  
  <img width="834" height="481" alt="image" src="https://github.com/user-attachments/assets/d4b8d548-d063-47c1-85d1-45705f92ba22" />
 

- **Book Purchase**  
  <img width="817" height="385" alt="image" src="https://github.com/user-attachments/assets/94a9ec55-f10c-406a-ada7-aff81736fe2c" />


---

## 🌐 API Endpoints
### **Authentication (AuthController)**
| Method | Endpoint | Request Body | Response |
|--------|----------|--------------|----------|
| POST | `/api/auth/register` | `{ name, email, password, role }` | **201 Created** `{ success: true, message: "User registered successfully.", data: { user, token }, errors: null }` |
| POST | `/api/auth/login` | `{ email, password }` | **200 OK** `{ success: true, message: "Login successful.", data: { user, token }, errors: null }` |

---

### **Books (BookController)**
| Method | Endpoint | Request Body | Response |
|--------|----------|--------------|----------|
| GET | `/api/books` | – | **200 OK** `{ success: true, message: "Books retrieved successfully.", data: [ … ], errors: null }` |
| GET | `/api/books/{id}` | – | **200 OK** `{ success: true, message: "Book details fetched successfully.", data: { book }, errors: null }` |
| POST | `/api/books` | `{ title, authorId, price, categoryIds[], inventory }` | **201 Created** `{ success: true, message: "Book created successfully.", data: { bookId }, errors: null }` |
| PUT | `/api/books/{id}` | `{ title?, price?, inventory? }` | **200 OK** `{ success: true, message: "Book updated successfully.", data: null, errors: null }` |
| DELETE | `/api/books/{id}` | – | **204 No Content** `{ success: true, message: "Book deleted successfully.", data: null, errors: null }` |

---

### **Orders (OrderController)**
| Method | Endpoint | Request Body | Response |
|--------|----------|--------------|----------|
| GET | `/api/order` | – | **200 OK** `{ success: true, message: "Orders retrieved successfully.", data: [ … ], errors: null }` |
| GET | `/api/order/{id}` | – | **200 OK** `{ success: true, message: "Order details fetched successfully.", data: { order, items }, errors: null }` |
| POST | `/api/order` | `{ items: [{ bookId, quantity }] }` | **201 Created** `{ success: true, message: "Order placed successfully.", data: { orderId }, errors: null }` |
| PUT | `/api/order/{id}` | `{ items: [{ bookId, quantity }] }` | **200 OK** `{ success: true, message: "Order updated successfully.", data: null, errors: null }` |
| DELETE | `/api/order/{id}` | – | **204 No Content** `{ success: true, message: "Order deleted successfully.", data: null, errors: null }` |

---

### **Users (UserController)**
| Method | Endpoint | Request Body | Response |
|--------|----------|--------------|----------|
| GET | `/api/user` | – | **200 OK** `{ success: true, message: "Users retrieved successfully.", data: [ … ], errors: null }` |
| GET | `/api/user/{id}` | – | **200 OK** `{ success: true, message: "User details fetched successfully.", data: { user }, errors: null }` |
| POST | `/api/user` | `{ name, email, password, role }` | **201 Created** `{ success: true, message: "User created successfully.", data: { userId }, errors: null }` |
| PUT | `/api/user/{id}` | `{ roleName?, name?, email?, password? }` | **200 OK** `{ success: true, message: "User updated successfully.", data: null, errors: null }` |
| DELETE | `/api/user/{id}` | – | **204 No Content** `{ success: true, message: "User deleted successfully.", data: null, errors: null }` |

---

## 🌐 Wireframes

<img width="797" height="366" alt="image" src="https://github.com/user-attachments/assets/f3c49c2f-c937-40d1-be13-58f5f0d8fc81" />



## 📄 License
This project is for educational purposes.
This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
