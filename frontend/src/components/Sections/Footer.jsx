import React from "react";
import { useRef, useState } from "react";
import Premium from "../NavbarComponents/Premium";
import Section3 from "./Section3";
import Terms from "../NavbarComponents/Terms";
import AboutUs from "../NavbarComponents/AboutUs";
import Help from "../NavbarComponents/Help";
import Contact from "../NavbarComponents/Contact";

const Footer = ({ scrollToSection3 }) => {

    const [openCard, setOpenCard] = useState(null); // null or 'about', 'premium', ...

    return (
        <div style={style.footerContainer}>
            <div style={style.companyInfo}>
                <div style={style.companyLogo}>
                    <img src={import.meta.env.BASE_URL + "LOGoo.png"} alt="Company Logo" style={style.logo} />
                    <p style={style.companyName}>Nexus</p>
                </div>
                <div style={style.companyHandle}>
                    <p style={style.handleText}>Follow us on:</p>
                    <div style={style.socialIcons}>
                        <a href="https://www.facebook.com/share/1F4uMPEEcH/" target="_blank" rel="noopener noreferrer">
                            <img src={import.meta.env.BASE_URL + "facebooklogo.png"} alt="Facebook" style={style.icon} />
                        </a>
                        <a href="https://x.com/Nexus_ai_1?t=kAD-hYYyH9bTmkDPpYvLoA&s=09" target="_blank" rel="noopener noreferrer">
                            <img src={import.meta.env.BASE_URL + "twitter.png"} alt="Twitter" style={style.icon} />
                        </a>
                        <a href="https://www.instagram.com/nexus_ai_1?igsh=MXBjdmc4a2VqaXJlNw==" target="_blank" rel="noopener noreferrer">
                            <img src={import.meta.env.BASE_URL + "instagram.png"} alt="Instagram" style={style.icon} />
                        </a>
                        <a href="https://www.linkedin.com/in/nexus-ai-160134369?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
                            <img src={import.meta.env.BASE_URL + "linkedin.png"} alt="LinkedIn" style={style.icon} />
                        </a>
                     </div>
                </div>  
            </div>
            <div style={style.footerLinks}>
                <div style={style.link}>
                    <h1 style={style.linkTitle}>Tools</h1>
                    <a href='' style={style.linkElements}>Clip Generator</a>
                    <a href='' style={style.linkElements}>Youtube Short generator</a>
                    <a href='' style={style.linkElements}>Instagram Reel generator</a>
                    <a href='' style={style.linkElements}>Tik Tok generator</a>
                    <a href='' style={style.linkElements}>AI clih generator</a>
                </div>
                <div style={style.link}>
                    <h1 style={style.linkTitle}>Who we help</h1>
                    <a onClick={scrollToSection3} style={style.linkElements}>Content Creators</a>
                    <a onClick={scrollToSection3} style={style.linkElements}>Podcasters</a>
                    <a onClick={scrollToSection3} style={style.linkElements}>Marketers</a>
                    <a onClick={scrollToSection3} style={style.linkElements}>Agency and freelancer</a>
                    <a onClick={scrollToSection3} style={style.linkElements}>Businesses</a>
                </div>
                <div style={style.link}>
                    <h1 style={style.linkTitle}>Pricing</h1>
                    <a href='' style={style.linkElements}>Free Trial</a>
                    <a onClick={() => setOpenCard('premium')} style={style.linkElements}>Plans</a>
                </div>  
                {openCard === 'premium' && <Premium onClose={() => setOpenCard(null)} />}
                <div style={style.link}>
                    <h1  style={style.linkTitle}>Company</h1>
                    <a onClick={() => setOpenCard('about')} style={style.linkElements}>About Us</a>
                    <a onClick={() => setOpenCard('contact')} style={style.linkElements}>Contact</a>
                    <a onClick={() => setOpenCard('help')} style={style.linkElements}>Help</a>
                    <a onClick={() => setOpenCard('terms')} style={style.linkElements}>Terms of Service</a>
                </div>
                {openCard === 'about' && <AboutUs onClose={() => setOpenCard(null)} />}
                {openCard === 'help' && <Help onClose={() => setOpenCard(null)} />}
                {openCard === 'terms' && <Terms onClose={() => setOpenCard(null)} />}
                {openCard === 'contact' && <Contact onClose={() => setOpenCard(null)} />}
            </div>
        </div>
    );
};

const style = {
    footerContainer: {
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#1f1f2e",
        color: "white",
        padding: "3rem 5rem",
        flexWrap: "wrap",
        alignItems: "flex-start",
        flexDirection: "coloumn",
    },
    companyInfo: {
        maxWidth: "25rem",
        display: "flex",
        flexDirection: "column",
        marginBottom: "0rem",
    },
    companyLogo: {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        marginBottom: "0rem",
    },
    logo: {
        width: "3.5rem",
        height: "3.5rem",
    },
    companyName: {
        fontSize: "2.3rem",
        fontWeight: "bold",
        fontfamily: "roboto sans-serif",
    },
    companyHandle: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },
    handleText: {
        fontSize: "1.15rem",
    },
    socialIcons: {
        display: "flex",
        gap: "1.1rem",
    },
    icon: {
        width: "2.4rem",
        height: "2.4rem",
        cursor: "pointer",
        transition: "transform 0.2s",
    },
    footerLinks: {
        display: "flex",
        flexWrap: "wrap",
        gap: "3rem",
    },
    link: {
        minWidth: "10rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.7rem",
        justifyContent: "left",
        alignItems: "flex-start",
    },
    linkTitle: {
        fontSize: "1.3rem",
        fontWeight: "bold",
        marginBottom: "1rem",
    },
    linkElements: {
        fontSize: "1rem",
        color: "#cccccc",
        cursor: "pointer",
        transition: "color 0.2s",
        textDecoration: "none",
        "&:hover": {
            color: "rgba(98, 31, 164, 0.92)",
        },
    },
};

export default Footer;
