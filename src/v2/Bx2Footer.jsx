import React from 'react';

class Bx2Footer extends React.Component {
  render() {
    return (
      <div>
        <footer id="commonfoot">
          <div className="footer">
            <div className="foot-col-1">
              <img
                className="desk-block"
                src="https://solana.com/img/footer.svg"
                alt=""
              />
              <img
                className="mob-block"
                src="https://solana.com/img/block1_mb.svg"
                alt=""
              />
            </div>
            <div className="foot-col-2">
              <div className="foot-col2-data">
                <img
                  src="https://solana.com/img/footer_logo.svg"
                  alt="Solana"
                />
                <h1>Join the Newsletter</h1>
                <p>Stay up to date with the latest Solana news</p>
                <a href="https://solana.com/newsletter/index.php">
                  <button>SIGN UP</button>
                </a>

                <h4>© Copyright Solana Labs, Inc. All rights reserved</h4>
              </div>
            </div>
            <div className="foot-col-3">
              <div className="foot-col3-data">
                <h1>Partnership</h1>
                <p>
                  Solana has transformed the blockchain into an enterprise-grade
                  computing platform.
                </p>
                <a
                  href="https://solana.com/partnerships/"
                  className="all_button_border"
                >
                  <button>PARTNER WITH US</button>
                </a>

                <a href="https://forums.solana.com/" target="_blank">
                  <h5>
                    DISCUSS ON FORUMS{' '}
                    <span className="icon-New-Arrow2">
                      <span className="path1"></span>
                      <span className="path2"></span>
                      <span className="path4"></span>
                      <span className="path5"></span>
                      <span className="path6"></span>
                      <span className="path7"></span>
                    </span>
                  </h5>
                </a>

                <div className="team_member1">
                  <a href="#0" data-type="memberfooter-1">
                    <h5>
                      WEBSITE DISCLAIMER{' '}
                      <span className="icon-New-Arrow2">
                        <span className="path1"></span>
                        <span className="path2"></span>
                        <span className="path4"></span>
                        <span className="path5"></span>
                        <span className="path6"></span>
                        <span className="path7"></span>
                      </span>
                    </h5>
                  </a>
                </div>
              </div>
            </div>
            <div className="foot-col-4">
              <div className="social">
                <a
                  href="https://discordapp.com/invite/pquxPsq"
                  target="_blank"
                  rel="nooppener noreferrer"
                >
                  <span className="icon-solana-social-discord">
                    <span className="path1"></span>
                    <span className="path2"></span>
                  </span>
                </a>
              </div>
              <div className="social">
                <a
                  href="https://t.me/solanaio"
                  target="_blank"
                  rel="nooppener noreferrer"
                >
                  <span className="icon-solana-social-telegram">
                    <span className="path1"></span>
                    <span className="path2"></span>
                    <span className="path3"></span>
                  </span>
                </a>
              </div>
              <div className="social">
                <a
                  href="https://www.reddit.com/r/solana"
                  target="_blank"
                  rel="nooppener noreferrer"
                >
                  <span className="icon-solana-social-reddit">
                    <span className="path1"></span>
                    <span className="path2"></span>
                  </span>
                </a>
              </div>
              <div className="social">
                <a
                  href="https://twitter.com/solanalabs"
                  target="_blank"
                  rel="nooppener noreferrer"
                >
                  <span className="icon-solana-social-Twitter">
                    <span className="path1"></span>
                    <span className="path2"></span>
                  </span>
                </a>
              </div>
              <div className="social">
                <a
                  href="https://medium.com/solana-labs"
                  target="_blank"
                  rel="nooppener noreferrer"
                >
                  <span className="icon-solana-social-medium">
                    <span className="path1"></span>
                    <span className="path2"></span>
                  </span>
                </a>
              </div>
              <div className="social">
                <a
                  href="https://github.com/solana-labs"
                  target="_blank"
                  rel="nooppener noreferrer"
                >
                  <span className="icon-solana-social-github">
                    <span className="path1"></span>
                    <span className="path2"></span>
                  </span>
                </a>
              </div>
              <div className="social">
                <a
                  href="https://www.youtube.com/channel/UC9AdQPUe4BdVJ8M9X7wxHUA"
                  target="_blank"
                  rel="nooppener noreferrer"
                >
                  <span className="icon-solana-social-youtube">
                    <span className="path1"></span>
                    <span className="path2"></span>
                  </span>
                </a>
              </div>
            </div>
            <div className="foot-col4-data">
              <h4>© Copyright Solana Labs, Inc. All rights reserved</h4>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

Bx2Footer.propTypes = {};

export default Bx2Footer;
