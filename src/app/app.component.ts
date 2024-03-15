import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; 


export interface BitcoinPrice {
  bpi:        { [key: string]: number };
  disclaimer: string;
  time:       Time;
}

export interface Time {
  updated:    string;
  updatedISO: Date;
}

export interface BitcoinsToShow {
  date: string;
  value: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
   
}
