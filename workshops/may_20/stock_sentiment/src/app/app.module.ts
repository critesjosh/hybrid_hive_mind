import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StockAnalyzerComponent } from './components/stock-analyzer/stock-analyzer.component';
import { StockService } from './services/stock.service';

@NgModule({
  declarations: [
    AppComponent,
    StockAnalyzerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [StockService],
  bootstrap: [AppComponent]
})
export class AppModule { } 