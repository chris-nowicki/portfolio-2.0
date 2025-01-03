import type { Site, Metadata, Socials } from '@/types'

export const NUMBER_OF_ENTRIES = 3

export const SITE: Site = {
  NAME: 'Chris Nowicki',
  EMAIL: 'chris@chrisnowicki.dev',
}

export const HOME: Metadata = {
  TITLE: 'Home',
  DESCRIPTION: 'Full-Stack Developer & Technology Nerd.',
}

export const SOCIALS: Socials[] = [
  {
    NAME: '@iamwix',
    URL: 'https://twitter.com/iamwix',
  },
  {
    NAME: 'Linkedin',
    URL: 'https://www.linkedin.com/in/chris-nowicki/',
  },
  {
    NAME: 'GitHub',
    URL: 'https://github.com/chris-nowicki',
  },
  {
    NAME: 'Twitch',
    URL: 'https://www.twitch.tv/chriswix',
  },
]
