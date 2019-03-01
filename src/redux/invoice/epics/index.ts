import { isOfType } from 'typesafe-actions';
import { filter, map } from 'rxjs/operators';
import { Epic } from 'redux-observable';
import { RootAction, RootState } from '../../store/types';
import * as INVOICE_ITEMS_TYPES from '../../invoice-item/actions/types';
import * as InvoiceActions from '../actions';
import calculateTotal from '../../../shared/utils/calculateTotal';

import { InvoiceRequest, InvoiceItemRequest } from '../../request/actions';
const { Types: InvoiceTypes, Action } = InvoiceRequest;
const { Types: InvoiceItemTypes } = InvoiceItemRequest;

const calculateTotalEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(
      isOfType([
        InvoiceTypes.FILL_INVOICE,
        InvoiceItemTypes.DELETE_INVOICE_ITEM_SUCCESS,
        InvoiceItemTypes.UPDATE_INVOICE_ITEM_SUCCESS,
        INVOICE_ITEMS_TYPES.ADD_INVOICE_ITEM,
        INVOICE_ITEMS_TYPES.DELETE_INVOICE_ITEMS_LOCAL,
        INVOICE_ITEMS_TYPES.EDIT_INVOICE_ITEMS_LOCAL
      ])
    ),
    map(() => {
      const { invoiceItem, product, request } = state$.value;
      const invoice = request.invoice.fetchById.data;
      const discount = invoice && invoice.discount ? invoice.discount : 0;
      return calculateTotal(discount, invoiceItem.entities, product.entities);
    }),
    map((total: number) => Action.calculateTotal(total))
  );

const setInvoiceDataEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(
      isOfType([
        InvoiceTypes.CREATE_INVOICE_SUCCESS,
        InvoiceTypes.UPDATE_INVOICE_SUCCESS,
        InvoiceTypes.FETCH_INVOICES_SUCCESS,
        InvoiceTypes.DELETE_INVOICE_SUCCESS
      ])
    ),
    map(action => {
      if (action.type === InvoiceTypes.DELETE_INVOICE_SUCCESS) {
        return InvoiceActions.deleteInvoiceData(action.payload);
      } else {
        if (Array.isArray(action.payload)) {
          return InvoiceActions.setInvoiceData(action.payload);
        }
        return InvoiceActions.setInvoiceData([action.payload]);
      }
    })
  );

export default [calculateTotalEpic, setInvoiceDataEpic];
