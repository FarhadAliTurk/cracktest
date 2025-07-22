import React, { useState, useRef } from 'react';
import './Contact.css';
import { FaPhoneAlt, FaEnvelope, FaClock, FaGlobe } from 'react-icons/fa';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = formRef.current;
    const { name, email, subject, message } = form;

    if (!name.value || !email.value || !subject.value || !message.value) {
      setError("Please fill in all fields.");
      setSubmitted(false);
      return;
    }

    emailjs.sendForm('service_fh9ncne', 'template_3n3kqzs', form, 'dJZ2kZwNBQ7X4TvHU')
      .then(() => {
        setError("");
        setSubmitted(true);
        form.reset();
        setTimeout(() => setSubmitted(false), 4000);
      })
      .catch((err) => {
        console.error(err);
        setError("Something went wrong. Please try again.");
      });
  };

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title" style={{ scrollMarginTop: '90px' }}>
      <div className="contact-container">
        <div className="section-header">
          <h2 className="section-title" id="contact-title">Contact Us</h2>
          <p className="section-subtitle">Reach out to our online support team anytime!</p>
        </div>

        <div className="contact-grid">
          {/* Info Panel */}
          <div className="contact-info" role="complementary" aria-label="Contact information">
            <ContactItem icon={<FaGlobe aria-hidden="true" />} title="Support Center" text="100% Online Platform — Available Worldwide" />
            <ContactItem icon={<FaPhoneAlt aria-hidden="true" />} title="Phone" text={<a href="tel:+923161193300">+92 316 1193300</a>} />
            <ContactItem icon={<FaEnvelope aria-hidden="true" />} title="Email" text={<a href="mailto:farhadaliturk.official@gmail.com">farhadaliturk.official@gmail.com</a>} />
            <ContactItem icon={<FaClock aria-hidden="true" />} title="Availability" text="Support: Mon–Sat | 9AM–6PM (PKT)" />
          </div>

          {/* Form Panel */}
          <form className="contact-form" ref={formRef} onSubmit={handleSubmit} aria-label="Contact form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input id="name" name="name" type="text" placeholder="John Doe" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input id="email" name="email" type="email" placeholder="you@example.com" required />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input id="subject" name="subject" type="text" placeholder="App Feedback or Help" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea id="message" name="message" placeholder="Write your message..." required></textarea>
            </div>
            <button type="submit" className="btn-primary">Send Message</button>
            <div aria-live="polite" className="form-feedback" style={{ minHeight: '1.5em', marginTop: '0.5em', color: error ? '#ef4444' : '#10b981' }}>
              {error && error}
              {submitted && !error && "Thank you! Your message has been sent."}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

const ContactItem = ({ icon, title, text }) => (
  <div className="contact-item">
    <div className="contact-icon">{icon}</div>
    <div className="contact-text">
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  </div>
);

export default Contact;
