export const formatedDate = (rawDate?: string) => {
  const options = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
  const date = rawDate ? new Date(rawDate) : new Date();

  //@ts-ignore
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
  return formattedDate
}

