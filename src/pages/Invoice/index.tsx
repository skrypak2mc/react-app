import React, { useEffect, useState, FC } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Button, Icon } from 'antd';
import Table from './Table';
import { RootAction, RootState } from '../../redux/store/types';
import { ID } from '../../shared/typing/records';
import Edit from './Edit';
import {
  CustomerRequest,
  ProductRequest,
  InvoiceItemRequest,
  InvoiceRequest
} from '../../redux/request/actions';
import ICustomer from '../../shared/models/Customer';
import IInvoice from '../../shared/models/Invoice';
import * as InvoiceItemActions from '../../redux/invoice-item/actions';

const { Action: CustomerAction } = CustomerRequest;
const { Action: ProductAction } = ProductRequest;
const { Action: InvoiceItemAction } = InvoiceItemRequest;
const { Action: InvoiceAction } = InvoiceRequest;

type Props = {
  fetchAllInvoiceItems: (id: ID) => void;
  deleteInvoice: (id: ID) => void;
  fetchAllCustomers: () => void;
  fetchAllProducts: () => void;
  fetchAllInvoices: () => void;
  fetchInvoiceById: (id: ID) => void;
  customers: ReadonlyArray<ICustomer>;
  invoices: ReadonlyArray<IInvoice>;
  resetInvoiceItems: () => void;
};

const Invoice: FC<Props> = ({
  fetchAllCustomers,
  fetchAllInvoices,
  fetchInvoiceById,
  deleteInvoice,
  customers,
  invoices,
  fetchAllProducts,
  fetchAllInvoiceItems,
  resetInvoiceItems
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchAllCustomers();
    fetchAllInvoices();
    fetchAllProducts();
  }, []);

  const handleEdit = (id: ID) => {
    resetInvoiceItems();
    fetchInvoiceById(id);
    fetchAllInvoiceItems(id);
    setShowForm(true);
    setIsEdit(true);
  };
  const toggleShowForm = () => setShowForm(!showForm);
  const findCustomerName = (id: ID): string => {
    const foundCustomer = customers.find(customer => customer.id === id);
    return foundCustomer ? foundCustomer.name : '';
  };

  const handleOpenEdit = () => {
    resetInvoiceItems();
    toggleShowForm();
  };

  return (
    <div>
      {showForm ? (
        <Edit toggleShowForm={toggleShowForm} isEdit={isEdit} setIsEdit={setIsEdit} />
      ) : (
        <>
          <Button type="primary" onClick={handleOpenEdit} htmlType="button">
            <Icon type="plus" /> Add Invoice
          </Button>
          <Table
            onEdit={handleEdit}
            data={invoices}
            onDelete={deleteInvoice}
            findCustomerName={findCustomerName}
          />
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  invoices: state.invoice.entities,
  customers: state.customer.entities
});
const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  fetchAllInvoiceItems: (invoiceId: ID) =>
    dispatch(InvoiceItemAction.fetchAllInvoiceItems(invoiceId)),
  fetchAllCustomers: () => dispatch(CustomerAction.fetchAllCustomers()),
  fetchAllProducts: () => dispatch(ProductAction.fetchAllProducts()),
  fetchAllInvoices: () => dispatch(InvoiceAction.fetchAllInvoices()),
  deleteInvoice: (id: ID) => dispatch(InvoiceAction.deleteInvoice(id)),
  fetchInvoiceById: (id: ID) => dispatch(InvoiceAction.fetchInvoiceById(id)),
  resetInvoiceItems: () => dispatch(InvoiceItemActions.resetInvoiceItems())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Invoice);
