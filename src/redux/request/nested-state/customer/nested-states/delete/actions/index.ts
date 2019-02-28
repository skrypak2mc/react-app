import { action, createStandardAction } from 'typesafe-actions';
import ICustomer from '../../../../../../../shared/models/Customer';
import { URL_ALL_CUSTOMERS } from '../../../../../../../shared/utils/api';

export enum DeleteCustomerTypes {
  DELETE_CUSTOMER_REQUEST = '@invoice-app/customer/DELETE_CUSTOMER_REQUEST',
  DELETE_CUSTOMER_SUCCESS = '@invoice-app/customer/DELETE_CUSTOMER_SUCCESS',
  DELETE_CUSTOMER_FAILURE = '@invoice-app/customer/DELETE_CUSTOMER_FAILURE'
}

export const DeleteCustomerActions = {
  deleteCustomer: (customer: ICustomer) =>
    action(DeleteCustomerTypes.DELETE_CUSTOMER_REQUEST, {
      url: URL_ALL_CUSTOMERS,
      body: customer
    }),
  deleteCustomerSuccess: createStandardAction(
    DeleteCustomerTypes.DELETE_CUSTOMER_SUCCESS
  )<ICustomer>(),
  deleteCustomerFailure: createStandardAction(
    DeleteCustomerTypes.DELETE_CUSTOMER_FAILURE
  )<Error>()
};
