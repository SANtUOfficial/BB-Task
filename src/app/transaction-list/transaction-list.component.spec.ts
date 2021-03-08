import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterPipe } from '../shared/pipes/filter.pipe';
import { DateSortByDescPipe } from './../shared/pipes/date-sort-by-desc.pipe';
import { TransactionListComponent } from './transaction-list.component';

describe('TransactionListComponent', () => {
  let component: TransactionListComponent;
  let fixture: ComponentFixture<TransactionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [TransactionListComponent, DateSortByDescPipe, FilterPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign filter value to filterString property', () => {
    component.filterString = '';
    component.filterValue('sa');
    expect(component.filterString).toEqual('sa');
  });
});
