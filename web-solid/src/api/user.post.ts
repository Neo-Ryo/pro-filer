import { useContext } from 'solid-js'
import { useNavigate } from '@solidjs/router'
import { createMutation } from '@tanstack/solid-query'
import { fetchios } from '@/libs/fetchios'
import { UserContext } from '@/context/userContext'

type LogUserBody = {
    email: string
    password: string
}

async function logUser(body: LogUserBody) {
    return await fetchios(`${import.meta.env.VITE_URL}/users/login`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json',
        },
    })
}

async function createUser(body: LogUserBody) {
    return await fetchios(`${import.meta.env.VITE_URL}/users`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json',
        },
    })
}
export function useLogUser() {
    const navigate = useNavigate()
    const userCtx = useContext(UserContext)
    return createMutation(() => ({
        mutationFn: (body: LogUserBody) => logUser(body),
        onSuccess: (data) => {
            userCtx?.setUser(data)
            if (userCtx && userCtx.user()) {
                navigate(`/dashboard/${userCtx.user()!.uuid}`)
            }
        },
    }))
}

export function useCreateUser() {
    const navigate = useNavigate()
    return createMutation(() => ({
        mutationFn: (body: LogUserBody) => createUser(body),
        onSuccess: () => {
            // TODO await a moment to show user creation tooltips
            navigate(`/`)
        },
    }))
}
