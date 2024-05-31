import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class LocalService {

  key = "local321";

  constructor() {
  }

  public saveData(key: string, value: any) {
    const stringValue =  JSON.stringify(value)
    localStorage.setItem(key, this.encrypt(stringValue));
  }

  public getData(key: string) {
    let data = localStorage.getItem(key) || "";
    data = this.decrypt(data);
    if(!data) {
      return null;
    }
    return JSON.parse(data);
  }

  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }

  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.key).toString();
  }

  private decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(CryptoJS.enc.Utf8);
  }
}
