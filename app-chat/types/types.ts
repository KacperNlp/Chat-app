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

export type {
    TaskInterface,
    NewTaskInterface,
    StoreState
}