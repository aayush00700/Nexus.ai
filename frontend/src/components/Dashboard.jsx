import React, { useRef, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import Section1 from "./Sections/Section1";
import Section2 from "./Sections/Section2";
import Section3 from "./Sections/Section3";
import Footer from "./Sections/Footer";
import Navbar from "./DBNav/Navbar";
import Premium from "./NavbarComponents/Premium";


export default function Dashboard({ user }) {
  const [openCard, setOpenCard] = useState(null);
  const section3Ref = useRef(null);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => {
        console.error("Sign-out error:", error);
      });
  };

  const scrollToSection3 = () => {
    const offset = -50;
    const sectionTop = section3Ref.current?.getBoundingClientRect().top + window.pageYOffset + offset;

    window.scrollTo({
      top: sectionTop,
      behavior: "smooth",
    });
  };

  return (
    <div style={styles.container}>
      <Navbar user={user} onLogout={handleLogout} />
      <Section1 />
      <Section2 />
      <div ref={section3Ref}>
        <Section3 />
      </div>
      <Footer scrollToSection3={scrollToSection3} />
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  logoutBtn: {
    marginTop: 20,
    padding: "0.5rem 1rem",
    background: "#7b3fe4",
    border: "none",
    borderRadius: 6,
    color: "#fff",
    cursor: "pointer",
    fontSize: 16,
  },
};
