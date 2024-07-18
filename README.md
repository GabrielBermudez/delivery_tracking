Backend

First steps

1- cd backend
2- ./gradlew build
3- ./gradlew bootRun


Frontend

First steps

1- yarn or npm install
2- yarn dev or npm run dev


Mobile

First steps

1- adb reverse tcp:8080 tcp:8080 // Este comando es para que la app pueda realizar peticiones al puerto 8080 y se resuelva con el 8080 del proyecto backend, usarlo cuando aparezca axios error
2- yarn or npm install
3- yarn start
4- yarn android or npx react-native run-android
