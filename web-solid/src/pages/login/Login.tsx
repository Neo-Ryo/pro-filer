import { Show, createEffect, createResource, createSignal, on } from 'solid-js'
import { useNavigate } from '@solidjs/router'
import { A } from '@solidjs/router'
import { Input, Button, Spinner } from '@/components'
import { userContext } from '@/context/userContext'
import { User } from '@/types/user.types'
import { ResponseError, fetchios } from '@/libs/fetchios'

function Login() {
    const [email, setEmail] = createSignal('')
    const [password, setPassword] = createSignal('')
    const [loading, setLoading] = createSignal(false)
    const [error, setError] = createSignal<string | null>(null)
    const navigate = useNavigate()
    const { user, setUser } = userContext()
    async function logUser() {
        try {
            setError(null)
            setLoading(true)
            const res = await fetchios(
                `${import.meta.env.VITE_URL}/users/login`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        email: email(),
                        password: password(),
                    }),
                    headers: {
                        'Content-type': 'application/json',
                    },
                }
            )
            console.log(res)
            setUser(await res.json())
        } catch (error) {
            if (error instanceof ResponseError) {
                setError(error.name)
            } else {
                setError('Invalid Request')
            }
        } finally {
            setLoading(false)
        }
    }
    createEffect(
        on(user, (u) => {
            if (u) {
                navigate(`/dashboard/${u.uuid}`)
            }
        })
    )
    return (
        <div class="w-full h-full flex flex-col justify-center items-center">
            <div
                class="w-full h-40"
                style={{
                    'background-image': 'url(/bLxcjh3.png)',
                    'background-repeat': 'no-repeat',
                    'background-position': '0% 60%',
                    'background-size': 'cover',
                }}
            />
            <div class="w-full flex flex-col justify-center items-center mt-24">
                <h2>LOGIN</h2>
                <form
                    class="w-1/5 flex flex-col"
                    onSubmit={(e) => {
                        e.preventDefault()
                        logUser()
                    }}
                >
                    <div class="mt-4 mb-4">
                        <Input
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            type="email"
                            value={email()}
                            setter={setEmail}
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                            errorValidityMessage="invalid email format"
                        />
                    </div>
                    <div class="mt-4 mb-4">
                        <Input
                            id="password"
                            name="password"
                            placeholder="*****"
                            type="password"
                            value={password()}
                            setter={setPassword}
                            minLength={8}
                            maxLength={32}
                            errorValidityMessage="length between 8 to 32 character"
                        />
                    </div>
                    <Show when={error()}>
                        <p class="text-mainErr self-center">{error()}</p>
                    </Show>
                    <div class="self-end mt-4 mb-4">
                        <Show
                            when={!loading()}
                            fallback={
                                <Button
                                    disabled={true}
                                    child={
                                        <Spinner
                                            color="primBtn"
                                            w={22}
                                            h={22}
                                        />
                                    }
                                />
                            }
                        >
                            <Button child={'LOGIN'} type="submit" />
                        </Show>
                    </div>
                </form>
            </div>
            <A href="/signin" class="text-primBtn hover:underline align-bottom">
                No account yet?
            </A>
        </div>
    )
}

export default Login
