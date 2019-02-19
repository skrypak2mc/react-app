import { action, createStandardAction } from 'typesafe-actions';
import IInvoice from '../models/Invoice';
import { INVOICE_TYPES } from '../types';

export const fetchInvoices = createStandardAction(INVOICE_TYPES.GET_INVOICES_REQUEST)<string>();
export const fetchInvoicesSuccess = (invoices: IInvoice[]) =>
  action(INVOICE_TYPES.GET_INVOICES_SUCCESS, invoices);

export const fetchInvoiceById = (id: string | number) =>
  action(INVOICE_TYPES.GET_INVOICE_BY_ID_REQUEST, id);
export const fetchInvoiceByIdSuccess = (invoice: IInvoice) =>
  action(INVOICE_TYPES.GET_INVOICE_BY_ID_SUCCESS, invoice);
