import { Injectable } from '@angular/core';
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  getImageBase(): string {
    return environment.url
  }
}
