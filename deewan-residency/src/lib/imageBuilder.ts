import imageUrlBuilder from '@sanity/image-url'
import {sanityClient} from './sanity'

const builder = imageUrlBuilder(sanityClient)

interface SanityImageAsset {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export function urlFor(source: SanityImageAsset | string) {
  return builder.image(source)
}

// Helper functions for common image sizes
export const imageUrlBuilders = {
  // Mobile thumbnail
  thumbnail: (source: SanityImageAsset | string) =>
    urlFor(source).width(400).height(300).fit('crop').auto('format').url(),

  // Hero image
  hero: (source: SanityImageAsset | string) =>
    urlFor(source).width(1920).height(600).fit('crop').auto('format').url(),

  // Room gallery
  gallery: (source: SanityImageAsset | string) =>
    urlFor(source).width(1200).height(800).fit('crop').auto('format').url(),

  // Responsive (returns object for srcSet)
  responsive: (source: SanityImageAsset | string) => ({
    mobile: urlFor(source).width(640).height(480).fit('crop').auto('format').url(),
    tablet: urlFor(source).width(1024).height(768).fit('crop').auto('format').url(),
    desktop: urlFor(source).width(1920).height(1440).fit('crop').auto('format').url(),
  }),
}
