import { ActionType } from "typesafe-actions";
import  * as InvoiceActions from "../actions";
import * as INVOICE_TYPES from "../actions/types";
import IInvoice from "../../../shared/models/Invoice";
import {State, initialState} from '../states'

type Action = ActionType<typeof InvoiceActions>;

const reducer = (state: State = initialState, action: Action): State => {
    const { type, payload } = action;
    switch (type) {
        case INVOICE_TYPES.GET_INVOICES_REQUEST:
            return { ...state, loading: true, error: null };
        case INVOICE_TYPES.GET_INVOICES_SUCCESS:
            return {
                ...state,
                invoices: payload as IInvoice[],
                loading: false,
                error: null
            };
        case INVOICE_TYPES.CREATE_INVOICE_SUCCESS:
            return {
                ...state,
                invoices: [...state.invoices, payload as IInvoice],
                loading: false,
                error: null
            };
        case INVOICE_TYPES.GET_INVOICE_BY_ID_SUCCESS:
            return {
                ...state,
                invoice: payload as IInvoice,
                loading: false,
                error: null
            };
        case INVOICE_TYPES.EDIT_INVOICE_SUCCESS:
            const updatedInvoices = state.invoices.map(invoice => {
                if (invoice.id === (payload as IInvoice).id) return payload;
                return invoice;
            });
            return {
                ...state,
                invoice: payload as IInvoice,
                invoices: updatedInvoices as IInvoice[],
                loading: false,
                error: null
            };
        case INVOICE_TYPES.DELETE_INVOICE_SUCCESS:
            const filteredInvoices = state.invoices.filter(
                invoice => invoice.id !== (payload as IInvoice).id
            );
            return { ...state, invoices: filteredInvoices };
        case INVOICE_TYPES.RESET_INVOICE:
            return { ...state, invoice: null, loading: false, error: null };
        case INVOICE_TYPES.FILL_INVOICE:
            return {
                ...state,
                invoice: { ...state.invoice, ...(payload as IInvoice) },
                loading: false,
                error: null
            };
        case INVOICE_TYPES.FETCH_INVOICE_ERROR:
            return { ...state, loading: false, error: payload as string };
        default:
            return state;
    }
};

export default reducer;