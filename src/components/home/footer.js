import React from "react";
import { IMAGE_FOLDER } from "../../configuration";

const Footer = () => {
    return (
        <div className="footer">
            <a className="external symbiote" href="http://www.symbiote-h2020.eu/">
                <img src={`${IMAGE_FOLDER}/symbiote-homepage.png`} />
            </a>
            <a className="external epi" href="http://iot-epi.eu/">
                <img src={`${IMAGE_FOLDER}/IoT-EPI-logo1.png`} />
            </a>
            <a className="external commision">
                <img src={`${IMAGE_FOLDER}/ECH2020.png`} />
            </a>
        </div>
    )
};

export default Footer;