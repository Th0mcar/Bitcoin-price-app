import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { ElectronStoreService } from '../../electron-sotre.service';
import { StoreKeys } from '../../utils/storeKeys';
import { IpcService } from '../../ipc.service';


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

export class HomeComponent implements OnInit, OnDestroy {
  
  bitcoinsPricesLastTwoWeeks: BitcoinPrice | undefined;
  bitcoinsToShow: BitcoinsToShow[] = [];  

  constructor(private electronStoreService: ElectronStoreService, private router: Router, private ipcService : IpcService,  private cdRef: ChangeDetectorRef) {
    ipcService.on("update-current-price", () => {
      this.showBitcoinsPrices();
    }); 
    this.ipcService.send("get-current-price");
  }

  navigateToDetails(date: string) {
    this.router.navigate([`details/${date}`]);
  }

  ngOnInit(): void {
      this.showBitcoinsPrices();
  }

  showBitcoinsPrices = () => {
    this.bitcoinsToShow = [];
    this.bitcoinsPricesLastTwoWeeks = this.electronStoreService.get(StoreKeys.BitcoinsPrices);
    const keys = Object.keys(this.bitcoinsPricesLastTwoWeeks!.bpi);
      keys.forEach(key => {
        this.bitcoinsToShow.push({date: key, value: this.bitcoinsPricesLastTwoWeeks!.bpi[key]});
      });
      this.bitcoinsToShow.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      this.cdRef.detectChanges();
  }

  ngOnDestroy() {
    this.ipcService.removeAllListeners("update-current-price");
  }

}