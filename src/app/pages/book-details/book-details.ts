import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService, Book } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { OrderService } from '../../services/order';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './book-details.html',
  styleUrl: './book-details.css'
})
export class BookDetailsComponent implements OnInit {
  book!: Book;

  constructor(private route: ActivatedRoute, private bookService: BookService, private order: OrderService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.bookService.getBookById(id).subscribe({
        next: (data) => {
          this.book = data;
        },
        error: (err) => {
          console.error('Book not found:', err);
        }
      });
    }
  }
  goBack(): void {
  history.back(); 
}
  addOrder(book: Book) {
    const imageUrl = book.imageUrl;
    const title = book.title;
    const order = {
      bookId: book.id, 
      price: book.price, 
      quantity: 1,
      bookTitle: book.title,
      bookImageUrl: book.imageUrl
    };
    console.log("is image going through this ? " + book.id);
    this.order.addOrder(order); 
  }
}
