const authConfig = {
  providers: [
    {
      // Your Convex site URL is provided in a system
      // environment variable
      domain: process.env.CONVEX_SITE_URL as string,

      // Application ID has to be "convex"
      applicationID: "convex",
    },
  ],
};

export default authConfig;
