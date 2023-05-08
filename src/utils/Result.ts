import ErrorApplication from "../shared/ErrorAplicattion";

class Result<T> {
  success: boolean;
  response!: T;
  error!: ErrorApplication;

  private constructor(success: boolean) {
    this.success = success;
  }

  private addError(error: ErrorApplication): void {
    this.error = error;
  }

  private addData(data: T): void {
    this.response = data;
  }

  public static error<T>(error: ErrorApplication): Result<T> {
    const result = new Result<T>(false);
    result.addError(error);
    return result;
  }

  public static success<T>(response: T): Result<T> {
    const result = new Result<T>(true);
    result.addData(response);
    return result;
  }
}

export default Result;
