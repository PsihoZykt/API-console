export interface Action<T extends string, P> {
    readonly type: T;
    readonly payload: P;
}

export function createAction<T extends string, P>(type: T, payload: P): Action<T, P> {
    return {type, payload};
}
