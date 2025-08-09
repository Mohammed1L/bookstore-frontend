import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService, Book } from '../services/book.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class AdminComponent implements OnInit {
  books: Book[] = [];
  newBook: Partial<Book> = {
    title: '',
    description: '',
    price: 0,
    imageUrl: '',
    authorName: '',
    categoryName: '',
    authorId: 0,
    categoryId: 0,
    isbn: '',
    inventory: 0
  };
  editingBook: Book | null = null;
  isEditing = false;
  selectedFile: File | null = null;

  // Computed properties for form binding
  get formTitle(): string {
    return this.isEditing && this.editingBook ? this.editingBook.title : this.newBook.title || '';
  }

  set formTitle(value: string) {
    if (this.isEditing && this.editingBook) {
      this.editingBook.title = value;
    } else {
      this.newBook.title = value;
    }
  }

  get formAuthorName(): string {
    return this.isEditing && this.editingBook ? this.editingBook.authorName : this.newBook.authorName || '';
  }

  set formAuthorName(value: string) {
    if (this.isEditing && this.editingBook) {
      this.editingBook.authorName = value;
    } else {
      this.newBook.authorName = value;
    }
  }

  get formAuthorId(): number {
    return this.isEditing && this.editingBook ? this.editingBook.authorId : this.newBook.authorId || 0;
  }

  set formAuthorId(value: number) {
    if (this.isEditing && this.editingBook) {
      this.editingBook.authorId = value;
    } else {
      this.newBook.authorId = value;
    }
  }

  get formCategoryName(): string {
    return this.isEditing && this.editingBook ? this.editingBook.categoryName : this.newBook.categoryName || '';
  }

  set formCategoryName(value: string) {
    if (this.isEditing && this.editingBook) {
      this.editingBook.categoryName = value;
    } else {
      this.newBook.categoryName = value;
    }
  }

  get formPrice(): number {
    return this.isEditing && this.editingBook ? this.editingBook.price : this.newBook.price || 0;
  }

  set formPrice(value: number) {
    if (this.isEditing && this.editingBook) {
      this.editingBook.price = value;
    } else {
      this.newBook.price = value;
    }
  }

  get formInventory(): number {
    return this.isEditing && this.editingBook ? this.editingBook.inventory : this.newBook.inventory || 0;
  }

  set formInventory(value: number) {
    if (this.isEditing && this.editingBook) {
      this.editingBook.inventory = value;
    } else {
      this.newBook.inventory = value;
    }
  }

  get formIsbn(): string {
    return this.isEditing && this.editingBook ? this.editingBook.isbn : this.newBook.isbn || '';
  }

  set formIsbn(value: string) {
    if (this.isEditing && this.editingBook) {
      this.editingBook.isbn = value;
    } else {
      this.newBook.isbn = value;
    }
  }

  get formCategoryId(): number {
    return this.isEditing && this.editingBook ? this.editingBook.categoryId : this.newBook.categoryId || 0;
  }

  set formCategoryId(value: number) {
    if (this.isEditing && this.editingBook) {
      this.editingBook.categoryId = value;
    } else {
      this.newBook.categoryId = value;
    }
  }

  get formImageUrl(): string {
    return this.isEditing && this.editingBook ? this.editingBook.imageUrl : this.newBook.imageUrl || '';
  }

  set formImageUrl(value: string) {
    if (this.isEditing && this.editingBook) {
      this.editingBook.imageUrl = value;
    } else {
      this.newBook.imageUrl = value;
    }
  }

  get formDescription(): string {
    return this.isEditing && this.editingBook ? this.editingBook.description : this.newBook.description || '';
  }

  set formDescription(value: string) {
    if (this.isEditing && this.editingBook) {
      this.editingBook.description = value;
    } else {
      this.newBook.description = value;
    }
  }

  constructor(
    private bookService: BookService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe({
      next: (books) => {
        this.books = books;
      },
      error: (error) => {
        console.error('Error loading books:', error);
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadImage(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.selectedFile) {
        resolve('');
        return;
      }

      const formData = new FormData();
      formData.append('image', this.selectedFile);

      this.http.post('https://my-dotnet-backend-123.azurewebsites.net/api/upload', formData)
        .subscribe({
          next: (response: any) => {
            resolve(response.imageUrl);
          },
          error: (error) => {
            console.error('Error uploading image:', error);
            reject(error);
          }
        });
    });
  }

  async addBook() {
    try {
      if (this.selectedFile) {
        const imageUrl = await this.uploadImage();
        this.newBook.imageUrl = imageUrl;
      }

      this.bookService.addBook(this.newBook as Book).subscribe({
        next: () => {
          this.loadBooks();
          this.resetForm();
        },
        error: (error) => {
          console.error('Error adding book:', error);
        }
      });
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }

  editBook(book: Book) {
    this.editingBook = { ...book };
    this.isEditing = true;
  }

  async updateBook() {
    if (!this.editingBook) return;

    try {
      if (this.selectedFile) {
        const imageUrl = await this.uploadImage();
        this.editingBook.imageUrl = imageUrl;
      }

      this.bookService.updateBook(this.editingBook).subscribe({
        next: () => {
          this.loadBooks();
          this.cancelEdit();
        },
        error: (error) => {
          console.error('Error updating book:', error);
        }
      });
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }

  deleteBook(id: number) {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe({
        next: (response) => {
          this.loadBooks();
          console.log('Book deleted successfully:', response);
        },
        error: (error) => {
          console.error('Error deleting book:', error);
          if (error.status === 405) {
            alert('DELETE method not allowed. Please check if the backend supports DELETE operations.');
          } else if (error.status === 404) {
            alert('Book not found or endpoint does not exist.');
          } else {
            alert(`Error deleting book: ${error.message || 'Unknown error'}`);
          }
        }
      });
    }
  }

  cancelEdit() {
    this.editingBook = null;
    this.isEditing = false;
    this.selectedFile = null;
  }

  resetForm() {
    this.newBook = {
      title: '',
      description: '',
      price: 0,
      imageUrl: '',
      authorName: '',
      categoryName: '',
      authorId: 0,
      categoryId: 0,
      isbn: '',
      inventory: 0
    };
    this.selectedFile = null;
  }
} 