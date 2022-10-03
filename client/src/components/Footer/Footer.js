import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Box from '@mui/material/Box';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { CardActionArea } from '@mui/material';
import './Footer.css';
import { width } from '@mui/system';

function Footer() {
    return (

        <div id="footer">
            <div className='footer-title'>
                <Typography>Développé par</Typography>
            </div>
            <div className='footer-container'>

                <Typography >
                    Adam Gaoua
                    <BottomNavigationAction label="Linkedin" icon={<LinkedInIcon />} />
                    <BottomNavigationAction label="GitHub" icon={<GitHubIcon />} />
                </Typography>


                <Typography >
                    Alexandre Saudemont
                    <BottomNavigationAction label="Linkedin" icon={<LinkedInIcon />} />
                    <BottomNavigationAction label="GitHub" icon={<GitHubIcon />} />
                </Typography>

            </div>

        </div>
    );
}

export default Footer;