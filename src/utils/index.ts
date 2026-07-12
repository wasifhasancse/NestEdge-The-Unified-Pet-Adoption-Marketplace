/**
 * Capitalizes the first letter of a string.
 */
export const capitalize = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Formats a ISO date string into a user-friendly format.
 */
export const formatDate = (dateString?: string | Date): string => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "N/A";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Safely parses numbers from input values.
 */
export const parseNumber = (val: string | number, fallback = 0): number => {
  if (typeof val === "number") return val;
  const parsed = parseFloat(val);
  return isNaN(parsed) ? fallback : parsed;
};
