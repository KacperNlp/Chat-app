enum FieldTypes {
    Username = 'username',
    Email = 'email',
    Password = 'password',
    PasswordRepeat = 'passwordRepeat',
}

interface ChannelInterface {
    _id: string
    name: string;
    color: string,
    author: string,
    addedUsers: string[]
}

interface NewTaskInterface {
    content: string;
    done: boolean
}

interface NewChannelInterface {
    name: string,
    color: string,
    author: string,
    addedUsers: string[]
}

interface User {
    username: string,
    email: string,
    role: string,
    id: String
}

interface StoreState {
    channels: ChannelInterface[]
    loggedUser: User
    users: User[]
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
    message: string
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