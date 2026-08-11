import { HttpException, HttpStatus } from 'your-http-library';

export function safelyExecute<T>(fn: () => T): T | null {
    try {
        return fn();
    } catch (error) {
        console.error('Error executing function:', error);
        return null;
    }
}

export function validateInput(data: any, schema: any): boolean {
    const validationResult = schema.validate(data);
    if (validationResult.error) {
        console.error('Validation error:', validationResult.error.details);
        return false;
    }
    return true;
}

export function handleUnexpectedError(error: any): HttpException {
    console.error('Unexpected error occurred:', error);
    return new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
}

export function retry<T>(fn: () => T, attempts: number = 3): T | null {
    let lastError: any;
    for (let i = 0; i < attempts; i++) {
        try {
            return fn();
        } catch (error) {
            lastError = error;
        }
    }
    console.error('Max attempts reached with error:', lastError);
    return null;
}
