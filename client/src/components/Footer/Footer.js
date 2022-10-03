import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Typography from '@mui/material/Typography';
import { NavLink, useNavigate } from "react-router-dom";
import './Footer.css';


function Footer() {
    return (

        <div id="footer">
            <div className='footer-title'>
                <Typography>Développé par</Typography>
            </div>
            <div className='footer-container'>

                <Typography >
                    Adam Gaoua
                    <BottomNavigationAction
                        label="Linkedin"
                        icon={<LinkedInIcon />}
                        onClick={() => window.open("https://www.linkedin.com/in/adam-gaoua-05092b238")}
                    />
                    <BottomNavigationAction
                        label="GitHub"
                        icon={<GitHubIcon />}
                        onClick={() => window.open("https://github.com/AdamGaoua")}
                    />
                </Typography>
                <Typography >
                    Alexandre Saudemont
                    <BottomNavigationAction
                        label="Linkedin"
                        icon={<LinkedInIcon />}
                        onClick={() => window.open("https://www.linkedin.com/in/alexandre-saudemont-535481239/")}
                    />
                    <BottomNavigationAction
                        label="GitHub"
                        icon={<GitHubIcon />}
                        onClick={() => window.open("https://github.com/Alexandre-Saudemont")}
                    />
                </Typography>

            </div>

        </div>
    );
}

export default Footer;