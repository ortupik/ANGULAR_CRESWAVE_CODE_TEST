import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  readonly apiBaseUrl = 'https://json-server-kjqy.onrender.com';
}