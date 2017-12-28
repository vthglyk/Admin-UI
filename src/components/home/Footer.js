import React from 'react';
import { imageFolder } from "../../configuration";

const Footer = () => {
    return (
        <div className="footer">
            <a className="external symbiote" href="http://www.symbiote-h2020.eu/">
                <img src={`${imageFolder}/symbiote-homepage.png`} />
            </a>
            <a className="external epi" href="http://iot-epi.eu/">
                <img src={`${imageFolder}/IoT-EPI-logo1.png`} />
            </a>
            <a className="external commision">
                <img src={`${imageFolder}/ECH2020.png`} />
            </a>
        </div>
    )
};

export default Footer;