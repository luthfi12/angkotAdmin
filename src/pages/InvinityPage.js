import React from 'react';
import Navbar from '../components/Navbar';
import SectionHome from '../components/SelectionHome';
import SectionAbout from '../components/SelectionAbout';
import SectionProfile from '../components/SelectionProfile';
import './InvinityPage.css';


const InvinityPage = () => {
  return (
    <div>
      <Navbar />
      <SectionHome />
      <SectionAbout />
      <SectionProfile />
    </div>
  );
};

export default InvinityPage;
