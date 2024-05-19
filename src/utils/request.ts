import { ApplicationError, NetworkError, ServerError } from "../errors/Errors";

export async function request<T>(url: URL): Promise<T> {
  let response: Response;

  try {
    response = await fetch(url.href);
  } catch (e) {
    if (e instanceof TypeError) {
      throw new NetworkError(`Check your internet connection.`);
    } else {
      throw new ApplicationError(e.message);
    }
  }

  const { status } = response;
  if (status < 200 || status >= 400)
    throw new ServerError(`Could not fetch data. ErrorCode: ${status}`);

  let data: T;
  try {
    data = await response.json();
  } catch (e) {
    if (e instanceof SyntaxError)
      throw new ApplicationError(
        "Application Internal Error: Unable to process data"
      );
    else throw new ApplicationError(`Application Internal Error: ${e.message}`);
  }

  return data;
}
