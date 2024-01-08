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

export type {
    TaskInterface,
    NewTaskInterface,
    StoreState,
    RegisterForm
}