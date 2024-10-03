/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function FooterBlack() {
  return (
    <>
      <footer className="footer" data-background-color="black">
        <Container>
          <nav>
            <ul>
              <li>
                <a
                  href="https://carey.jhu.edu/cdhai"
                  target="_blank"
                >
                  CDHAI
                </a>
              </li>
              <li>
                <a
                  href="https://carey.jhu.edu/cdhai"
                  target="_blank"
                >
                  About Us
                </a>
              </li>
            </ul>
          </nav>
          <div className="copyright" id="copyright">
            © {new Date().getFullYear()}, Created by{" "} CDHAI

          </div>
        </Container>
      </footer>
    </>
  );
}

export default FooterBlack;
