import ClientApp from "@/components/ClientApp";
import { fetchGithubStats } from "@/lib/github";
import { fetchSeoulWeather } from "@/lib/weather";

export default async function Home() {
  const [githubStats, weather] = await Promise.all([
    fetchGithubStats("jellive"),
    fetchSeoulWeather(),
  ]);
  return (
    <div className="w-screen h-screen overflow-hidden">
      <ClientApp githubStats={githubStats} weather={weather} />
    </div>
  );
}
