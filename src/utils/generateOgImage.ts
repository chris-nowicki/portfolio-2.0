import { getCldOgImageUrl } from 'astro-cloudinary/helpers'
import { formatCloudinaryText } from './formatCloudinaryText'

const publicId = 'portfolio/yrxs2swqsxphrsbhszle'

interface GenerateOgImageUrlProps {
  header: string
  description: string
  readTime?: string
}

const generateOgImageUrl = ({
  header,
  description,
  readTime
}: GenerateOgImageUrlProps): string => {
  const formattedDescription = formatCloudinaryText(description)

  return getCldOgImageUrl({
    src: publicId,
    width: 1200,
    height: 630,
    format: 'jpg', // or whatever format you're using
    quality: 'auto',
    overlays: [
      {
        position: {
          x: 100,
          y: 110,
          gravity: 'north_west',
        },
        text: {
          color: 'black',
          fontFamily: 'Arial',
          fontSize: 100,
          fontWeight: 'bold',
          text: header,
        },
      },
      {
        width: '1000',
        crop: 'fit',
        position: {
          x: 100,
          y: 220,
          gravity: 'north_west',
        },
        text: {
          color: 'black',
          fontFamily: 'Arial',
          fontSize: 65,
          letterSpacing: -0.05,
          text: formattedDescription,
        },
      },
      {
        position: {
          x: 205,
          y: 490,
          gravity: 'north_west',
        },
        text: {
          color: 'black',
          fontFamily: 'Arial',
          fontSize: 35,
          text: readTime || '',
        },
      },
    ],
  })
}

export default generateOgImageUrl
