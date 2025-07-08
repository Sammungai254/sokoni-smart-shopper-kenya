import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.192ddc22b14e4debb98954fc2c837d40',
  appName: 'sokoni-smart-shopper-kenya',
  webDir: 'dist',
  server: {
    url: 'https://192ddc22-b14e-4deb-b989-54fc2c837d40.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Geolocation: {
      permissions: ['location']
    }
  }
};

export default config;