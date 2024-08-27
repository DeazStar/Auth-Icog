# Auth-Icog
## NOTE: i just used the logic of /verify route as a middleware i don't think a separate route for verifying the integrity of the token is usefull if we already have a middleware that protect some routes.

## HOW TO USE
* inside server directory .env file
* copy the necessary fileds
   * ```
     PORT=5000
     DATABASE_URL=mongodb://127.0.0.1:27017/deadstar-portal
     NODE_ENV=development
     JWT_SECRET=<add-your-own-secret>
     JWT_EXPIRES_IN=10m
     REFRESH_SECRET=<add-your-own-secret>
     REFRESH_EXPIRES_IN=30d
     GOOGLE_CLIENT_ID=<add-your-own-client-id>
     GOOGLE_CLIENT_SECRET=<add-your-own-client-secret>
     ```
  * make shure that the redirect url in your google console is ``http//localhost:5000/api/v1/auth/oauth/redirect/google``
* inside the client directory create .env file
* copy the necessary fileds to the .env file
    * ```
      VITE_COOKIE_EXPIRES_IN=10
      VITE_COOKIE_EXPIRES_IN_DAYS=30
      ```
