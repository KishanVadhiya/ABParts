import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-content">
        <h1>About Grasim Industries, Veraval</h1>
        <p>
          Welcome to Grasim Industries, Veraval – a cornerstone of excellence in India’s industrial landscape and a proud part of the Aditya Birla Group. Established in 1947, Grasim began its journey as a textile manufacturer and has since grown into a global leader across diverse sectors. Our Veraval facility, located along the vibrant coastline of Gujarat, embodies this legacy of innovation, quality, and sustainability.
        </p>
        <p>
          At Veraval, we specialize in producing high-quality Viscose Filament Yarn (VFY), a versatile material that powers the textile industry with its strength and elegance. With advanced manufacturing capabilities and a commitment to operational excellence, our plant plays a vital role in meeting the demands of both domestic and international markets. We take pride in our contribution to the fashion and textile sectors, delivering products that blend tradition with modernity.
        </p>
        <p>
          As part of the Aditya Birla Group, a global conglomerate touching millions of lives across 41 countries, Grasim Veraval upholds a vision of creating sustainable value. Our efforts go beyond production – we are dedicated to empowering our workforce, supporting the local community, and embracing eco-friendly practices. From harnessing cutting-edge technology to fostering a culture of care, we strive to make a positive impact every day.
        </p>
        <p>
          For over seven decades, Grasim has been a name synonymous with trust and progress. At Veraval, we continue this tradition, driving innovation and excellence while staying rooted in our purpose of enriching lives and shaping a brighter future.
        </p>
      </div>

      <div className="location-section">
        <h2>Our Location</h2>
        <div className="map-container">
          {/* Embedded Google Maps Location */}
          <iframe
            title="Grasim Industries Veraval Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7453.670198214545!2d70.35499928616734!3d20.918953016133468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bfd323406295f5b%3A0xd220c32443d0564f!2sIndian%20Rayon%20Industries%2C%20Rayon%20Factory%20Area%2C%20Veraval%2C%20Gujarat%20362266!5e0!3m2!1sen!2sin!4v1740680789364!5m2!1sen!2sin"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;