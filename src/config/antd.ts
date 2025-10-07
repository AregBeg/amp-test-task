import type { ThemeConfig } from 'antd';

export const antdTheme: ThemeConfig = {
  token: {
    // Input border colors
    colorBorder: '#D9D9D9',
    colorError: '#FF4D4F',
    colorErrorBorder: '#FF4D4F',
    colorErrorBorderHover: '#FF4D4F',

    // Input focus colors
    colorPrimary: '#1890ff',
    colorPrimaryHover: '#40a9ff',
    colorPrimaryActive: '#096dd9',

    // Input background colors
    colorBgContainer: '#ffffff',
    colorBgElevated: '#ffffff',

    // Text colors
    colorText: '#000000d9',
    colorTextSecondary: '#00000073',
    colorTextTertiary: '#00000040',
    colorTextQuaternary: '#00000026',

    // Border radius
    borderRadius: 6,
    borderRadiusLG: 8,
    borderRadiusSM: 4,

    // Font
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    fontSize: 14,
    fontSizeLG: 16,
    fontSizeSM: 12,

    // Spacing
    padding: 16,
    paddingLG: 24,
    paddingSM: 12,
    paddingXS: 8,

    // Height
    controlHeight: 32,
    controlHeightLG: 40,
    controlHeightSM: 24,
  },
  components: {
    Input: {
      // Input specific overrides
      colorBorder: '#D9D9D9',
      colorErrorBorder: '#FF4D4F',
      colorErrorBorderHover: '#FF4D4F',
      activeBorderColor: '#1890ff',
      hoverBorderColor: '#40a9ff',
    },
    Select: {
      // Select specific overrides
      colorBorder: '#D9D9D9',
      colorErrorBorder: '#FF4D4F',
      colorErrorBorderHover: '#FF4D4F',
    },
    DatePicker: {
      // DatePicker specific overrides
      colorBorder: '#D9D9D9',
      colorErrorBorder: '#FF4D4F',
      colorErrorBorderHover: '#FF4D4F',
    },
    Form: {
      // Form specific overrides
      labelColor: '#000000d9',
      labelRequiredMarkColor: '#FF4D4F',
    },
    Button: {
      // Button specific overrides
      colorPrimary: '#1677FF',
      colorPrimaryHover: '#40a9ff',
      colorPrimaryActive: '#1677FF',
      borderRadius: 6,
    },
    Card: {
      // Card specific overrides
      colorBorderSecondary: '#f0f0f0',
      borderRadius: 8,
    },
    Tabs: {
      // Tabs specific overrides
      colorPrimary: '#1890ff',
      colorText: '#000000d9',
      colorTextSecondary: '#00000073',
    },
  },
};
