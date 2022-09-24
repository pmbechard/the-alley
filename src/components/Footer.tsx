import React from 'react';

import twitterIcon from '../img/twitter.png';
import instagramIcon from '../img/instagram.png';
import facebookIcon from '../img/facebook.png';
import youtubeIcon from '../img/youtube.png';
import linkedinIcon from '../img/linkedin.png';
import githubIcon from '../img/github.png';

interface Props {}

const Footer: React.FC<Props> = () => {
  return (
    <div className='footer'>
      <div className='social-links'>
        <img
          src={twitterIcon}
          alt='twitter'
          onClick={(e) => window.open('https://twitter.com/pmbech')}
        />
        <img
          src={instagramIcon}
          alt='instagram'
          onClick={(e) => window.open('https://instagram.com/peytonbechard')}
        />
        <img src={facebookIcon} alt='facebook' />
        <img src={youtubeIcon} alt='youtube' />
        <img
          src={linkedinIcon}
          alt='linkedin'
          onClick={(e) =>
            window.open('https://www.linkedin.com/in/peyton-bechard/')
          }
        />
        <img
          src={githubIcon}
          alt='github'
          onClick={(e) => window.open('https://www.github.com/pmbechard/')}
        />
      </div>
      <div className='copyright'>
        The content of this site is copyright-protected and is the property of
        Peyton Bechard.
      </div>
    </div>
  );
};

export default Footer;
