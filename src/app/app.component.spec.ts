import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { Spy } from 'jasmine-auto-spies';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { TransactionService } from './transaction.service';

describe('AppComponent', () => {
  let transactionService: TransactionService;
  let httpClientSpy: Spy<HttpClient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [HttpClientTestingModule, HttpClientModule, FormsModule], 
      providers: [TransactionService]
    }).compileComponents();

    transactionService = TestBed.inject(TransactionService);
    httpClientSpy = TestBed.inject<any>(HttpClient);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'stockopedia'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('stockopedia');
  });

  it('should CumulativeCashFlow', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    // Arrange
    const expectedValue = 27380;
    const transactions = [
      {
        cashflow: 32000,
        date: "2019-01-01T09:45:00.000Z",
        id: 5,
        type: "deposit",
        value: 32000
      },
      {
        cashflow: -5005,
        date: "2019-01-02T09:34:02.000Z",
        id: 17,
        security: "Carr's",
        shares: 317,
        type: "buy",
        value: 5005
      },
      {
        cashflow: 227,
        date: "2019-02-04T10:30:55.999Z",
        id: 101,
        security: "Scs",
        shares: -50,
        type: "sell",
        value: 227
      },
      {
        cashflow: 158,
        date: "2019-12-12T14:08:19.954Z",
        id: 665,
        security: "Carr's",
        shares: -31,
        type: "sell",
        value: 158
      }
    ];

    // Act
    const cummulativeCashFlow = app.getCumulativeCashFlow(transactions);

    // Assert
    expect(cummulativeCashFlow).toBe(expectedValue);
  });

  // it('should create a new transaction', (done: DoneFn) => {

  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;

  //   var expectedTransaction = {
  //     id: 0, 
  //     date: "2019-11-27T15:59:07.054Z", 
  //     type: "sell", 
  //     security: "test",
  //     shares: "",
  //     value: 100,
  //     cashflow: 100
  //   };

  //   const newTransaction = <NgForm>{
  //     value: {
  //       date: "2019-11-27T15:59:07.054Z", 
  //       type: "sell", 
  //       security: "test",
  //       shares: "",
  //       value: 100,
  //       cashflow: 100
  //     }
  // };
    
  // //httpClientSpy.post.and.returnValue(newTransaction);

  //   const returnTransaction = app.addTransaction(newTransaction);
  //   // Assert
  //   expect(returnTransaction).toEqual();
  // });


  // it('should return expected transations (HttpClient called once)', (done: DoneFn) => {

  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;

  //   const expectedTransactions = [
  //       {
  //         cashflow: 32000,
  //         date: "2019-01-01T09:45:00.000Z",
  //         id: 5,
  //         type: "deposit",
  //         value: 32000
  //       },
  //       {
  //         cashflow: -5005,
  //         date: "2019-01-02T09:34:02.000Z",
  //         id: 17,
  //         security: "Carr's",
  //         shares: 317,
  //         type: "buy",
  //         value: 5005
  //       },
  //       {
  //         cashflow: 227,
  //         date: "2019-02-04T10:30:55.999Z",
  //         id: 101,
  //         security: "Scs",
  //         shares: -50,
  //         type: "sell",
  //         value: 227
  //       },
  //       {
  //         cashflow: 158,
  //         date: "2019-12-12T14:08:19.954Z",
  //         id: 665,
  //         security: "Carr's",
  //         shares: -31,
  //         type: "sell",
  //         value: 158
  //       }
  //     ];
  
  //   app.getTransactions();
  //   expect(expectedTransactions.length).toEqual(4);
  // });
  
})
