import React from 'react';
import './AboutUs.css';
import { motion } from 'framer-motion';

const recognizedLogos = [
  { name: 'SPSC', image: 'https://spsc.gos.pk/images/logo2.png' },
  { name: 'IBA', image: 'https://apply.sts.net.pk/assets/images/logos/logo.png' },
  { name: 'NTS', image: 'https://www.nts.org.pk/new/img/nts_logo.png' },
  { name: 'PTS', image: 'https://pts.org.pk/siteContent/images/logo1.jpg' },
  { name: 'ETEA', image: 'https://etea.edu.pk/images/logo_green.svg' },
  { name: 'OTS', image: 'https://ots.org.pk/images/logo-new-ots.png' },
];

const AboutUs = () => {
  return (
    <section id="about" className="about-section bg-alt" aria-labelledby="about-title" style={{ scrollMarginTop: '90px' }}>
      <div className="background-pattern" aria-hidden="true"></div>

      <motion.div
        className="about-container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="about-title" id="about-title">About CrackTest</h2>
         <p className="about-description">
  CrackTest is Pakistan’s trusted online exam preparation platform, helping students and competitive exam candidates 
  prepare for Grade 14+ government and private sector tests. We offer thousands of smart MCQs, past papers, and 
  mock tests with instant feedback and performance tracking. Users can purchase quiz packages or subscribe to 
  premium features through secure online payments. Our mission is to make exam prep accessible, affordable, and 
  effective for learners across the country.
</p>


        <motion.div
          className="trusted-by"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          role="region"
          aria-labelledby="trusted-title"
        >
          <h3 className="trusted-title" id="trusted-title">Trusted by Candidates of:</h3>
          <div className="logo-grid">
            {recognizedLogos.map((logo, index) => (
              <motion.div
                key={logo.name}
                className="logo-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <img
                  src={logo.image}
                  alt={`${logo.name} Logo`}
                  width="100"
                  height="auto"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutUs;
