import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MoneyTransferComponent } from './money-transfer/money-transfer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { HttpClientModule } from '@angular/common/http';
import { DateSortByDescPipe } from './shared/pipes/date-sort-by-desc.pipe';
import { BbUIModule } from './bb-ui/bb-ui.module';

@NgModule({
  declarations: [
    AppComponent,
    MoneyTransferComponent,
    TransactionListComponent,
    DateSortByDescPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BbUIModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
