import React from 'react';
import { Button, Col, FlexboxGrid } from 'rsuite';
import { FaGoogle } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
import { FaMicrosoft } from 'react-icons/fa6';

const SocialLogins = ({ onGoogle, onMicrosoft }) => {
  const theme = useTheme();
  const themeVars = getThemeVars(theme);

  return (
    <FlexboxGrid justify="space-between">
      <FlexboxGrid.Item colspan={11}>

      <Button
        block
        appearance={themeVars.buttonAppearance}
        onClick={onGoogle}
      >
        <FaGoogle  />
      </Button>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={11}>

      <Button
        block
        appearance={themeVars.buttonAppearance}
        onClick={onMicrosoft}
      >
        <FaMicrosoft /> 
      </Button>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};
export default SocialLogins;
