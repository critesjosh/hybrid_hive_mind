import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  async analyzeSentiment(symbol: string): Promise<any> {
    try {
      const response = await this.http
        .post(`${this.apiUrl}/stocks/analyze`, { symbol })
        .toPromise();
      return response;
    } catch (error) {
      throw new Error('Failed to analyze sentiment');
    }
  }

  async getHistoricalData(symbol: string): Promise<any> {
    try {
      const response = await this.http
        .get(`${this.apiUrl}/stocks/${symbol}/history`)
        .toPromise();
      return response;
    } catch (error) {
      throw new Error('Failed to fetch historical data');
    }
  }

  async getCurrentPrice(symbol: string): Promise<any> {
    try {
      const response = await this.http
        .get(`${this.apiUrl}/stocks/${symbol}/price`)
        .toPromise();
      return response;
    } catch (error) {
      throw new Error('Failed to fetch current price');
    }
  }
} 