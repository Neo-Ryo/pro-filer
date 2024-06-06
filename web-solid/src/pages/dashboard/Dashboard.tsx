import { useParams, useNavigate } from '@solidjs/router'
import { useContext, createEffect } from 'solid-js'
import { UserContext } from '@/context/userContext'
import { findUser, useFindUserOrRedirectHome } from "@/api/user.get"


export default function Dashboard() {
    const params = useParams()
    const userCtx = useContext(UserContext)
    const navigate = useNavigate()
    const getUser = useFindUserOrRedirectHome(params.userUuid)
    // createEffect(async () => {
    //     if(params && !userCtx?.user()){
    //         // TODO get user
    //         const data = await findUser(params.userUuid)
    //         userCtx?.setUser(data)
    //     }
    //     console.log(params);
        
    //     if (!userCtx) {
        //     }
        // }, userCtx?.user())
        // const user = userCtx?.user()
        // if(!user){
            //     return <p>ERROR</p>
            // }
    if(getUser.isError){            
        navigate('/', { replace: true })
    }

    if(getUser.isLoading || getUser.isFetching || getUser.isPending){
        return <p>Loading...</p>
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
