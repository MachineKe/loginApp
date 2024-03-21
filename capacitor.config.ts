import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.loginapp.app',
  appName: 'loginapp',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
