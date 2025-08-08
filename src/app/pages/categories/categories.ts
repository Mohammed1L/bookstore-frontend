import { Component, OnInit } from '@angular/core';
import { BookService, Book } from '../../services/book.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './categories.html',
  styleUrls: ['./categories.css']
})
export class CategoriesComponent implements OnInit {
  groupedBooks: { [category: string]: Book[] } = {};

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe({
      next: books => {
        this.groupedBooks = this.groupByCategory(books);
      }
    });
  }

  groupByCategory(books: Book[]): { [category: string]: Book[] } {
    return books.reduce((acc, book) => {
      const key = book.categoryName || 'Uncategorized';
      acc[key] = acc[key] || [];
      acc[key].push(book);
      return acc;
    }, {} as { [category: string]: Book[] });
  }
}
