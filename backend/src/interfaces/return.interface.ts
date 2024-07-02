export interface IReturn {
  error?: boolean;
  success?: boolean;
  message?: string;
  data: Array<any> | object | any;
}
