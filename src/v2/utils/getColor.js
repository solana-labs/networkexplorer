import {get} from 'lodash/fp';
export default color => get(`palette.primary.${color}`);
