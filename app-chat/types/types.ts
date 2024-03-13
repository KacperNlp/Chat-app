import { FieldTypes } from "@/enums/enums";

interface ChannelInterface {
    _id: string
    name: string;
    img: File,
    author: string,
    addedUsers: string[]
}

interface NewTaskInterface {
    content: string;
    done: boolean
}

interface NewChannelInterface {
    name: string,
    author: string,
    addedUsers: string[],
    img: File | null
}

interface User {
    username: string,
    email: string,
    role: string,
    id: String
}

interface StoreState {
    channels: ChannelInterface[],
    loggedUser: User,
    users: User[],
    searchValue: string
}

interface RegisterForm {
    username: string,
    email: string,
    password: string,
    passwordRepeat: string,
}

interface LoginForm {
    username: string,
    password: string
}

interface LoginFormValidation {
    response: {
        status: number;
        data: {
            type: FieldTypes.Username | FieldTypes.Password,
            msg: string
        }
    }
}

interface RegisterFormValidation {
    response: {
        status: number;
        data: {
            type: FieldTypes.Username | FieldTypes.Email | FieldTypes.Password | FieldTypes.PasswordRepeat,
            msg: string
        }
    }
}

interface ChatMessage {
    username: string
    userId: string,
    message: string,
    date: Date
}

export type {
    ChannelInterface,
    NewTaskInterface,
    NewChannelInterface,
    StoreState,
    User,
    LoginForm,
    RegisterForm,
    LoginFormValidation,
    RegisterFormValidation,
    ChatMessage
}