import ClientApp from "@/components/ClientApp";
import { fetchGithubStats } from "@/lib/github";

export default async function Home() {
  const githubStats = await fetchGithubStats("jellive");
  return (
    <div className="w-screen h-screen overflow-hidden">
      <ClientApp githubStats={githubStats} />
    </div>
  );
}
