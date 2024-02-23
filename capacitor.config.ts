import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.davidmunozbenavides.rollerfy',
  appName: 'Rollerfy',
  webDir: 'dist',
  server: {
    androidScheme: 'http',
    cleartext:true
  }
};

export default config;
