---
date: 2023-05-22
title: 'How to Secure Vercel Cron Job routes in NextJS 13'
description: 'Secure Vercel cron routes with bearer token authentication.'
category: 'tech'
tags: ['web development', 'vercel', 'next.js', 'cron job']
draft: false
---

## Use Case

Secure your cron job routes so that they can't be run by just anyone with the known route. We want to make sure that **ONLY** _Vercel_ can run the cron job from their servers. We do this by adding **_CRON_SECRET_** to our env variables. If present, vercel will automatically send this as a bearer token in the header, as Lee mentioned in his response to me:

> "If present, the HTTP request to the cron endpoint will contain an authorization header with it as a value, like this: "Authorization: Bearer $CRON_SECRET".

At the end of this tutorial I will show you how to configure [Postman](https://www.postman.com) so that you can test your route with the Bearer Token.

## Assumptions

1. You are familiar with nextJS 13/React Frameworks
2. You are familiar with Vercel and where to find the Environmental Variables in your project settings
3. If you do not know how to setup a cron job then read my tutorial [here](https://dev.to/chrisnowicki/how-to-create-a-vercel-cron-job-using-nextjs-13-2amb) first and the return to this article to learn how to secure it.

## Let's Secure a Cron Job! 🔒

1. Create a Secret Key by typing `openssl rand -hex 32` in your terminal
   ![](https://res.cloudinary.com/ddetibihn/image/upload/f_auto/v1710304108/portfolio/blog/gjdhsfvghuftrcshbe6b.png)

2. Add the **CRON_SECRET** variable to your local .env file with the value that is displayed in your terminal from step 1 above.

3. Modify the code in your cron job route to look for the bearer token. If it doesn't exist then return an unauthorized response with 401 status code:

   ```js
   import { NextRequest, NextResponse } from 'next/server'

   export async function GET(req: NextRequest) {
      // get the bearer token from the header
      const authToken = (req.headers.get('authorization') || '')
      .split('Bearer ')
      .at(1)

      // if not found OR the bearer token does NOT equal the CRON_SECRET
      if (!authToken || authToken != process.env.CRON_SECRET) {
         return NextResponse.json({ error: 'Unauthorized' }, {
         status: 401 })
      }
      // if token exists then move on with the cron job
      ...
   }
   ```

4. Test to make sure it worked by going to the route in your browser. You should receive a json error message, "Unauthorized":
   ![](https://res.cloudinary.com/ddetibihn/image/upload/f_auto/v1710304191/portfolio/blog/thxpjvdwjppblntq3utd.png)

5. Add the CRON_SECRET variable to the vercel project settings Environment Variables as seen below:

   ![](https://res.cloudinary.com/ddetibihn/image/upload/f_auto/v1710304270/portfolio/blog/dfskauigrlrptiqqitue.png)

6. Deploy your project to Vercel and test on your live site. You should receive a json error message "Unauthorized":

   ![](https://res.cloudinary.com/ddetibihn/image/upload/f_auto/v1710304382/portfolio/blog/hx2g7f4ad1g0b0yyz7ar.png)

**CONGRATULATIONS! 🎉**, Your cron job route is now secured! Now, let's setup [Postman](https://www.postman.com) so you can test your cron job **with** the bearer token.

## Setup POSTMAN

**NOTE:** This is not a tutorial on how to install postman, setup a workspace, etc.. There are lots of resources out there. Here is a good one on [YouTube](https://www.youtube.com/watch?v=VywxIQ2ZXw4).

1. Select the plus icon to add a _GET_ request:

   ![](https://res.cloudinary.com/ddetibihn/image/upload/f_auto/v1710304409/portfolio/blog/u5srg1f2qnyaygr58abu.png)

2. Add in your route and select **Send**. You should see the same unauthorized response in the response as you did from when we tested in the browser:

   ![](https://res.cloudinary.com/ddetibihn/image/upload/f_auto/v1710304435/portfolio/blog/k1uaiza3gc8m6o8lmgu8.png)

3. Select **Auth**, Select the drop down arrow under **Type** and select **Bearer Token**. Enter the value of the CRON_KEY in the **Token Field**.

   ![](https://res.cloudinary.com/ddetibihn/image/upload/f_auto/v1710304469/portfolio/blog/wjiom3prpprmew4bob80.png)

4. Once all the info is entered select **Send** to test the route with the Bearer token and you will get the expected return value of the cron job:

   ![](https://res.cloudinary.com/ddetibihn/image/upload/f_auto/v1710304492/portfolio/blog/wispc42tnnojxoknhtfz.png)

# Conclusion

And that is it! I hope you found this helpful! Please reach out to me if you have any questions and I will do my best to respond.
