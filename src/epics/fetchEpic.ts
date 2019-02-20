import { Action } from 'redux';
import { Observable, of, from } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import {
  CUSTOMER_TYPES,
  PRODUCT_TYPES,
  INVOICE_TYPES,
  INVOICE_ITEMS_TYPES
} from '../types';
import API from '../api';
import {
  CustomerActions,
  ProductActions,
  InvoiceActions,
  InvoiceItemActions
} from '../actions';
import ICustomer from '../models/Customer';
import IProduct from '../models/Product';
import IInvoice from '../models/Invoice';
import IInvoiceItem from '../models/InvoiceItem';

const fetchCustomersEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(CUSTOMER_TYPES.GET_CUSTOMERS_REQUEST),
    switchMap((data: any) => createRequest<ICustomer>(CustomerActions, data))
  );
const fetchProductsEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(PRODUCT_TYPES.GET_PRODUCTS_REQUEST),
    switchMap((data: any) => createRequest<IProduct>(ProductActions, data))
  );
const fetchInvoicesEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(INVOICE_TYPES.GET_INVOICES_REQUEST),
    switchMap((data: any) => createRequest<IInvoice>(InvoiceActions, data))
  );
const fetchInvoiceItemsEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(INVOICE_ITEMS_TYPES.GET_INVOICE_ITEMS_REQUEST),
    switchMap((data: any) => createRequest<IInvoiceItem>(InvoiceItemActions, data))
  );

function createRequest<T>(action: any, data: any) {
  return from(API.fetchAll<T>(data.payload)).pipe(
    map((data: T[]) => action.fetchData(data)),
    catchError(err => of(action.setError(err.message)))
  );
}

export default [
  fetchCustomersEpic,
  fetchProductsEpic,
  fetchInvoiceItemsEpic,
  fetchInvoicesEpic
];
