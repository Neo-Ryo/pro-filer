import { useParams, useNavigate } from '@solidjs/router'
import { useContext, createEffect } from 'solid-js'
import { UserContext } from '@/context/userContext'
export default function Dashboard() {
    const params = useParams()
    const userCtx = useContext(UserContext)
    const navigate = useNavigate()
    createEffect(() => {
        if(params){
            // TODO get user
        }
        if (!userCtx) {
            navigate('/', { replace: true })
        }
    })
    const user = userCtx?.user()
    if(!user){
        return <p>ERROR</p>
    }
    return (
        <main class="flex flex-col h-full w-full justify-center items-center">
            {/* <p>Welcome user: {params.userUuid}</p> */}
            <div>
                {user.email}
            </div>
        </main>
    )
}
