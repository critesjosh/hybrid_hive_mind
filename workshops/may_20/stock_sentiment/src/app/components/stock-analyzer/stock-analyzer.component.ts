import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StockService } from '../../services/stock.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-stock-analyzer',
  template: `
    <div class="analyzer-container">
      <form [formGroup]="stockForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <input 
            type="text" 
            formControlName="symbol"
            placeholder="Enter stock symbol (e.g., AAPL)"
            class="form-control"
          >
        </div>
        <button type="submit" [disabled]="!stockForm.valid || loading">
          {{ loading ? 'Analyzing...' : 'Analyze Stock' }}
        </button>
      </form>

      <div *ngIf="error" class="error">
        {{ error }}
      </div>

      <div *ngIf="analysisResult" class="results">
        <div class="metrics">
          <div class="metric-card">
            <h3>Sentiment Score</h3>
            <p [ngClass]="getSentimentClass()">{{ analysisResult.sentimentScore }}</p>
          </div>
          <div class="metric-card">
            <h3>Tweet Volume</h3>
            <p>{{ analysisResult.tweetCount }}</p>
          </div>
        </div>

        <div class="chart-container">
          <canvas id="stockChart"></canvas>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .analyzer-container {
      max-width: 800px;
      margin: 0 auto;
    }
    .form-group {
      margin-bottom: 20px;
    }
    .form-control {
      width: 100%;
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    button {
      width: 100%;
      padding: 12px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:disabled {
      background-color: #ccc;
    }
    .error {
      color: red;
      margin: 10px 0;
    }
    .metrics {
      display: flex;
      justify-content: space-between;
      margin: 20px 0;
    }
    .metric-card {
      flex: 1;
      margin: 0 10px;
      padding: 15px;
      background-color: #f8f9fa;
      border-radius: 4px;
      text-align: center;
    }
    .positive { color: green; }
    .negative { color: red; }
    .neutral { color: gray; }
    .chart-container {
      margin-top: 20px;
      height: 400px;
    }
  `]
})
export class StockAnalyzerComponent implements OnInit {
  stockForm: FormGroup;
  loading = false;
  error: string | null = null;
  analysisResult: any = null;
  chart: any;

  constructor(
    private fb: FormBuilder,
    private stockService: StockService
  ) {
    this.stockForm = this.fb.group({
      symbol: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit() {}

  async onSubmit() {
    if (this.stockForm.valid) {
      this.loading = true;
      this.error = null;
      const symbol = this.stockForm.get('symbol')?.value.toUpperCase();

      try {
        const [sentiment, history] = await Promise.all([
          this.stockService.analyzeSentiment(symbol),
          this.stockService.getHistoricalData(symbol)
        ]);

        this.analysisResult = sentiment;
        this.updateChart(history);
      } catch (err: any) {
        this.error = err.message || 'An error occurred';
      } finally {
        this.loading = false;
      }
    }
  }

  getSentimentClass() {
    if (!this.analysisResult) return 'neutral';
    const score = parseFloat(this.analysisResult.sentimentScore);
    if (score > 0.5) return 'positive';
    if (score < -0.5) return 'negative';
    return 'neutral';
  }

  private updateChart(historicalData: any[]) {
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = document.getElementById('stockChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: historicalData.map(d => new Date(d.date).toLocaleDateString()),
        datasets: [{
          label: 'Stock Price',
          data: historicalData.map(d => d.close),
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Stock Price History'
          }
        }
      }
    });
  }
} 