import React from 'react';

export default function Footer () {
    return (
        <footer className="footer">
            <div className="website-links">
                <h4 className="footer-title">Internal Website Links</h4>
                <p className="footer-p">More info to come shortly.</p>
            </div>
            <div className="contact-info">
                <h4 className="footer-title">Contact Information</h4>
                    <h5 className="subheading">Email</h5>
                        <p className="footer-p">info@sportsgalore.co.uk</p>
                    <h5 className="subheading">Telephone</h5>
                        <p className="footer-p">01772 953781</p>
                    <h5 className="subheading">Address</h5>
                        <p className="footer-p">Sports Galore</p>
                        <p className="footer-p">12 Cotton Court</p>
                        <p className="footer-p">Church Street</p>
                        <p className="footer-p">Preston</p>
                        <p className="footer-p">PR1 3BY</p>
            </div>
            <div className="parnerships-socials">
                <h4 className="footer-title">Parnerships</h4>
                    <p className="footer-p">Parnerships are coming soon</p>
                <h4 className="footer-title">Socials</h4>
                    <p className="footer-p">Socials are coming soon</p>
            </div>
        </footer>
    );
};