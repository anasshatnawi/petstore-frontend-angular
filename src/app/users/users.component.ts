import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../lib/types';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
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

  createUser(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.usersService.createUser(this.newUser).subscribe(() => {
      this.newUser = {
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        status: '',
      };
      form.resetForm(); // Reset the form after successful submission
    });
  }

  deleteUser(id?: number) {
    console.log(id);
    this.usersService.deleteUser(id).subscribe();
  }

  editUser(user: User) {
    this.editingUser = { ...user }; // Clone the user data into editing form
  }

  updateUser(form: NgForm) {
    if (!this.editingUser || !this.editingUser.id) return;

    if (form.invalid) {
      return;
    }

    this.usersService
      .updateUser(this.editingUser.id, this.editingUser)
      .subscribe(() => {
        this.editingUser = null; // Reset editing
      });
  }

  cancelEdit() {
    this.editingUser = null;
  }

  print() {
    console.log('test');
  }
}
