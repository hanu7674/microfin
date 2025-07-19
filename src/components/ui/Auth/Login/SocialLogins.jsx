import React from 'react';
import { Button, Stack } from 'rsuite';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { useTheme } from '../../../Theme/theme';
import { getThemeVars } from '../../../Theme/themeVars';
import { FaMicrosoft } from 'react-icons/fa6';

const SocialLogins = () => {
    const theme = useTheme();
    const themeVars = getThemeVars(theme);

  return  (
  <Stack spacing={12} direction="horizontal" justifyContent="center" wrap>
    <Button block appearance={themeVars.buttonAppearance} style={{ border: `1px solid ${themeVars.border}`, flex: 1, color: themeVars.textMain }}>
      <FaGoogle />
    </Button>
    <Button block appearance={themeVars.buttonAppearance} style={{ border: `1px solid ${themeVars.border} `, flex: 1, color: themeVars.textMain }}>
      <FaMicrosoft/>
    </Button>
  </Stack>
)
}
export default SocialLogins; 