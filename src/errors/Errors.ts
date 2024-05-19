export class ApplicationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Application Internal Error";
  }
}

export class ServerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Server Internal Error";
  }
}

export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Smartphone without connection";
  }
}
