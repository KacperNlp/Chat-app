enum FieldTypes {
    Username = 'username',
    Email = 'email',
    Password = 'password',
    PasswordRepeat = 'passwordRepeat',
}

const { Username, Email, Password, PasswordRepeat } = FieldTypes;

interface TaskInterface {
    _id: string
    content: string;
    done: boolean
}

interface NewTaskInterface {
    content: string;
    done: boolean
}

interface StoreState {
    tasks: TaskInterface[]
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
    TaskInterface,
    NewTaskInterface,
    StoreState,
    LoginForm,
    RegisterForm,
    LoginFormValidation,
    RegisterFormValidation,
}