import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService, Book } from '../../services/book.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { routes } from '../../app.routes';
import { OrderService } from '../../services/order';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule],
  templateUrl: './books.html',
  styleUrls: ['./books.css']
})
export class Books implements OnInit {
  books: Book[] = [];
  booksOrder: number[] = [];
  groupedBooks: { [category: string]: Book[] } = {};
  filteredBooks: { [category: string]: Book[] } = {};
  availableCategories: string[] = [];
  selectedCategory: string = '';

  constructor(
    private bookService: BookService,
    private order: OrderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log("Hello can you hear me");
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.groupedBooks = this.groupByCategory(this.books);
        this.initializeFilters();
        
        // Check for search query parameter
        this.route.queryParams.subscribe(params => {
          const searchQuery = params['search'];
          if (searchQuery) {
            this.filterBooksBySearch(searchQuery);
          }
        });
        
        console.log('Books loaded:', this.books);
        console.log('Grouped books:', this.groupedBooks);
      },
      error: (err) => {
        console.error('Failed to load books:', err);
      }
    });
  }

  groupByCategory(books: Book[]): { [category: string]: Book[] } {
    return books.reduce((acc, book) => {
      const category = book.categoryName || 'Uncategorized';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(book);
      return acc;
    }, {} as { [category: string]: Book[] });
  }

  // Initialize the filter dropdown and set initial filtered books
  initializeFilters() {
    // Extract available categories from groupedBooks
    this.availableCategories = Object.keys(this.groupedBooks);
    // Initially show all books
    this.filteredBooks = { ...this.groupedBooks };
  }

  // Handle category selection change
  onCategoryChange() {
    if (this.selectedCategory === '') {
      // Show all categories
      this.filteredBooks = { ...this.groupedBooks };
    } else {
      // Show only selected category
      this.filteredBooks = {
        [this.selectedCategory]: this.groupedBooks[this.selectedCategory] || []
      };
    }
  }

  // Call this method whenever groupedBooks is updated
  updateGroupedBooks(newGroupedBooks: { [key: string]: Book[] }) {
    this.groupedBooks = newGroupedBooks;
    this.initializeFilters();
  }

  // Filter books by search query
  filterBooksBySearch(searchQuery: string) {
    const query = searchQuery.toLowerCase().trim();
    const filteredBooks = this.books.filter(book => 
      book.title.toLowerCase().includes(query) ||
      book.authorName.toLowerCase().includes(query) ||
      book.categoryName.toLowerCase().includes(query) ||
      book.description.toLowerCase().includes(query)
    );
    
    this.groupedBooks = this.groupByCategory(filteredBooks);
    this.initializeFilters();
  }

  addOrder(book: Book) {
    const imageUrl = book.imageUrl;
    const title = book.title;
    const order = {
      bookId: book.id, // make sure 'id' is correct
      price: book.price, // make sure 'price' is a property
      quantity: 1,
      bookTitle: book.title,
      bookImageUrl: book.imageUrl
    };
    console.log("is image going through this ? " + book.id);
    this.order.addOrder(order); // Calls method inside the child
  }

  scrollToBooks() {
    const booksContainer = document.querySelector('.books-container');
    if (booksContainer) {
      booksContainer.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}
