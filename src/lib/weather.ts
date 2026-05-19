export interface Weather {
  temperatureC: number;
  emoji: string;
  sunrise: string | null; // "HH:MM" KST
  sunset: string | null; // "HH:MM" KST
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
      "https://api.open-meteo.com/v1/forecast?latitude=37.5665&longitude=126.978&current=temperature_2m,weather_code&daily=sunrise,sunset&timezone=Asia/Seoul",
      {
        next: { revalidate: 3600 },
        headers: { "User-Agent": "jell-portfolio-3d" },
      },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as {
      current?: { temperature_2m?: number; weather_code?: number };
      daily?: { sunrise?: string[]; sunset?: string[] };
    };
    const c = data.current;
    if (typeof c?.temperature_2m !== "number") return null;
    // sunrise/sunset come back as "YYYY-MM-DDTHH:MM" already in Asia/Seoul.
    const hhmm = (iso?: string) => {
      if (!iso) return null;
      const m = iso.match(/T(\d{2}:\d{2})/);
      return m ? m[1] : null;
    };
    return {
      temperatureC: c.temperature_2m,
      emoji: WMO[c.weather_code ?? -1] ?? "🌡️",
      sunrise: hhmm(data.daily?.sunrise?.[0]),
      sunset: hhmm(data.daily?.sunset?.[0]),
    };
  } catch {
    return null;
  }
}
