import { Injectable } from '@angular/core';
import * as ElectronStore from 'electron-store';

@Injectable({
  providedIn: 'root'
})
export class ElectronStoreService {
  private store: ElectronStore | undefined;
  constructor() {
    if (window.require) {
      try {
        const storeClass = window.require("electron-store");
        this.store = new storeClass();
      } catch (e) {
        throw e;
      }
    } else {
      console.warn("electron-store was not loaded");
    }
   }

   get = <T>(key: string): T => {
    if(!this.store) {
      console.warn("electron-store was not loaded");
      return {} as T;
    }
    return this.store.get(key) as T;
   }

   set = (key: string, value: any): void => {
    if(!this.store) {
      console.warn("electron-store was not loaded");
      return;
    }
     this.store.set(key, value);
   }
}