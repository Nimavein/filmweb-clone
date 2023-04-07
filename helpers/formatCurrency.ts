export const formatCurrency = (num: number): string => {
  const formattedNum = num.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formattedNum.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
