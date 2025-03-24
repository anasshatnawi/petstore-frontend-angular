import { Component, OnInit } from '@angular/core';
import { PetsService } from './pets.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Pet } from '../../lib/types';

type FrontPet = {
  id?: number;
  name: string;
  category: string;
  tags: string;
  photoUrls: string;
  status: string;
};

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class PetsComponent implements OnInit {
  pets: Pet[] = [];

  newPet: FrontPet = {
    name: '',
    category: '',
    tags: '',
    photoUrls: '',
    status: '',
  };

  editingPet: FrontPet | null = null; // For editing

  constructor(private petsService: PetsService) {}

  ngOnInit() {
    this.fetchPets();
  }

  fetchPets() {
    this.petsService.getPets().subscribe((data) => {
      this.pets = data;
    });
  }

  createPet() {
    this.petsService
      .createPet({
        ...this.newPet,
        photoUrls: this.newPet.photoUrls
          .split(',')
          .filter((url: string) => url.trim() !== ''),
      })
      .subscribe(() => {
        this.fetchPets();
        this.newPet = {
          name: '',
          category: '',
          tags: '',
          photoUrls: '',
          status: '',
        };
      });
  }

  deletePet(id?: number) {
    this.petsService.deletePet(id).subscribe(() => this.fetchPets());
  }

  editPet(pet: Pet) {
    this.editingPet = { ...pet, photoUrls: pet.photoUrls.join(',') }; // Clone pet data for editing
  }

  updatePet() {
    if (!this.editingPet || !this.editingPet.id) return;

    this.petsService
      .updatePet(this.editingPet.id, {
        ...this.editingPet,
        photoUrls: this.editingPet.photoUrls
          .split(',')
          .filter((url: string) => url.trim() !== ''),
      })
      .subscribe(() => {
        this.fetchPets();
        this.editingPet = null; // Reset editing
      });
  }

  cancelEdit() {
    this.editingPet = null;
  }
}
