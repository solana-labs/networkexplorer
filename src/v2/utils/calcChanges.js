// @flow

export default (oldValue: string | number, newValue: string | number) => {
  if (!oldValue || !newValue) {
    return 0;
  }
  return ((+newValue * 100) / (+oldValue || 1) - 100).toFixed(2);
};
