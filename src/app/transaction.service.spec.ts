import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import { TransactionService } from './transaction.service';
import { Spy } from 'jasmine-auto-spies';
import { map } from 'rxjs/operators';


describe('TransactionService', () => {
  let transactionService: TransactionService;
  let httpSpy: Spy<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule], 
      providers: [TransactionService]
    });
    transactionService = TestBed.inject(TransactionService);
  });

  it('should be created', () => {
    expect(transactionService).toBeTruthy();
  });

  // it('should create a update transaction', (done: DoneFn) => {

  //   var newTransaction = {
  //     id: 1, 
  //     date: "2019-11-27T15:59:07.054Z", 
  //     type: "sell", 
  //     security: "test",
  //     shares: "",
  //     value: 100,
  //     cashflow: 100
  //   };

  //   var expectedTransaction = {
  //     id: 1, 
  //     date: "2019-11-27T15:59:07.054Z", 
  //     type: "sell", 
  //     security: "test",
  //     shares: "",
  //     value: 100,
  //     cashflow: 100
  //   };

  //   //httpSpy.post.and.nextWith(newTransaction);

  //   transactionService.updateTransaction(newTransaction);

  //   expect(newTransaction).toEqual(expectedTransaction);
  //   //expect(httpSpy.post.calls.count()).toBe(1);
  // });

});
