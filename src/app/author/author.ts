import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookService, Book } from '../services/book.service';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
export interface AuthorDetails {
  bio:string;
  name:string;
  books: []; 

}
@Component({
  selector: 'app-author',
  imports: [NgFor, NgIf, RouterModule],
  templateUrl: './author.html',
  styleUrl: './author.css'
})
export class Author implements OnInit{


 authorId: string | undefined;
 author!: AuthorDetails;
 books!: Book[];
 loading: boolean = true;
 constructor(private route : ActivatedRoute,
  private http : HttpClient ,
private Book: BookService){}


  

  
  ngOnInit() {
  this.authorId =this.route.snapshot.paramMap.get('id')!;
     console.log(this.authorId)
  this.http.get<AuthorDetails>("http://localhost:5274/api/Author/" + this.authorId)
    .subscribe({
      next: data => {
        this.author = data;
        this.loading = false;
        console.log("Author =====", this.author);  // Log here, after data arrives
      },
      error: err => {
        console.error("Error loading author", err);
        this.loading = false;
      }
    });
    this.Book.getBookByAuthor(parseInt(this.authorId)).subscribe({
      next: data => {
      
        this.books = data;
        
        console.log("This is it :" +this.authorId+ this.books+JSON.stringify(this.books, null, 2));
        

      },
      error: err => {console.error("An error appeared, "+err)}
  })
}
  }


  

 


 
 




