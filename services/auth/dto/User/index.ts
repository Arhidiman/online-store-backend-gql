export type UserDto = {
    id?: number, 
    username: string,
    password: string, 
    created_at: string,
    user_role: 'USER' | 'ADMIN',
    jwt_token: string
}