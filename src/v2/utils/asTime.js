import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import isValid from 'date-fns/isValid';
import parseISO from 'date-fns/parseISO';

function asTime(value) {
  const parsed = parseISO(value);
  if (!value || !isValid(parsed)) return '';
  return formatDistanceToNow(parsed, {addSuffix: true});
}

export default asTime;
