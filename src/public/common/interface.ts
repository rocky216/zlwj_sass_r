
export interface UtilsProps {
  OpenNotification:Function;
  addIndex: (arg1:any[],arg2?:boolean)=>any[];
  Pagination: (arg1:any,arg2:(...arg0:any)=>void )=>any;
  getToken: ()=>any;
  submitFiles: (arg1:any[])=>string;
  echoFiles: (arg1:any)=> any[];
  objectArray:(...arg:any)=>any[];
  tData:(...arg:any)=>any[];
}

export interface IProps {
  match: any;
  history:any;
  actions: any;
  utils: UtilsProps;
  spinning: boolean;
}

export interface IState {
  app: any;
  company: any;
  system:any;
  other:any;
  user:any;
}