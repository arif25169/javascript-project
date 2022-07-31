const roundValue = (amount: number) => {
  const changes = amount * 100;
  return Math.ceil(changes) / 100;
};

export { roundValue };
