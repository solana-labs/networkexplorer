import React from 'react';
import PropTypes from 'prop-types';

class Bx2AppBar extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <header className="bg-black bb b--white-40 relative fixed-l w-100 top-0 left-0 right-0 pa2 pa3-m pv4-l ph3-l z-5 db flex-l items-center justify-between tc tl-l">
          <a
            className="db mv2 mb3-m mb0-l"
            href="https://solana.com"
            rel="nooppener noreferrer"
            target="_new"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="164"
              height="20"
              fill="none"
              viewBox="0 0 164 20"
            >
              <path
                fill="#fff"
                fillRule="evenodd"
                d="M58.496 0h3.58v16.041h14.077l-2.928 3.186h-14.73V0zm-44.63 11.474H6.093v-.002l-.152.002c-3.113 0-5.637-2.569-5.637-5.737S2.828 0 5.941 0c.051 0 .102 0 .152.002V0H19.5l-3.96 3.721H5.936c-1.092 0-1.977.902-1.977 2.016 0 1.113.885 2.016 1.977 2.016h8.382v.018c2.899.237 5.18 2.706 5.18 5.719 0 3.168-2.524 5.737-5.637 5.737-.154 0-.306-.007-.457-.02v.02H0l4.265-3.722h9.601c1.092 0 1.977-.902 1.977-2.015 0-1.114-.885-2.016-1.977-2.016zM32.6.004V0h12.795v.003c1.814.08 3.27 1.562 3.348 3.408h.004v12.094h-.004c.003.052.004.104.004.155 0 1.918-1.487 3.482-3.352 3.563v.004H32.6v-.004c-1.864-.081-3.35-1.645-3.35-3.562 0-.052 0-.104.002-.156h-.003V3.411h.003C29.33 1.565 30.786.082 32.6.003zm2.399 3.41c-1.134.049-2.044.982-2.093 2.143h-.002v7.607h.002a2.44 2.44 0 0 0-.002.098c0 1.206.93 2.19 2.094 2.241v.002h7.998v-.002c1.165-.051 2.094-1.035 2.094-2.241l-.001-.098h.002V5.557h-.002c-.049-1.161-.96-2.094-2.093-2.144v-.002h-7.998v.002zM89.47 5.271v3.721h12.186V5.272c0-1.199-.954-2.17-2.132-2.17h-7.922c-1.177 0-2.132.971-2.132 2.17zm12.186 13.955v-7.443H89.471v7.443h-3.656V3.72h.003a3.827 3.827 0 0 1-.003-.155c0-1.97 1.568-3.566 3.504-3.566l.152.003V0h12.491v.003c1.865.082 3.352 1.646 3.352 3.563 0 .052-.002.104-.004.155h.004v15.506h-3.657zm46.31-13.955v3.721h12.187V5.272c0-1.199-.955-2.17-2.133-2.17H150.1c-1.178 0-2.133.971-2.133 2.17zm12.187 13.955v-7.443h-12.187v7.443h-3.656V3.72h.003a4.018 4.018 0 0 1-.003-.155c0-1.97 1.569-3.566 3.504-3.566.051 0 .101.001.152.003V0h12.491v.003c1.865.082 3.352 1.646 3.352 3.563 0 .052-.002.104-.004.155h.004v15.506h-3.656zm-29.248-4.654V0h3.655v19.227h-3.655v-.033L118.719 4.962v14.265h-3.656V0h3.656l12.187 14.573z"
                clipRule="evenodd"
              />
            </svg>
          </a>

          <div
            className="pa1 b--white-60 ba flex items-center flex-auto mw8"
            style={{borderColor: '#242424'}}
          >
            <input
              type="text"
              placeholder="Search by Transaction hash / block number / application ID"
              className="pa2 input-search lh-copy w-90 flex-auto"
            />
            <button
              type="submit"
              className="pa2 ph3 flex items-center justify-center bg-green button-reset input-reset bw0 pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                fill="none"
                viewBox="0 0 25 25"
              >
                <path
                  fill="#000"
                  stroke="#000"
                  strokeWidth="1.5"
                  d="M.658 10.514c0 5.437 4.423 9.856 9.854 9.856 2.502 0 4.791-.941 6.532-2.484l6.28 6.281a.59.59 0 0 0 .422.175.59.59 0 0 0 .422-.175.591.591 0 0 0 0-.839l-6.285-6.28a9.82 9.82 0 0 0 2.483-6.534c0-5.437-4.423-9.856-9.854-9.856C5.08.658.658 5.076.658 10.514zm18.52 0c0 4.777-3.89 8.667-8.666 8.667-4.777 0-8.666-3.89-8.666-8.667 0-4.778 3.89-8.668 8.666-8.668s8.666 3.885 8.666 8.668z"
                />
              </svg>
            </button>
          </div>

          <div className="dn db-l">Real Time Updates</div>
        </header>
      </div>
    );
  }
}

Bx2AppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Bx2AppBar;
