/**
 * BlockDetailView : supports the block detail page
 *
 * Changes:
 *   - 20190912.01 : initial version
 */
const __VERSION__ = 'BlockDetailView@1.0.0';

export class BlockDetailView {
  asVersion(rawData, __errors__, version) {
    if (__errors__) {
      return {
        __VERSION__,
        __errors__,
      };
    }

    const entries = rawData.entries;
    const blockData = rawData.block;

    const block = {
      id: blockData.id,
      slot: parseInt(blockData.s),
      tick_height: parseInt(blockData.h),
      leader: blockData.l,
      entries,
      timestamp: blockData.dt,
    };

    const data = {
      __VERSION__,
      block,
    };

    if (version === 'BlockDetailView@latest' || version === __VERSION__) {
      return data;
    }

    return {
      error: 'UnsupportedVersion',
      currentVersion: __VERSION__,
      desiredVersion: version,
    };
  }
}
