// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyARIescAkKkFNie7C9BTH8uBW_t0z4n-VE",
    authDomain: "iopropertymanager.firebaseapp.com",
    projectId: "iopropertymanager",
    storageBucket: "iopropertymanager.appspot.com",
    messagingSenderId: "22525226674",
    appId: "1:22525226674:web:12723049c99b2c407ce3ab"
  },
  
  mapBox: {
    accessToken: 'pk.eyJ1IjoiZ2V0dGluZGF0Zm9zaG93IiwiYSI6ImNsMmtzMWN6ZzAwc3AzY29hcG1vM2ViMHgifQ.dz7PsZ2cTwCYBpHOCsVFfg'
  }
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
