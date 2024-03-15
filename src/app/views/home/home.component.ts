import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { ElectronStoreService } from '../../electron-sotre.service';
import { StoreKeys } from '../../utils/storeKeys';


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
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  
  bitcoinsPricesLastTwoWeeks: BitcoinPrice;
  bitcoinsToShow: BitcoinsToShow[] = [];


  constructor(private electronStoreService: ElectronStoreService, private router: Router) {
    this.bitcoinsPricesLastTwoWeeks = this.electronStoreService.get(StoreKeys.BitcoinsPrices);
  }

  navigateToDetails(date: string) {
    this.router.navigate([`details/${date}`]);
  }

  ngOnInit(): void {
      const keys = Object.keys(this.bitcoinsPricesLastTwoWeeks.bpi);
      keys.forEach(key => {
        this.bitcoinsToShow.push({date: key, value: this.bitcoinsPricesLastTwoWeeks.bpi[key]});
      });
      this.bitcoinsToShow.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      })
  }

}
