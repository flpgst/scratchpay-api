export const searchString = (term: string | undefined, fullTerm: string | undefined) => {
  const regex = new RegExp(`\\.*${term}\\.*`, 'i');

  return fullTerm?.match(regex)?.input;
};
