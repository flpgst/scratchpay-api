const searchString = (term: string | undefined, fullTerm: string | undefined) => {
  const re = new RegExp(`\\.*${term}\\.*`, 'i');
  return fullTerm?.match(re)?.input;
};

export default searchString;
