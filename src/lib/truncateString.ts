export default function truncateString(str: string, maxLength = 100) {
  str = str.trim();
  if (str.length <= maxLength) return str;

  const lastSpaceIndex = str.lastIndexOf(' ', maxLength);

  return lastSpaceIndex > -1 
      ? str.slice(0, lastSpaceIndex) + '...' 
      : str.slice(0, maxLength) + '...';
}
