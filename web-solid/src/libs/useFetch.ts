import { createSignal, createResource } from 'solid-js'

function useFetchPost(params: { url: string; body: Record<string, unknown> }) {
    const { url, body } = params

    const [data, { refetch, mutate }] = createResource(async () =>
        (
            await fetch(url, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-type': 'application/json',
                },
            })
        ).json()
    )

    return { data, refetch, mutate }
}

export { useFetchPost }
