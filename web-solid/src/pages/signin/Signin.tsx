import { Show, createSignal } from 'solid-js'
import { Input, Button, Spinner } from '@/components'
import { A, useNavigate } from '@solidjs/router'
import { useFetchPost } from '../../libs/useFetch'

function Signin() {
    const [name, setName] = createSignal('')
    const [email, setEmail] = createSignal('')
    const [password, setPassword] = createSignal('')
    const [isLoading, setIsLoading] = createSignal<boolean>(false)
    const [isError, setIsError] = createSignal<boolean>(true)
    const [error, setError] = createSignal<string>('')
    const navigate = useNavigate()
    const { data, mutate, refetch } = useFetchPost({
        url: `${import.meta.env.VITE_URL}/users/`,
        body: {
            name: name(),
            email: email(),
            password: password(),
        },
    })
    // async function handleSubmit() {
    //   try {
    //     setIsLoading(true);
    //     setIsError(false);
    //     const res = await fetch(`${import.meta.env.VITE_URL}/users/`, {
    //       method: "POST",
    //       body: JSON.stringify({
    //         name: name(),
    //         email: email(),
    //         password: password(),
    //       }),
    //       headers: {
    //         "Content-type": "application/json",
    //       },
    //     });
    //     if (!res.ok) {
    //       const response = await res.json();
    //       setIsError(true);
    //       setError(
    //         response?.error?.name ? response.error?.name : "Invalid request"
    //       );
    //     } else {
    //       const response: { uuid: string } = await res.json();
    //       navigate(`/dashboard/${response.uuid}`);
    //     }
    //   } catch (error) {
    //     setIsError(true);
    //     setError("Something bad happened");
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }
    return (
        <div class="w-full h-full flex flex-col">
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
                <form
                    class="w-1/5 flex flex-col"
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleSubmit()
                    }}
                >
                    <h2 class="self-center">SIGNIN</h2>
                    <div class="mt-4 mb-4">
                        <Input
                            id="name"
                            name="name"
                            placeholder="Your name"
                            type="text"
                            value={name()}
                            setter={setName}
                            minLength={3}
                            maxLength={20}
                            errorValidityMessage={
                                'length between 3 and 20 characters no special characters'
                            }
                            pattern="[A-Za-z\s]{1,25}"
                        />
                    </div>
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
                    <Show when={isError()}>
                        <p class="text-mainErr self-center">{error()}</p>
                    </Show>
                    <div class="flex mt-4 mb-4 justify-between">
                        <A href="/">&#x2190; back</A>
                        <Show
                            when={!isLoading()}
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
                            <Button child={'SIGNIN'} type="submit" />
                        </Show>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signin
