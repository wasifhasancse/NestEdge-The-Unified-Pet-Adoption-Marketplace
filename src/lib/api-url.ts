const stripTrailingSlash = (value: string): string => value.replace(/\/+$/, "");

const LOCAL_API_FALLBACK = "http://localhost:5000";
const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "0.0.0.0"]);

export const getApiBaseUrl = (): string => {
  const explicitServerUrl = process.env.NEXT_PUBLIC_SERVER_URL?.trim();
  if (explicitServerUrl) {
    return stripTrailingSlash(explicitServerUrl);
  }

  const serverUrl = process.env.SERVER_URL?.trim();
  if (serverUrl) {
    return stripTrailingSlash(serverUrl);
  }

  if (typeof window !== "undefined") {
    const { hostname, origin } = window.location;
    if (LOCAL_HOSTS.has(hostname)) {
      return LOCAL_API_FALLBACK;
    }
    return stripTrailingSlash(origin);
  }

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) {
    return stripTrailingSlash(`https://${vercelUrl}`);
  }

  return LOCAL_API_FALLBACK;
};

export const buildApiUrl = (path: string): string => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, getApiBaseUrl()).toString();
};
