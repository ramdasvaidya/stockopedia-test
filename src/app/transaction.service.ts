import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  // Http header
  headers = new HttpHeaders({'Content-Type':'application/json;'})

  constructor(public http: HttpClient) { }

  /*
  * Get transaction
  * Param: 
  * Return: reponse object
  */
  getTransactions() {
    return this.http.get('/transactions').pipe(
      map((response: any) => {
        return response;
      })
    );
  }

 /*
  * Add transaction
  * Param: transation object
  * Return: reponse object
  */
  addTransaction(transaction:any) {
    transaction.value = transaction.value * 100;
    transaction.cashflow = transaction.value;
    const transactionDate = new Date(transaction.date);
    transaction.date = transactionDate.toISOString();

    // Remove id
    delete transaction.id;
    return this.http.post('transactions', JSON.stringify(transaction), {headers: this.headers}).pipe(
      map((response: any) => {
        return response;
      })
    ); 
  }

  /*
  * Update transaction
  * Param: transation object
  * Return: reponse object
  */
  updateTransaction(transaction:any) {
    return this.http.put(`transactions/${transaction.id}`, JSON.stringify(transaction), {headers: this.headers}).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  /*
  * Delete transaction
  * Param: transactionId
  * Return: reponse object
  */
  deleteTransaction(id:any) {
    return this.http.delete(`/transactions/${id}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
