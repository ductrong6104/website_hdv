export class HttpError extends Error {
    public status: number;

    constructor(message: string, status: number = 500) {
        super(message);
        this.status = status;
        this.name = 'HttpError';
    }
}

export class Unauthorized extends HttpError {
    constructor(message: string = 'Unauthorized') {
        super(message, 401);
        this.name = 'Unauthorized';
    }
}

export class Forbidden extends HttpError {
    constructor(message: string = 'Forbidden') {
        super(message, 403);
        this.name = 'Forbidden';
    }
}