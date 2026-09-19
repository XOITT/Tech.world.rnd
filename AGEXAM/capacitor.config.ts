import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.aghanya.learningquest',
  appName: "Aghanya's Learning Quest",
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#7e22ce',
      showSpinner: false,
    }
  }
};

export default config;
