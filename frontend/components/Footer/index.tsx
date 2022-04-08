import React from "react";

interface FooterProps {}

function Footer({}: FooterProps) {
  return (
    <footer
      className="h-4 bottom-0 outline-hidden"
      style={{ borderTop: "0 none" }}
    >
      © 2022 by LazyJun.
    </footer>
  );
}

export default Footer;
