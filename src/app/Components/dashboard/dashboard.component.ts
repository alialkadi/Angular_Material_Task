import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { UserSatate } from '../../states/user.state';
import { Router, Event, NavigationEnd, RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/Book.model';
import { BookService } from '../../Services/book.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    RouterOutlet,
    RouterModule,
    MatPaginatorModule,
    MatTableModule,
    MatCardModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isDarkTheme = false;
  @Select(UserSatate.getUserInfo) user$!: Observable<User>;
  public loggedInUser!: User;
  sidenavOpened = false;
  constructor(private store: Store, private router: Router,private bookService: BookService) { 
   
  }
  
  displayedColumns: string[] = ['id', 'title', 'author', 'publication_year', 'genre', 'description'];
  dataSource = new MatTableDataSource<Book>(); // MatTableDataSource for data handling

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {
    this.user$.subscribe(user => {
      this.loggedInUser = user;
      console.log('User from dashboard:', this.loggedInUser);
    });
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        console.log('NavigationEnd:', event);
      }
    });

    this.bookService.getBooks().subscribe((data: Book[]) => {
      this.dataSource.data = data; 
      this.dataSource.paginator = this.paginator;
    });
  }

  toggleSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
  }
  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    document.body.classList.toggle('dark-theme', this.isDarkTheme);
    document.body.classList.toggle('light-theme', !this.isDarkTheme);
  }
}
