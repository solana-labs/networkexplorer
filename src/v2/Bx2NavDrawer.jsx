import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

class Bx2NavDrawer extends React.Component {
  render() {
    //const {classes} = this.props;

    return (
      <div className="bg-dark-gray white mw5-l w-100 w-auto-ns flex relative z-3">
        <div className="nowrap overflow-x-auto ph3 ph0-ns pt6-l">
          <NavLink
            className="white dib db-l no-underline tracked ttu tc mr3 mr0-l mb2-l pa2 pa3-l nav__link nt3-l"
            activeClassName="is-active"
            to="/v2/browse"
          >
            <svg
              className="db mb2-m mb3-l center"
              xmlns="http://www.w3.org/2000/svg"
              width="39"
              height="43"
              fill="none"
              viewBox="0 0 39 43"
            >
              <path
                stroke="currentColor"
                d="M11.18 27.955C7.12 22.91 7.917 15.53 12.96 11.469s12.425-3.264 16.486 1.78c4.06 5.043 3.264 12.424-1.78 16.485S15.241 33 11.181 27.954z"
                clipRule="evenodd"
              />
              <path
                stroke="currentColor"
                d="M29.431 27.669l2.3 2.857-4.097 3.298-2.3-2.856"
              />
              <path
                stroke="currentColor"
                d="M38.236 38.593l-4.108 3.308-6.505-8.081 4.106-3.307 6.507 8.08z"
                clipRule="evenodd"
              />
              <path
                stroke="currentColor"
                d="M25.073 9.914v15.165H9.455M9.065 23.284H1V1h22.284v8.53"
              />
            </svg>
            Network Overview
          </NavLink>
          <NavLink
            className="white dib db-l no-underline tracked ttu tc mr4 mr0-l mb2-l pa2 pa3-l nav__link"
            activeClassName="is-active"
            to="/v2/transactions"
          >
            <svg
              className="db mb2-m mb3-l center"
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="30"
              fill="none"
              viewBox="0 0 40 30"
            >
              <path
                stroke="currentColor"
                d="M1.002 8.93v-6.7c0-.27.422-1.23 2.113-1.23h33.816c.705.235 2.113 1.127 2.113 2.818v5.111m-38.042 0h38.042m-38.042 0v4.482M39.044 8.93v4.482m-38.042 0v12.066C1.002 26.983.86 29 3.115 29h33.816c.705-.235 2.113-1.127 2.113-2.818v-12.77m-38.042 0h38.042"
              />
              <path
                fill="currentColor"
                d="M16.166 20.366h12.681v2.818H16.166zM5.141 20.366h7.045v2.818H5.141z"
              />
            </svg>
            Transactions
          </NavLink>
          <NavLink
            className="white dib db-l no-underline tracked ttu tc mr4 mr0-l mb2-l pa2 pa3-l nav__link"
            activeClassName="is-active"
            to="/v2/validators"
          >
            <svg
              className="db mb2-m mb3-l center"
              xmlns="http://www.w3.org/2000/svg"
              width="42"
              height="34"
              fill="none"
              viewBox="0 0 42 34"
            >
              <path
                stroke="currentColor"
                d="M19.535 14.896l.253.253.32-.157 15.72-7.7a.487.487 0 0 1 .658.219l2.915 5.95c.12.244.02.533-.223.652l-2.823 1.383a.477.477 0 0 1-.646-.213l-1.14-2.327-.22-.449-.449.22-11.767 5.765-.357.175.09.387c.922 3.94-.987 8.17-4.844 10.06-4.479 2.194-9.847.396-11.996-3.99-2.15-4.39-.28-9.734 4.198-11.928a8.975 8.975 0 0 1 10.311 1.7zm-4.287 10.596c2.42-1.186 3.45-4.093 2.275-6.49-1.175-2.399-4.103-3.37-6.524-2.183-2.421 1.186-3.451 4.095-2.276 6.494 1.175 2.398 4.104 3.365 6.525 2.179z"
              />
            </svg>
            Validators
          </NavLink>
          <NavLink
            className="white dib db-l no-underline tracked ttu tc mr4 mr0-l mb2-l pa2 pa3-l nav__link"
            activeClassName="is-active"
            to="/v2/tourdesol"
          >
            <svg
              className="db mb2-m mb3-l center"
              xmlns="http://www.w3.org/2000/svg"
              width="43"
              height="46"
              fill="none"
              viewBox="0 0 43 46"
            >
              <path
                fill="transparent"
                stroke="currentColor"
                strokeWidth=".5"
                d="M9.212 33.886c4.351-.28 9.721-1.649 15.127-3.85 5.406-2.203 10.21-4.983 13.529-7.83 1.685-1.445 2.895-2.833 3.588-4.103.693-1.27.877-2.438.478-3.429h0c-.399-.989-1.339-1.699-2.715-2.126-1.376-.427-3.205-.576-5.415-.435l.008.125-.008-.125c-4.355.28-9.721 1.649-15.127 3.853-5.406 2.204-10.21 4.981-13.528 7.828h0C3.463 25.241 2.254 26.63 1.56 27.9c-.693 1.27-.877 2.437-.48 3.427h.001c.35.868 1.117 1.521 2.23 1.956 1.11.435 2.576.657 4.346.657.493 0 1.013-.018 1.554-.053zm0 0l-.008-.125m.008.125s0 0 0 0l-.008-.125m0 0c-.539.035-1.056.052-1.546.052-3.522 0-5.794-.882-6.46-2.533-.757-1.885.674-4.508 4.032-7.39 3.306-2.837 8.097-5.608 13.494-7.809 5.398-2.2 10.75-3.564 15.088-3.843 4.404-.282 7.247.6 8.006 2.483.76 1.885-.674 4.51-4.032 7.39-3.306 2.837-8.097 5.61-13.494 7.808-5.397 2.199-10.754 3.563-15.088 3.842zm24.642-21.016h0c.47-.03.924-.047 1.358-.05v.007h.125c1.658 0 3.025.202 4.048.583 1.023.38 1.687.934 1.967 1.629.32.792.151 1.804-.51 2.975-.66 1.168-1.8 2.473-3.38 3.832-3.263 2.797-8.004 5.543-13.354 7.722-5.35 2.18-10.651 3.53-14.93 3.805-2.072.133-3.79-.006-5.071-.384-1.283-.378-2.105-.988-2.425-1.78-.32-.79-.152-1.802.509-2.972.66-1.168 1.8-2.473 3.38-3.832 3.258-2.799 8.004-5.549 13.354-7.73s10.65-3.531 14.929-3.805z"
              />
              <path
                fill="transparent"
                stroke="currentColor"
                strokeWidth=".5"
                d="M9.213 12.113h0c4.35.28 9.713 1.649 15.127 3.85 5.413 2.203 10.21 4.982 13.528 7.83h0c1.686 1.446 2.895 2.834 3.588 4.104.693 1.27.877 2.437.48 3.427-.349.869-1.115 1.522-2.227 1.958-1.11.435-2.577.657-4.347.657-.495 0-1.014-.018-1.557-.053-4.351-.28-9.714-1.649-15.127-3.85-5.414-2.203-10.21-4.983-13.529-7.83-1.685-1.445-2.895-2.833-3.588-4.103-.693-1.27-.877-2.438-.478-3.429l8.13-2.56zm0 0c-2.21-.141-4.04.008-5.416.435m5.416-.435l-5.416.435m0 0c-1.376.427-2.316 1.137-2.714 2.126l2.714-2.126zm5.408-.31v0zm28.253 12.035l.081-.095-.081.095c1.58 1.356 2.72 2.658 3.38 3.826.66 1.17.828 2.183.509 2.978-.32.795-1.14 1.405-2.424 1.782-1.28.377-3 .514-5.073.381-4.278-.275-9.579-1.623-14.929-3.805-5.35-2.181-10.092-4.925-13.353-7.722-1.582-1.357-2.722-2.66-3.382-3.828-.66-1.17-.829-2.184-.51-2.979.28-.695.944-1.248 1.968-1.63.996-.37 2.32-.571 3.921-.581v.007h.125c.474.002.97.016 1.486.043 4.276.274 9.578 1.626 14.928 3.805 5.35 2.18 10.092 4.923 13.354 7.723z"
              />
              <path
                fill="transparent"
                stroke="currentColor"
                strokeWidth=".5"
                d="M16.332 38.516h0c.667 2.11 1.454 3.756 2.323 4.877.868 1.12 1.832 1.732 2.853 1.732 1.02 0 1.983-.612 2.852-1.732.869-1.12 1.656-2.767 2.323-4.877 1.314-4.151 2.035-9.661 2.035-15.515 0-5.854-.721-11.364-2.035-15.517-.667-2.11-1.454-3.756-2.323-4.877-.868-1.12-1.832-1.732-2.852-1.732-1.021 0-1.983.612-2.85 1.732-.868 1.12-1.655 2.767-2.326 4.877h0C15.02 11.637 14.3 17.149 14.3 23s.721 11.362 2.033 15.515zm.602-30.838h0c.624-1.979 1.362-3.527 2.152-4.578.765-1.017 1.562-1.548 2.338-1.584h.084c.804 0 1.63.532 2.422 1.585.789 1.05 1.525 2.598 2.152 4.577 1.29 4.085 2.004 9.526 2.004 15.323 0 5.797-.714 11.24-2.004 15.323h0c-.625 1.979-1.361 3.527-2.15 4.578-.792 1.054-1.62 1.586-2.424 1.586-.805 0-1.631-.532-2.423-1.586-.788-1.05-1.525-2.599-2.151-4.578-1.291-4.085-2.003-9.526-2.003-15.323 0-5.797.712-11.238 2.003-15.323z"
              />
            </svg>
            Tour De Sol
          </NavLink>
          <NavLink
            className="white dib db-l no-underline tracked ttu tc mr4 mr0-l mb2-l pa2 pa3-l nav__link"
            activeClassName="is-active"
            to="/v2/applications"
          >
            <svg
              className="db mb2-m mb3-l center"
              xmlns="http://www.w3.org/2000/svg"
              width="37"
              height="39"
              fill="none"
              viewBox="0 0 37 39"
            >
              <path stroke="currentColor" d="M13.938 1h18.114v37H5.708V8.927" />
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.85 1.045v7.889H5.808l8.044-7.889z"
                clipRule="evenodd"
              />
              <path
                stroke="currentColor"
                d="M12.095 15.72h11.54l2.882-2.564h9.774M.553 18.175H8.42l2.24 2.565h14.73M.553 28.427H8.42l2.24 2.564h14.73"
              />
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M11.385 25.812a1.25 1.25 0 1 1 2.499 0 1.25 1.25 0 0 1-2.5 0z"
                clipRule="evenodd"
              />
            </svg>
            Applications
          </NavLink>
          <NavLink
            className="white dib db-l no-underline tracked ttu tc mr4 mr0-l mb2-l pa2 pa3-l nav__link"
            activeClassName="is-active"
            to="/v2/blocks"
          >
            <svg
              className="db mb2-m mb3-l center"
              xmlns="http://www.w3.org/2000/svg"
              width="39"
              height="39"
              fill="none"
              viewBox="0 0 39 39"
            >
              <path
                stroke="currentColor"
                d="M1 10.75h9.75V1H1v9.75zM1.124 24.4h9.75v-9.749h-9.75v9.75zM14.63 24.4h9.749v-9.749h-9.75v9.75zM1.124 38h9.75v-9.75h-9.75V38zM14.91 38h9.75v-9.75h-9.75V38zM28.375 38h9.749v-9.75h-9.75V38z"
                clipRule="evenodd"
              />
            </svg>
            Blocks
          </NavLink>
          <NavLink
            className="white dib db-l no-underline tracked ttu tc mr4 mr0-l mb2-l pa2 pa3-l nav__link"
            activeClassName="is-active"
            to="/v2/favorites"
          >
            <svg
              className="db mb2-m mb3-l center"
              xmlns="http://www.w3.org/2000/svg"
              width="37"
              height="36"
              fill="none"
              viewBox="0 0 37 36"
            >
              <path
                stroke="currentColor"
                d="M19.927 1.773c-.45-1.382-2.405-1.382-2.854 0L13.646 12.32a.5.5 0 0 1-.475.345H2.08c-1.453 0-2.057 1.86-.882 2.714l8.972 6.518a.5.5 0 0 1 .182.56L6.926 33.002c-.45 1.382 1.133 2.531 2.308 1.677l8.972-6.518a.5.5 0 0 1 .588 0l8.972 6.518c1.175.854 2.757-.295 2.308-1.677l-3.427-10.547a.5.5 0 0 1 .182-.559L35.8 15.38c1.175-.854.571-2.714-.882-2.714h-11.09a.5.5 0 0 1-.475-.345L19.927 1.773z"
              />
            </svg>
            Favorites
          </NavLink>
        </div>
      </div>
    );
  }
}

Bx2NavDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Bx2NavDrawer;
