export function logErrorResponse(error: unknown) {
  if (process.env.NODE_ENV === 'development') {
    console.error('API Error:', error);
  }
}