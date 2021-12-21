export const modifyDate = (date) => {
  const modifiedDate = new Date(date).toDateString().split(" ");
  return `${modifiedDate[1]} ${modifiedDate[2]}, ${modifiedDate[3]}`;
}