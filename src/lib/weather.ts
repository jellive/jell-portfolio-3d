export interface Weather {
  temperatureC: number;
  emoji: string;
}

const WMO: Record<number, string> = {
  0: "☀️",
  1: "🌤️",
  2: "⛅",
  3: "☁️",
  45: "🌫️",
  48: "🌫️",
  51: "🌦️",
  53: "🌦️",
  55: "🌧️",
  61: "🌧️",
  63: "🌧️",
  65: "🌧️",
  71: "🌨️",
  73: "🌨️",
  75: "❄️",
  80: "🌦️",
  81: "🌧️",
  82: "⛈️",
  95: "⛈️",
  96: "⛈️",
  99: "⛈️",
};

export async function fetchSeoulWeather(): Promise<Weather | null> {
  try {
    const res = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=37.5665&longitude=126.978&current=temperature_2m,weather_code&timezone=Asia/Seoul",
      {
        next: { revalidate: 3600 },
        headers: { "User-Agent": "jell-portfolio-3d" },
      },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as {
      current?: { temperature_2m?: number; weather_code?: number };
    };
    const c = data.current;
    if (typeof c?.temperature_2m !== "number") return null;
    return {
      temperatureC: c.temperature_2m,
      emoji: WMO[c.weather_code ?? -1] ?? "🌡️",
    };
  } catch {
    return null;
  }
}
