export default function convertToLocalDateTimeString(dateTime) {
  try {
    const date = new Date(dateTime);
    const offsetMs = date.getTimezoneOffset() * 60 * 1000;
    const dateLocal = new Date(date.getTime() - offsetMs);
    const str = dateLocal
      .toISOString()
      .slice(0, 19)
      .replace(/-/g, '/')
      .replace('T', ' ');
    return str;
  } catch (error) {
    return dateTime;
  }
}
