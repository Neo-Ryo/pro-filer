import {
    Accessor,
    JSXElement,
    Setter,
    createContext,
    createSignal,
    useContext,
} from 'solid-js'
import { User } from '../types/user.types'

export const UserContext = createContext<{
    user: Accessor<User | null>
    setUser: Setter<User | null>
}>()

export const UserContextProvider = (props: { children: JSXElement }) => {
    const [user, setUser] = createSignal<User | null>(null)
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {props.children}
        </UserContext.Provider>
    )
}

export function userContext() {
    const userCtx = useContext(UserContext)
    if (!userCtx) {
        throw new Error('useCounterContext: cannot find a userCtx')
    }
    return userCtx
}
