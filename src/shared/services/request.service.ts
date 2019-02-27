import { from, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as API from '../api';
import {
  PayloadData,
  CreateActions,
  EditActions,
  DeleteActions,
  FetchActions,
  FetchByIdActions
} from '../typing/actions';

const headers = { 'Content-Type': 'application/json' };

class ApiService {
  headers = { 'Content-Type': 'application/json' };
  static createData<T>(action: CreateActions, data: PayloadData) {
    const config = {
      method: 'POST',
      body: JSON.stringify(data.body),
      headers
    };
    return from(API.request<T>(data.url, config)).pipe(
      map((response: T) => action.createSuccess(response)),
      catchError(err => of(action.setError(err.message)))
    );
  }
  static editData<T>(action: EditActions, data: PayloadData) {
    const config = {
      method: 'PUT',
      body: JSON.stringify(data.body),
      headers
    }
    ;
    return from(API.request<T>(data.url, config)).pipe(
      map((response: T) => action.editSuccess(response)),
      catchError(err => of(action.setError(err.message)))
    );
  }
  static deleteData<T>(action: DeleteActions, data: PayloadData) {
    const config = {
      method: 'DELETE'
    };
    return from(API.request<T>(data.url, config)).pipe(
      map((response: T) => action.deleteSuccess(response)),
      catchError(err => of(action.setError(err.message)))
    );
  }
  static fetchById<T>(action: FetchByIdActions, url: string) {
    return from(API.request<T>(url)).pipe(
      map((data: T) => action.fetchDataByIdSuccess(data)),
      catchError(err => of(action.setError(err.message)))
    );
  }
  static fetchAllData<T>(action: FetchActions, url: string) {
    return from(API.fetchAll<T>(url)).pipe(
      map((data: T[]) => action.fetchDataSuccess(data)),
      catchError(err => of(action.setError(err.message)))
    );
  }
}

export default ApiService;
