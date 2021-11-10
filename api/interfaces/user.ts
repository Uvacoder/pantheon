export interface UpdateBody {
    update: {
        avatar?: string;
        description?: string;
    };
}

export interface CreateBody {
    email: string;
    name: string;
    password: string;
    verifyPassword: string;
}

export interface SearchByNameBody {
    name: string;
    page?: number;
}
