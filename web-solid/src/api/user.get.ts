import { useContext } from 'solid-js'
import { createQuery } from '@tanstack/solid-query'
import { fetchios } from '@/libs/fetchios'
import { UserContext } from '@/context/userContext'
import { User } from '@/types/user.types'


export async function findUser(userUuid: string): Promise<User> {
    return await fetchios(`${import.meta.env.VITE_DB_URL}/users/${userUuid}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
        },
    })
}


export function useFindUserOrRedirectHome(userUuid: string) {
    const userCtx = useContext(UserContext)
    return createQuery(() => ({
        queryKey: ["user", userUuid],
        queryFn: () => findUser(userUuid).then((data) => data),
        onSuccess: (data: User) => {
            userCtx?.setUser(data)
        },
       
    }))
}
