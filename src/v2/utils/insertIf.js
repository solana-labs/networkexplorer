export default function insertIf(condition, ...elements) {
  return condition ? elements : [];
}
