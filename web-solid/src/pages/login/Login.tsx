import { Show, createSignal } from 'solid-js'
import { A } from '@solidjs/router'
import { Input, Button, Spinner } from '@/components'
import { useLogUser } from '@/api/user.post'

function Login() {
    const [email, setEmail] = createSignal('')
    const [password, setPassword] = createSignal('')
    const logUser = useLogUser()

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
                    class="w-2/6 flex flex-col"
                    onSubmit={(e) => {
                        e.preventDefault()
                        logUser.mutate({ email: email(), password: password() })
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
                    <Show when={logUser.error}>
                        <p class="text-mainErr self-center">
                            {logUser.error?.name ?? 'Something went wrong...'}
                        </p>
                    </Show>
                    <div class="self-end mt-4 mb-4">
                        <Show
                            when={!logUser.isPending}
                            // when={!loading()}
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
