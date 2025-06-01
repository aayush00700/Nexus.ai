import React, { useState } from "react";
import AboutUs from "../NavbarComponents/AboutUs";
import Premium from "../NavbarComponents/Premium";
import Help from "../NavbarComponents/Help";
import Terms from "../NavbarComponents/Terms";
import Contact from "../NavbarComponents/Contact";

export default function TopBar() {
  const [openCard, setOpenCard] = useState(null); // null or 'about', 'premium', ...

  return (
    <>
      <div style={styles.navbar}>
        <div style={styles.links}>
          <button style={styles.link} onClick={() => setOpenCard('about')}>About Us</button>
          <button style={styles.link} onClick={() => setOpenCard('premium')}>Pricing</button>
          <button style={styles.link} onClick={() => setOpenCard('help')}>Help</button>
          <button style={styles.link} onClick={() => setOpenCard('terms')}>Terms</button>
          <button style={styles.link} onClick={() => setOpenCard('contact')}>Contact</button>
        </div>
      </div>

      {openCard === 'about' && <AboutUs onClose={() => setOpenCard(null)} />}
      {openCard === 'premium' && <Premium onClose={() => setOpenCard(null)} />}
      {openCard === 'help' && <Help onClose={() => setOpenCard(null)} />}
      {openCard === 'terms' && <Terms onClose={() => setOpenCard(null)} />}
      {openCard === 'contact' && <Contact onClose={() => setOpenCard(null)} />}
    </>
  );
}

const styles = {
  navbar: {
    position: "absolute",
    top: "1.8rem",
    left: "6rem",
    zIndex: 10,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    fontFamily: "'Poppins', sans-serif",
    width: "auto",
    padding: "0.5rem",
    borderRadius: "3px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
    backdropFilter: "blur(8px)",
    border: "2px solid transparent",
    backgroundImage: `
      linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
      linear-gradient(to right, rgba(9, 181, 255, 0.8), rgba(183,33,255,0.8), rgba(241, 52, 99, 0.8))
    `,
    backgroundOrigin: "border-box",
    backgroundClip: "padding-box, border-box",
  },
  links: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  link: {
    color: "#fff",
    fontSize: "0.85rem",
    fontWeight: "600",
    padding: "0.35rem 0.75rem",
    borderRadius: "6px",
    background: "rgba(0, 0, 0, 1)",
    border: "2px solid",
    borderImageSlice: 1,
    borderImageSource: "linear-gradient(to right, rgba(9, 181, 255, 0.8), rgba(183,33,255,0.8), rgba(241, 52, 99, 0.8))",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
};
