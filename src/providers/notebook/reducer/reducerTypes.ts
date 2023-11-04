export type NotebookState = {
    loading: boolean
}

export enum NotebookReducerTypes {
    LOADING = "LOADING"
}

export type NotebookReducer = NotebookRequestinNotebook

type NotebookRequestinNotebook ={
    type: NotebookReducerTypes.LOADING
    payload?: undefined
}