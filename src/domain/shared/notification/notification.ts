export type NotificationErrorProps = {
  message: string;
  context: string;
};

export class Notification {
  private errors: NotificationErrorProps[] = [];

  public addError(error: NotificationErrorProps): void {
    this.errors.push(error);
  }

  public hasErrors(): boolean {
    return this.errors.length > 0;
  }

  public getErrors(): NotificationErrorProps[] {
    return this.errors;
  }

  public clear(): void {
    this.errors = [];
  }

  public messages(context?: string): string {
    const errors: NotificationErrorProps[] = context ? this.errors.filter((error) => error.context === context) : this.errors;

    return errors.map((error) => `${error.context}: ${error.message}`).join(',');
  }
}
