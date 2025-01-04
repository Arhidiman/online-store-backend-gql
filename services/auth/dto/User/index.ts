export type UserDto = {
    id?: number, 
    username: string,
    password: string, 
    created_at: string,
    user_role: 'USER' | 'ADMIN',
    jwt_token: string
}


export type SignUpDto = {
    username: string,
    password: string, 
}

export type SignInDto = {
    username: string,
    password: string, 
}

export type ValidateTokenDto = {
    jwt_token: string
}

export type VerifiedUserDataDto = {
    id: number,
    username: string
}

export type TokenDto = {
    jwt_token: string
}