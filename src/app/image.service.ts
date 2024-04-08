import { Injectable } from '@angular/core';
import { environment } from "../enviroments/enviroment";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  getImageBase(): string {
    return environment.url
  }
}
