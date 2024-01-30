enum FieldTypes {
    Username = 'username',
    Email = 'email',
    Password = 'password',
    PasswordRepeat = 'passwordRepeat',
}

const { Username, Email, Password, PasswordRepeat } = FieldTypes;

interface ChannelInterface {
    _id: string
    name: string;
    color: string,
    author: string
}

interface NewTaskInterface {
    content: string;
    done: boolean
}

interface NewChannelInterface {
    name: string,
    color: string,
    author: string,
}

interface User {
    username: string,
    email: string,
    role: string
}

interface StoreState {
    channels: ChannelInterface[]
    loggedUser: User
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
}