export interface GhStats {
  publicRepos: number;
  followers: number;
}

export async function fetchGithubStats(user: string): Promise<GhStats | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${user}`, {
      next: { revalidate: 3600 },
      headers: {
        "User-Agent": "jell-portfolio-3d",
        Accept: "application/vnd.github+json",
      },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      public_repos?: number;
      followers?: number;
    };
    if (
      typeof data.public_repos !== "number" ||
      typeof data.followers !== "number"
    ) {
      return null;
    }
    return { publicRepos: data.public_repos, followers: data.followers };
  } catch {
    return null;
  }
}
