import React, { useState, useEffect } from 'react';
import { FaLock, FaWhatsapp, FaFilePdf } from 'react-icons/fa';
import './PDFLibrary.css';

const PDFLibrary = () => {
  const [selectedResource, setSelectedResource] = useState(null);

  const premiumResources = [
    {
      id: 1,
      title: 'JST Past Papers (Sindh Govt, 2018–2024)',
      mcqs: 100,
      price: 'Rs. 199',
      whatsappMsg: 'I want to buy JST Past Papers (Sindh Govt, 2018–2024) for Rs. 199',
    },
    {
      id: 2,
      title: 'PST Solved Papers (IBA STS + SIBA)',
      mcqs: 100,
      price: 'Rs. 199',
      whatsappMsg: 'Send PST Solved Papers (IBA STS + SIBA) for Rs. 199',
    },
    {
      id: 3,
      title: 'JEST Solved Papers (IBA STS + SIBA)',
      mcqs: 100,
      price: 'Rs. 199',
      whatsappMsg: 'Send JEST Solved Papers (IBA STS + SIBA) for Rs. 199',
    },
    {
      id: 4,
      title: 'BPS-14 Educator MCQ Pack (All Subjects)',
      mcqs: 100,
      price: 'Rs. 199',
      whatsappMsg: 'Requesting BPS-14 Educator MCQ Pack (All Subjects) for Rs. 199',
    },
  ];

  const handlePurchase = (resource) => {
    setSelectedResource(resource);
    window.open(
      `https://wa.me/923161193300?text=${encodeURIComponent(resource.whatsappMsg)}`,
      '_blank'
    );
  };

  useEffect(() => {
    if (selectedResource) {
      const timer = setTimeout(() => setSelectedResource(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [selectedResource]);

  return (
    <section id="pdf-library" className="pdf-library-section bg-alt" aria-labelledby="pdf-title" style={{ scrollMarginTop: '90px' }}>
      <div className="pdf-container">
        <div className="section-header">
          <h2 className="heading">📚 Premium PDF Resources</h2>
          <p className="subheading">Unlock verified past papers and exclusive study material</p>
        </div>

        <div className="pdf-grid">
          {premiumResources.map((pdf) => (
            <div key={pdf.id} className="pdf-card" tabIndex={0}>
              <div className="premium-badge" aria-hidden="true">
                <FaLock /> PREMIUM
              </div>
              <div className="pdf-icon" role="img" aria-label="PDF file icon">
                <FaFilePdf />
              </div>
              <h3 className="pdf-title">{pdf.title}</h3>
              <p className="pdf-mcqs">{pdf.mcqs} MCQs</p>
              <div className="price-tag">{pdf.price}</div>
              <button
                className="whatsapp-btn"
                onClick={() => handlePurchase(pdf)}
                aria-label={`Buy ${pdf.title} on WhatsApp`}
              >
                <FaWhatsapp /> Buy via WhatsApp
              </button>
            </div>
          ))}
        </div>

        {selectedResource && (
          <div className="purchase-modal" role="status" aria-live="polite">
            ✅ Check WhatsApp to complete your purchase of{' '}
            <strong>{selectedResource.title}</strong>
          </div>
        )}
      </div>
    </section>
  );
};

export default PDFLibrary;
