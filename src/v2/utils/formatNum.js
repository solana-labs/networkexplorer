export default function formatNum(val) {
  if (!val) return 0;
  return val.toLocaleString();
}
