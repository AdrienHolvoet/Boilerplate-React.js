export const convertDate = (date) => {
  let newDate = new Date(date * 1000);
  return newDate.toLocaleString();
};
