declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      SWF: number;
      db: string;
      aTPrK: string;
      aTPK: string;
      rTPrK: string;
      rTPK: string;
      aTTTL: string;
      rTTTL: string;
    }
  }
}
export {};
