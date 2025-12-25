export type User = {
    id?: string;
    first_name: string;
    last_name: string;
    email: string;
    password_hash: string;
    status?: boolean;
    created_at?: Date;
    updated_at?: Date;
}