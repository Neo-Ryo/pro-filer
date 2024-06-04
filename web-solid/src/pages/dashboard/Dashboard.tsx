import { useParams, useNavigate } from '@solidjs/router'
import { useContext, createEffect } from 'solid-js'
import { UserContext } from '@/context/userContext'
export default function Dashboard() {
    const params = useParams()
    const user = useContext(UserContext)
    const navigate = useNavigate()
    createEffect(() => {
        if (!user) {
            navigate('/', { replace: true })
        }
    })

    return (
        <main class="flex flex-col h-full w-full justify-center items-center">
            <p>Welcome user: {params.userUuid}</p>
        </main>
    )
}
