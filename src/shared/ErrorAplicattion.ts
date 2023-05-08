interface IErrorApplicationDetail {
    name: string;
    description: string;
  }
  
  class ErrorApplication {
    process: string;
    message: string;
    code: number;
    detail?: IErrorApplicationDetail[];
  
    constructor(
      process: string,
      message: string,
      code: number,
      detail?: IErrorApplicationDetail[],
    ) {
      this.process = process;
      this.message = message;
      this.code = code;
      this.detail = detail;
    }
  }
  
  export default ErrorApplication;
  