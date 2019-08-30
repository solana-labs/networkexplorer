export const MIN_TERM_LEN = 3;
export const LAMPORT_SOL_RATIO = 0.0000000000582;
export const TDS_ACTIVE_STAGE = parseInt(process.env.TDS_ACTIVE_STAGE || '0');

export const SLOTS_PER_DAY = (1.0 * 24 * 60 * 60) / 0.8;
export const TDS_DEFAULT_STAGE_LENGTH_BLOCKS = SLOTS_PER_DAY * 5.0;

export const TDS_STAGES = [
  {id: 0, title: 'Stage 0', hidden: true},
  {
    id: 1,
    title: 'Stage 1',
    startDate: '2019-09-09T17:00:00.0Z',
    endDate: '2019-09-13T17:00:00.0Z',
    duration: TDS_DEFAULT_STAGE_LENGTH_BLOCKS,
  },
  {
    id: 2,
    title: 'Stage 2',
    startDate: '2019-10-07T17:00:00.0Z',
    endDate: '2019-10-11T17:00:00.0Z',
    duration: TDS_DEFAULT_STAGE_LENGTH_BLOCKS,
  },
  {
    id: 3,
    title: 'Stage 3',
    startDate: '2019-11-04T17:00:00.0Z',
    endDate: '2019-11-08T17:00:00.0Z',
    duration: TDS_DEFAULT_STAGE_LENGTH_BLOCKS,
  },
];
