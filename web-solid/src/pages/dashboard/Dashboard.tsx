import { useParams } from "@solidjs/router";

export default function Dashboard() {
  const params = useParams();
  return (
    <main class="flex flex-col h-full w-full justify-center items-center">
      <p>Welcome user: {params.userUuid}</p>
    </main>
  );
}
