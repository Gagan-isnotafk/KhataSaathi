import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.khatasathi.app',
  appName: 'KhataSaathi',
  webDir: 'dist',
  server: {
    androidScheme: 'http',
  },
};

export default config;
