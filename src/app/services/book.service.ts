import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Book {
  id: number;
  title: string;
  description: string; 
  price: number;
  imageUrl: string;
  authorId: number;
  categoryId: number;
  isbn: string;
  inventory: number;
  authorName: string;
  categoryName: string;
}
@Injectable({ providedIn: 'root' })
export class BookService {
  // API Endpoints:
  // GET all books: localhost:5274/api/Book
  // GET book by ID: localhost:5274/api/Book/{Id}
  // POST create book: localhost:5274/api/Book (without ID)
  // PUT update book: localhost:5274/api/Book/{Id}
  // DELETE book: localhost:5274/api/Book/{Id}
  private apiUrl = 'http://localhost:5274/api/Book'; // Your backend endpoint

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }
  
  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }
  
  getBookByAuthor(id: number): Observable<Book[]>{
    return this.http.get<Book[]>(`${this.apiUrl}/by-author/${id}`);
  }

  addBook(book: Book): Observable<Book> {
    const token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    // Remove id from the book object when creating (backend will assign it)
    const { id, ...bookWithoutId } = book;
    return this.http.post<Book>(this.apiUrl, bookWithoutId, { headers });
  }

  updateBook(book: Book): Observable<Book> {
    const token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.put<Book>(`${this.apiUrl}/${book.id}`, book, { headers });
  }

  deleteBook(id: number): Observable<any> {
    // DELETE with ID in URL path - handle text response
    const token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.delete(`${this.apiUrl}/${id}`, { 
      headers,
      responseType: 'text' // Expect text response instead of JSON
    });
  }
}
