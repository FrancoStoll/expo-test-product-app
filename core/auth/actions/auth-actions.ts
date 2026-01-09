import { isAxiosError } from "axios";
import { productsApi } from "../api/productsApi";
import { User } from "../interfaces/user";


export interface AuthResponse {
    id: string;
    email: string;
    fullName: string;
    isActive: boolean;
    roles: string[];
    token: string;
}


const returnUserToken = (data: AuthResponse): { user: User, token: string } => {
    // const { id, email, fullName, isActive, roles, token } = data;
    const { token, ...user } = data;



    // const user: User = {
    //     id,
    //     email,
    //     fullName,
    //     isActive,
    //     roles,
    // }

    return {
        user, token
    }

}



export const authLogin = async (email: string, password: string) => {

    email = email.toLowerCase();


    try {
        const { data } = await productsApi.post<AuthResponse>('/auth/login', {
            email, password,
        });

        console.log(data);

        return returnUserToken(data);
    } catch (error) {

        console.log(error);
        // throw new Error('User and/or password not valid')
        return null;
    }

}


export const authCheckStatus = async () => {

    try {

        const { data } = await productsApi.get<AuthResponse>('/auth/check-status')


        return returnUserToken(data);
    } catch {
        return null
    }

}


export const authCreateAccount = async ({ fullName, email, password }: { fullName: string; email: string; password: string }) => {

    try {

        const { data } = await productsApi.post<AuthResponse>('/auth/register', {
            email, fullName, password
        },);


        return data;

    } catch (error) {
        // console.log(error);
        if (isAxiosError(error)) {
            console.log(error.status);
        }
    }


}