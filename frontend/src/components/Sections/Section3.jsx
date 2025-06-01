import React from 'react';

const Section3 = () => {
    return (
        <section style={styles.section}>
            <p style={styles.title}>
                Who we help
            </p>
            <h2 style={styles.subtitle}>
                Built for everyone, every team
            </h2>
            <div style={styles.scrollArea}>
                <section style={styles.item}>
                    <img
                        src="https://cdn-docs.vizard.ai/0-web-static/image/home/who_we_help_image1.webp"
                        alt="Vizard for creator & podcaster"
                        draggable="false"
                        loading="lazy"
                        style={styles.itemImage}
                    />
                    <h3 style={styles.itemTitle}>Nexus for creator & podcaster</h3>
                    <p style={styles.itemDescription}>
                        Clip long-form videos and 10x your viewership with zero effort.
                    </p>
                </section>

                <section style={styles.item}>
                    <img
                        src="https://cdn-docs.vizard.ai/0-web-static/image/home/who_we_help_image2.webp"
                        alt="Vizard for coach & business owners"
                        draggable="false"
                        loading="lazy"
                        style={styles.itemImage}
                    />
                    <h3 style={styles.itemTitle}>Nexus for coach & business owners</h3>
                    <p style={styles.itemDescription}>
                        Clip webinar, client calls and interviews to build your personal brand.
                    </p>
                </section>

                <section style={styles.item}>
                    <img
                        src="https://cdn-docs.vizard.ai/0-web-static/image/home/who_we_help_image3.webp"
                        alt="Vizard for marketers"
                        draggable="false"
                        loading="lazy"
                        style={styles.itemImage}
                    />
                    <h3 style={styles.itemTitle}>Nexus for marketers</h3>
                    <p style={styles.itemDescription}>
                        Turn one webinar into a month worth of social media content. Supercharge your marketing team.
                    </p>
                </section>

                <section style={styles.item}>
                    <img
                        src="https://cdn-docs.vizard.ai/0-web-static/image/home/who_we_help_image4.webp"
                        alt="Vizard for agency and freelancer"
                        draggable="false"
                        loading="lazy"
                        style={styles.itemImage}
                    />
                    <h3 style={styles.itemTitle}>Nexus for agency and freelancer</h3>
                    <p style={styles.itemDescription}>
                        Increase your output tenfold at a fraction of the cost. Let Vizard be your editing co-pilot.
                    </p>
                </section>
            </div>

            <img
                src="https://cdn-docs.vizard.ai/0-web-static/image/home/who_we_help_bg.webp"
                draggable="false"
                alt="who we help area background"
                loading="lazy"
                style={styles.backgroundImage}
            />

            <a href='' style={styles.button}>
                GET CLIPS
            </a>
        </section>
    );
};

const styles = {
    section: {
        padding: '2rem',
        textAlign: 'center',
        backgroundColor: '#f9f9f9',
        position: 'relative',
        backgroundImage: 'url(/section3BG.webp)',
        backgroundSize: 'cover',
    },
    title: {
        fontSize: '1.2rem',
        color: 'rgb(219, 45, 164)',
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        marginBottom: '0rem',
    },
    subtitle: {
        fontSize: '3rem',
        marginBottom: '2rem',
        fontWeight: 'bold',
        color: 'rgb(123, 34, 139)',
        fontFamily: 'sans-serif',
        marginTop: '0.5rem',
    },
    scrollArea: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '2rem',
        zIndex: 2,
    },
    item: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '10px',
        padding: '1rem',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '250px',
        textAlign: 'center',
    
    },
    itemImage: {
        width: '100%',
        height: 'auto',
        borderRadius: '8px',
        marginBottom: '1rem',
    },
    itemTitle: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        marginBottom: '0.5rem',
        color: 'rgba(98, 31, 164, 0.92)',
        fontFamily: 'sans-serif',
    },
    itemDescription: {
        fontSize: '1rem',
        color: '#666',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: 0,
        opacity: 0.05,
    },
    button: {
        marginTop: '2rem',
        padding: '1rem 2rem',
        backgroundColor: 'rgba(50, 23, 170, 0.88)',
        color: '#fff',
        border: 'none',
        borderRadius: '0.2rem',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '1rem',
        display: 'inline-block',
        zIndex: 2,
        position: 'relative',
        fontFamily: 'roboto, sans-serif',
    }
};

export default Section3;
