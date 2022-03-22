import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TransactionService } from './transaction.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TransactionService]
})

export class AppComponent {
  title = 'stockopedia';
  transactions:any = [];
  cumulativeCashFlow:any = 0;
  // 1 - Add, 2 - Update, 3 - Delete
  showMessage:Number = 0;
  transactionData: any = { id: 0, date: "", type: "", security: "", shares: "", value: "" };

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {

    // function call: Get transactions
    this.getTransactions(); 
  }
 
  /*
  * Get transactions
  * Param: 
  * Return: 
  */
  getTransactions() {
    this.transactionService.getTransactions()
    .subscribe(async (response:any) => {
      this.transactions = response.transactions;
      this.cumulativeCashFlow = this.getCumulativeCashFlow(this.transactions);
    });
  }

  /*
  * Add transaction and update transaction
  * Param: transaction object
  * Return: void 
  */
  addTransaction(transactionForm: NgForm) {

    if(transactionForm.value.id > 0) {
      this.transactionService.updateTransaction(transactionForm.value)
      .subscribe((response: any) => {
          this.showMessage = 2;

          // Update existing transaction object
          this.transactions = this.transactions.map((transaction:any) => {
            if(transaction.id == transactionForm.value.id) {
              return Object.assign({}, transaction, {
                id: transactionForm.value.id, 
                date: transactionForm.value.date, 
                type: transactionForm.value.type, 
                security: transactionForm.value.security,
                shares: transactionForm.value.shares,
                value: transactionForm.value.value * 100,
                cashflow: transactionForm.value.value * 100
              });
            }
            return transaction
          });

          // Calculate cummulativeCashFlow
          this.cumulativeCashFlow = this.getCumulativeCashFlow(this.transactions);
          
          // Reset form
          this.resetForm();
        }
      )
    } else {
      this.showMessage = 1;
      this.transactionService.addTransaction(transactionForm.value)
      .subscribe( (response: any) => {
          this.showMessage = 1;

          // Add newly added transaction
          this.transactions.push(response);

          // Calculate cummulativeCashFlow
          this.cumulativeCashFlow = this.getCumulativeCashFlow(this.transactions);

          // Reset form
          this.resetForm();
        }
      )
    }
  }

  /*
  * Update transactions fill form values
  * Param: transaction object
  * Return: void 
  */
  updateTransaction(transaction:any) {
    this.transactionData = { 
      id: transaction.id, 
      date: formatDate( transaction.date, 'yyyy-MM-dd', 'en-UK'), 
      type: transaction.type, 
      security: transaction.security,
      shares: transaction.shares,
      value: transaction.value/100 
    };
  }

  /*
  * Delete transaction 
  * Param: transactionId
  * Return: void 
  */
  deleteTransaction(transactionId:any) {
    this.transactionService.deleteTransaction(transactionId)
    .subscribe(async (response:any) => {

      // Remove delete transaction
      this.transactions = this.transactions.filter((transaction:any) => transaction.id != transactionId);
      this.showMessage = 3;
      // Calculate cummulativeCashFlow
      this.cumulativeCashFlow = this.getCumulativeCashFlow(this.transactions);
    });
  }

  /*
  * Get CummulativeCashFlow
  * Param: transaction object
  * Return: cummulativeCashFlow
  */
  getCumulativeCashFlow(transactions:any) {
    return transactions.reduce((total:any, transaction:any) => {
      if(Math.sign(transaction.cashflow) === -1) {
          return total - Math.abs(transaction.cashflow);
        } else {
          return total + Math.abs(transaction.cashflow);
        }
    }, 0);
  }

  /*
  * Reset form field and move to add transaction state
  * Param: 
  * Return: void
  */
  resetForm() {
    this.transactionData = { 
      id: 0, 
      date: "", 
      type: "", 
      security: "", 
      shares: "", 
      value: ""
    };
  }
}
