export class ResponseError extends Error {
    statusCode: number
    constructor(name: string, statusCode: number, description?: string) {
        super(description)
        this.name = name
        this.statusCode = statusCode
    }
}

export async function fetchios(
    url: string,
    requestInit: RequestInit | undefined
) {
    const res = await fetch(url, requestInit)
    if (!res.ok) {
        const json = await res.json()
        throw new ResponseError(
            json?.error?.name ?? 'Bad fetch request',
            res.status
        )
    }
    return await res.json()
}
