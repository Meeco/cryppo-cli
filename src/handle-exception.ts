import { Command } from '@oclif/command';
import { CLIError } from '@oclif/errors';

export async function handleException<T>(err: any, instance: Command) {
  if (err instanceof CLIError) {
    // Error is already 'handled' by oclif pretty well so can just print as-is
    throw err;
  }
  let message;
  /**
   * Error from the API - convert the body stream to JSON and print that
   */
  if (err.json && typeof err.json === 'function') {
    const result = await err.json().catch(() => '');
    message = `API Responded with ${err.status}:\n ${JSON.stringify(result, null, 2)}`;
  } else if (err.message) {
    message = err.message;
  }

  return instance.error(message);
}
