export function handleError(
  error: any,
  errorMessage: string,
  callback?: () => void
) {
  console.error(errorMessage, error);
  if (callback) {
    callback();
  }
}
