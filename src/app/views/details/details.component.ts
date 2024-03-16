import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ElectronStoreService } from '../../electron-sotre.service';
import { StoreKeys } from '../../utils/storeKeys';
import { BitcoinPrice } from '../../app.component';
import { IpcService } from '../../ipc.service';

export interface Currency {
  meta:     Meta;
  response: Response;
  date:     Date;
  base:     string;
  rates:    { [key: string]: number };
}

export interface Meta {
  code:       number;
  disclaimer: string;
}

export interface Response {
  date:  Date;
  base:  string;
  rates: { [key: string]: number };
}

export interface Prices {
  code: string;
  value: number;
}


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnDestroy {

  date: string = "";
  currentPriceUSD: number = 0;
  prices : Prices[] = [];

  currencyData: Currency | undefined;

  constructor(private electronStoreService: ElectronStoreService, private activatedRoute: ActivatedRoute, private router: Router, private ipcService : IpcService,  private cdRef: ChangeDetectorRef) {
    ipcService.on("update-current-price", () => {
      this.showDetails();
    });  
    this.ipcService.send("get-current-price");
  } 

  showDetails () {
    this.date = this.activatedRoute.snapshot.paramMap.get('date') || "";
    this.currentPriceUSD = this.electronStoreService.get<BitcoinPrice>(StoreKeys.BitcoinsPrices).bpi[this.date] || 0;
    this.currencyData = this.electronStoreService.get<Currency>(StoreKeys.CurrencyData);

    if (this.currencyData) {
      this.prices.push({code: "USD", value: this.currentPriceUSD});
      this.prices.push({code: "EUR", value: this.currentPriceUSD * this.currencyData.rates["EUR"]});
      this.prices.push({code: "COP", value: this.currentPriceUSD * this.currencyData.rates["COP"]});
    }

    this.cdRef.detectChanges();
  }
  
  goBack() {
    this.router.navigate([""]);
  }

  ngOnDestroy() {
    this.ipcService.removeAllListeners("update-current-price");
  }

}