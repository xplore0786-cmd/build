export type AppState = 'landing' | 'dashboard';

export interface AppConfig {
  appName: string;
  packageName: string;
  versionCode: string;
  versionName: string;
  themeColor: string;
  admobAppId: string;
  enablePushNotifications: boolean;
  enableAnalytics: boolean;
  enableCrashlytics: boolean;
}
