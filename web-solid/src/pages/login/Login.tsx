import { Show, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { A } from "@solidjs/router";
import { Input, Button, Spinner } from "@/components";

function Login() {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [isLoading, setIsLoading] = createSignal<boolean>(false);
  const [isError, setIsError] = createSignal<boolean>(true);
  const [error, setError] = createSignal<string>("");
  const navigate = useNavigate();

  async function handleSubmit() {
    try {
      setIsLoading(true);
      setIsError(false);
      const res = await fetch(`${import.meta.env.VITE_URL}/users/login`, {
        method: "POST",
        body: JSON.stringify({ email: email(), password: password() }),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (!res.ok) {
        const response = await res.json();
        setIsError(true);
        setError(
          response?.error?.name ? response.error?.name : "Invalid request"
        );
      } else {
        const response: { uuid: string } = await res.json();
        navigate(`/dashboard/${response.uuid}`);
      }
    } catch (error) {
      setIsError(true);
      setError("Something bad happened");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div class="w-full h-full flex flex-col justify-center items-center">
      <div
        class="w-full h-40"
        style={{
          "background-image": "url(/bLxcjh3.png)",
          "background-repeat": "no-repeat",
          "background-position": "0% 60%",
          "background-size": "cover",
        }}
      />
      <div class="w-full flex flex-col justify-center items-center mt-24">
        <h2>LOGIN</h2>
        <form
          class="w-1/5 flex flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
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
          <Show when={isError()}>
            <p class="text-mainErr self-center">{error()}</p>
          </Show>
          <div class="self-end mt-4 mb-4">
            <Show
              when={!isLoading()}
              fallback={
                <Button
                  disabled={true}
                  child={<Spinner color="primBtn" w={22} h={22} />}
                />
              }
            >
              <Button child={"LOGIN"} type="submit" />
            </Show>
          </div>
        </form>
      </div>
      <A href="/signin" class="text-primBtn hover:underline align-bottom">
        No account yet?
      </A>
    </div>
  );
}

export default Login;
