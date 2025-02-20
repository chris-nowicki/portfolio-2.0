---
date: 2023-04-18
title: 'How to create a Vercel Cron Job using NextJS 13'
description: 'Learn to create Vercel cron jobs in Next.js.'
image: 'https://res.cloudinary.com/ddetibihn/image/upload/v1710262757/portfolio/blog/vercel-cron-job-cover.webp'
category: 'tech'
tags: ['web development', 'vercel', 'next.js', 'cron job']
draft: false
---

As a new developer I am constantly trying new technologies and recently have really enjoyed coding in NextJS 13 using their `/app` directory experimental feature.

## Use Case

I wanted to be able to show total **ALL TIME** GitHub commits across my repositories on the about me section of my [portfolio](https://www.chrisnowicki.io/). Why, because I can lol. As I started working on the code I realized that this was going to be an expensive tasks from a resource perspective.

## Assumptions

1. You are familiar with nextJS 13/React Frameworks
2. You are familiar with Vercel and getting your project linked using their CLI or gitHub Repository.

## Limitations

Vercel has the following [limitations](https://vercel.com/docs/cron-jobs/usage-and-pricing#) based on your plan:

![Screenshot of Vercel cron job limits](https://res.cloudinary.com/ddetibihn/image/upload/f_auto/v1710367875/portfolio/blog/nrlunhl603b8l4zthrt9.png)

## Let's Create a Cron Job!

1. Create a directory in the `/app/api` folder called "cron"
2. Create a folder within `cron` with the name of the cron job you want to run.
   **example:** `/app/api/cron/github-metrics-sync`
3. Create a file called `route.ts`
4. Your code should look like this:

```javascript
// /api/cron/github-metrics-sync/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  ...
}
```

Where `...` you replace with code you want to run when the cron job is executed.

For my use case I am storing the metrics in a [PlanetScale](https://www.planetscale.com) database. I then fetch the data from the GitHub API, parse through the data, and then update the database.

Let's see the full code for my route:

```javascript
import { Octokit } from '@octokit/rest'
import { NextResponse } from 'next/server'
import { updateGithubMetrics } from '../../../../lib/planetscale'

// zod env type checking
import { env } from 'env'

export async function GET() {
  const octokit = new Octokit({
    auth: env.GITHUB_TOKEN,
  })

  // retrieve all repos from my account
  const repos = await octokit.request('GET /user/repos', {
    per_page: 100,
    affiliation: 'owner',
  })

  // count all repos
  const totalRepos = repos.data.length

  // retrieve all commits and count them
  let totalCommits = 0

  for (const repo of repos.data) {
    const commits = await octokit.request(
      'GET /repos/{owner}/{repo}/contributors',
      {
        owner: repo.owner.login,
        repo: repo.name,
      }
    )

    // only count commits from my account
    if (commits.data.length > 0) {
      for (const contributor of commits.data) {
        if (contributor.login === 'chris-nowicki') {
          totalCommits += contributor.contributions
        }
      }
    }
  }

  try {
    // update the planetscale database with new metrics
    updateGithubMetrics(totalCommits, totalRepos)
    return NextResponse.json({ totalCommits, totalRepos })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error })
  }
}
```

I won't go over all the lines of code in this tutorial but if you have any questions please let me know!

## FINAL STEP

Add a `vercel.json` file in the root of your project folder:

```javascript
{
    "crons": [
        {
            "path": "/api/cron/github-metrics-sync",
            "schedule": "*/10 * * * *"
        }
    ]
}
```

- **path** is the location of the folder we created in step #2
- **schedule** is telling vercel how often the cron job should run. `*/10 * * * *` is running the cronjob about every 10 minutes. You can play around with different schedules using [crontab guru](https://crontab.guru/#*/10_*_*_*_*).

Once that is complete deploy your project to vercel and you can check the status of your cron job by going to the **settings > crons** menu for your project. You should see something like this:

![Screen shot of Vervel Dashboard with Cron Job Menu](https://res.cloudinary.com/ddetibihn/image/upload/f_auto/v1710275272/portfolio/blog/dx0de3rtmpboxgy8zvpa.png)

## CONCLUSION

I hope this was helpful! I found this to be a nice solution for the server to take on the expensive task so those visiting my site don't have to _wait_ for the fetch/parsing from GitHub API for the /about page to load.
