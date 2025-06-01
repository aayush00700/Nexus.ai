import React, { useState, useEffect } from 'react';
import AboutUs from '../NavbarComponents/AboutUs';
import Help from '../NavbarComponents/Help';
import Pricing from '../NavbarComponents/Premium';
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from '../../firebase'; // Import Firestore

const Navbar = ({ user, onLogout }) => {
  const [dropdown, setDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [openCard, setOpenCard] = useState(null); // null or 'about', 'premium', ...
  const ue = user.email.toUpperCase();
  const [credits, setCredits] = useState(null);

  useEffect(() => {
    const fetchCredits = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return;
      const userRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        setCredits(docSnap.data().credits);
      }
    };

    fetchCredits();
  }, []);

  const toggleDropdown = (menu) => {
    setDropdown(dropdown === menu ? null : menu);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      style={{
        ...styles.navbar,
        background: scrolled
          ? 'rgba(132, 56, 152, 0.7)' // Show background after scroll
          : 'rgba(255, 255, 255, 0)'  // Transparent when at top
      }}
    >
      {/* Logo */}
      <div style={styles.logoContainer}>
        <img src={import.meta.env.BASE_URL + "LOGoo.png"} alt="Logo" style={styles.logo} />
        <span style={styles.brand}>NEXUS</span>
      </div>

      {/* Menu */}
      <div style={styles.menu}>
        {[['About Us','about'], ['Help','help'], ['Pricing','pricing']].map((item, index) => (
          <div key={index} style={styles.dropdown}>
            <a style={styles.dropdowntxt}>{item[0]}</a>
            <div onClick={() => setOpenCard(item[1])} style={styles.image}>
              <img
                style={styles.imgg}
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACPSURBVHgB7dDtCYAgEMbxZ5RGaoNGaYRGaKRGaIRGuE5QChF8wVTo+cF9vOOvABEREdEviMiic+hsKKS7q70xozY9espjRyaz89q/UJt9uZREenHGidr06OT9YlJkKM7cwhdyI5vG5UZ2iUuN7BoXixwiLhI5RlxCZP84JxA5TpzzihwvzrGRE4iIiIhauQFmrqo9/WgZrgAAAABJRU5ErkJggg=="
                alt=""
              />
            </div>
          </div>
        ))}
      </div>
      {openCard === 'about' && <AboutUs onClose={() => setOpenCard(null)} />}
      {openCard === 'help' && <Help onClose={() => setOpenCard(null)} />}
      {openCard === 'pricing' && <Pricing onClose={() => setOpenCard(null)} />}
      
      {/* Sign Up Button */}
      <div style={styles.rightNav}>
        <div style={styles.creditDiv}>
          <p style={styles.credit}>{credits}</p>
          <img src={import.meta.env.BASE_URL + "creditImg.png"} alt="" style={styles.creditImg} />
        </div>
        <div style={styles.buttonDiv}>
          <div style={styles.accountDiv}>
            {user ? (
              <>
                <p style={styles.usrImg}>{ue[0]}</p>
                <span style={styles.userInfo}>{user.email}</span>
              </>
            ) : (
              <span style={styles.userInfo}>Not logged in</span>
            )}
          </div>
          <button onClick={onLogout} style={styles.signupBtn}>Log Out</button>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    width: '98%',
    background: 'rgba(255, 255, 255, 0)', // Semi-transparent white; use 'transparent' for full transparency
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'fixed',
    padding: '0.3125rem 1.25rem', // 5px 20px
    zIndex: 50,
    transition: 'background 0.3s ease',
    backdropFilter: 'blur(10px)', // Optional for glass effect
  },
  rightNav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: '1.5rem', // 24px
    marginRight: '1.5rem', // 24px
  },  
  creditDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '0.2rem', // 6px
    marginLeft: '1rem', // 16px
    height: '1.5rem', // 24px
    width: '3rem', // 72px
  },
  credit: {
    color: 'rgba(255, 255, 0, 0.93)',
    fontSize: '1rem', // 20px
    fontWeight: 'bold',
    marginRight: '0.07rem', // 8px
    fontFamily: 'roboto sans-serif',
  },
  creditImg: {
    width: '1.1rem', // 20px
    height: '1.1rem', // 20px
    marginTop: '0.3rem', // 8px
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  buttonDiv: {
    paddingRight: '1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '0.5rem', // 8px
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '0.25rem', // 4px
  },
  accountDiv: {
    display: 'flex',
    alignItems: 'center',
    color: '#fff',
    fontSize: '0.85rem', // 14px
    padding: '0.1rem 0.2rem', // 4px 12px
    borderRadius: '0.375rem', // 6px
    flexDirection: 'column',
    marginTop: '0.2rem', // 4px
  },
  usrImg:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '2rem', // 20px
    height: '2rem', // 20px
    borderRadius: '50%',
    backgroundColor: 'rgba(166, 25, 43, 0.8)', // Semi-transparent black
    color: '#fff',
    textAlign: 'center',
    fontSize: '1.1rem', // 12px
    fontWeight: 'bold',
    cursor: 'pointer',
    margin: '0rem 0rem 0rem 0rem', // 8px
  },
  userInfo: {
    fontSize: '0.6rem', // 14px
    color: '#fff',
    padding: '0.25rem 0.75rem', // 4px 12px
    borderRadius: '0.375rem', // 6px
    marginLeft: '0rem', // Fixed typo here (was marginleft)
  },
  logo: {
    height: '1.3rem', // 32px
    width: 'auto',
    marginRight: '0.75rem', // 12px
    backgroundColor:'rgba(0, 0, 0, 0.8)', // Ensure the logo has no background
    borderRadius: '0.12rem', // 4px
  },
  image: {
    width: '1rem', // 20px
    padding: '0.25rem', // 4px
    marginTop: '0.3rem', // 8px
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  imgg:{
    width: '1.7rem', // 20px
  },
  brand: {
    fontSize: '1.2rem', // 20px
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.8)', // Dark color for the brand name
    fontFamily: 'sans-serif',
 },
  menu: {
    display: 'flex',
    gap: '3rem', // 32px
    fontSize: '0.875rem', // 14px
    color: '#555',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdown: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#555',
    fontSize: '0.875rem', // 14px
    transition: 'color 0.2s'
  },
  signupBtn: {
    background: 'rgba(89, 0, 197, 0.93)', // Semi-transparent black
    color: 'white',
    padding: '0rem 0.4rem', // 8px 20px
    borderRadius: '3px',
    fontSize: '0.9rem', // 14px
    border: 'none',
    cursor: 'pointer',
    transition: 'background 0.2s',
    fontWeight: 'bold', 
    height: '1.9rem', // 24px
    marginTop: '0.8rem', // 4px
    marginLeft: '1rem', // 8px
  },
  dropdowntxt: {
    color: 'rgba(255, 213, 0, 0.71)',
    fontSize: '1rem', // fixed font size typo here
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background 0.2s, color 0.2s',
    fontFamily: 'sans-serif',
  }
};

export default Navbar;
