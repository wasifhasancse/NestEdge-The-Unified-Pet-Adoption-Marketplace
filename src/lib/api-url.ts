const stripTrailingSlash = (value: string): string => value.replace(/\/+$/, "");

export const getApiBaseUrl = (): string => {
  const explicitServerUrl = process.env.NEXT_PUBLIC_SERVER_URL?.trim();
  if (explicitServerUrl) {
    return stripTrailingSlash(explicitServerUrl);
  }

  if (typeof window !== "undefined") {
    return stripTrailingSlash(window.location.origin);
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (appUrl) {
    return stripTrailingSlash(appUrl);
  }

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) {
    return stripTrailingSlash(`https://${vercelUrl}`);
  }

  return "http://localhost:3000";
};

export const buildApiUrl = (path: string): string => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, getApiBaseUrl()).toString();
};
