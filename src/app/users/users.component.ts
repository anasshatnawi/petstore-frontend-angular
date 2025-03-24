import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../lib/types';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  imports: [FormsModule, CommonModule],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  newUser: User = {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    status: '',
  };

  editingUser: User | null = null; // For editing

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.usersService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  createUser() {
    this.usersService.createUser(this.newUser).subscribe(() => {
      this.fetchUsers();
      this.newUser = {
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        status: '',
      };
    });
  }

  deleteUser(id?: number) {
    this.usersService.deleteUser(id).subscribe(() => this.fetchUsers());
  }

  editUser(user: User) {
    this.editingUser = { ...user }; // Clone the user data into editing form
  }

  updateUser() {
    if (!this.editingUser || !this.editingUser.id) return;

    this.usersService
      .updateUser(this.editingUser.id, this.editingUser)
      .subscribe(() => {
        this.fetchUsers();
        this.editingUser = null; // Reset editing
      });
  }

  cancelEdit() {
    this.editingUser = null;
  }
}
