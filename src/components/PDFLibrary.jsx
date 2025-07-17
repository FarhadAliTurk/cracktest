import React, { useState, useEffect } from 'react';
import { FaLock, FaWhatsapp, FaFilePdf } from 'react-icons/fa';
import './PDFLibrary.css';

const PDFLibrary = () => {
  const [selectedResource, setSelectedResource] = useState(null);

  const premiumResources = [
    {
      id: 1,
      title: 'FPSC Past Papers (2020–2023)',
      pages: 78,
      price: 'Rs. 150',
      whatsappMsg: 'I want to buy FPSC Past Papers (2020–2023) for Rs. 150',
    },
    {
      id: 2,
      title: 'CSS Solved Essays Collection',
      pages: 112,
      price: 'Rs. 200',
      whatsappMsg: 'Interested in CSS Solved Essays Collection for Rs. 200',
    },
    {
      id: 3,
      title: 'PMS Compulsory Subjects Mega Pack',
      pages: 215,
      price: 'Rs. 300',
      whatsappMsg: 'Please send PMS Compulsory Subjects Mega Pack (Rs. 300)',
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
    <section id="pdf-library" className="premium-section" aria-label="Premium PDF Library">
      <div className="pdf-container">
        <div className="section-header">
          <h2>Premium PDF Resources</h2>
          <p>Unlock verified past papers and exclusive study materials</p>
        </div>

        <div className="pdf-grid">
          {premiumResources.map((pdf) => (
            <div key={pdf.id} className="pdf-card">
              <div className="premium-badge" aria-hidden="true">
                <FaLock /> PREMIUM
              </div>
              <div className="pdf-icon">
                <FaFilePdf />
              </div>
              <h3 className="pdf-title">{pdf.title}</h3>
              <p className="pdf-pages">{pdf.pages} pages</p>
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
