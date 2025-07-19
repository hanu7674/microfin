import React from 'react';
import 'rsuite/dist/rsuite.min.css';
import '@fontsource/pt-sans';

import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import PricingSection from './PricingSection';
import CTASection from './CTASection';
import AboutSection from './AboutSection';
import { useTheme } from '../../Theme/theme';
import { getThemeVars } from '../../Theme/themeVars';

const Home = () => {
  const { theme } = useTheme();
  const {
    isDark,
    bgMain,
    textMain,
    bgSection,
    cardBg,
    cardText,
    borderColor,
    shadow,
    ctaBg,
    ctaText,
    subText,
    muted
  } = getThemeVars(theme);

  return (
    <>
      <HeroSection bgMain={bgMain} textMain={textMain} subText={subText} isDark={isDark} borderColor={borderColor} muted={muted} />
      <FeaturesSection id="features" bgSection={bgSection} textMain={textMain} muted={muted} borderColor={borderColor} cardBg={cardBg} cardText={cardText} shadow={shadow} />
      <PricingSection id="pricing" bgMain={bgMain} textMain={textMain} muted={muted} borderColor={borderColor} cardBg={cardBg} cardText={cardText} shadow={shadow} />
      <CTASection id="contact" ctaBg={ctaBg} ctaText={ctaText} isDark={isDark} />
      <AboutSection id="about" />
    </>
  );
}

export default Home;
