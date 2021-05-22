Since version 10.0.0, Next.js has a built-in Image Component and Automatic Image Optimization.

The Next.js Image Component, next/image, is an extension of the HTML <img> element, evolved for the modern web.

The Automatic Image Optimization allows for resizing, optimizing, and serving images in modern formats like WebP when the browser supports it. This avoids shipping large images to devices with a smaller viewport. It also allows Next.js to automatically adopt future image formats and serve them to browsers that support those formats.

Automatic Image Optimization works with any image source. Even if the image is hosted by an external data source, like a CMS, it can still be optimized.

Instead of optimizing images at build time, Next.js optimizes images on-demand, as users request them. Unlike static site generators and static-only solutions, your build times aren't increased, whether shipping 10 images or 10 million images.

Images are lazy loaded by default. That means your page speed isn't penalized for images outside the viewport. Images load as they are scrolled into viewport.

Images are always rendered in such a way as to avoid Cumulative Layout Shift, a Core Web Vital that Google is going to use in search ranking.

Image Component
To add an image to your application, import the next/image component:

import Image from 'next/image'

function Home() {
  return (
    <>
      <h1>My Homepage</h1>
      <Image
        src="/me.png"
        alt="Picture of the author"
        width={500}
        height={500}
      />
      <p>Welcome to my homepage!</p>
    </>
  )
}

export default Home
View all properties available to the next/image component.

Configuration
In addition to using properties available to the next/image component, you can optionally configure Image Optimization for more advanced use cases via next.config.js.

Domains
To enable Image Optimization for images hosted on an external website, use an absolute url for the Image src and specify which domains are allowed to be optimized. This is needed to ensure that external urls can't be abused. When loader is set to an external image service, this option is ignored.

module.exports = {
  images: {
    domains: ['example.com'],
  },
}
Loader
If you want to use a cloud provider to optimize images instead of using the Next.js' built-in Image Optimization, you can configure the loader and path prefix. This allows you to use relative urls for the Image src and automatically generate the correct absolute url for your provider.

module.exports = {
  images: {
    loader: 'imgix',
    path: 'https://example.com/myaccount/',
  },
}
The following Image Optimization cloud providers are included:

Vercel: Works automatically when you deploy on Vercel, no configuration necessary. Learn more
Imgix: loader: 'imgix'
Cloudinary: loader: 'cloudinary'
Akamai: loader: 'akamai'
Default: Works automatically with next dev, next start, or a custom server
If you need a different provider, you can use the loader prop with next/image.

The next/image component's default loader is not supported when using next export. However, other loader options will work.

Caching
The following describes the caching algorithm for the default loader. For all other loaders, please refer to your cloud provider's documentation.

Images are optimized dynamically upon request and stored in the <distDir>/cache/images directory. The optimized image file will be served for subsequent requests until the expiration is reached. When a request is made that matches a cached but expired file, the cached file is deleted before generating a new optimized image and caching the new file.

The expiration (or rather Max Age) is defined by the upstream server's Cache-Control header.

If s-maxage is found in Cache-Control, it is used. If no s-maxage is found, then max-age is used. If no max-age is found, then 60 seconds is used.

You can configure deviceSizes and imageSizes to reduce the total number of possible generated images.

Advanced
The following configuration is for advanced use cases and is usually not necessary. If you choose to configure the properties below, you will override any changes to the Next.js defaults in future updates.

Device Sizes
In some cases, where you know the expected device widths from the users of your website, you can specify a list of device width breakpoints using the deviceSizes property. These widths are used when the next/image component uses layout="responsive" or layout="fill" so that the correct image is served for the device visiting your website.

If no configuration is provided, the default below is used.

module.exports = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
}
Image Sizes
You can specify a list of image widths using the imageSizes property. These widths should be different (usually smaller) than the widths defined in deviceSizes because the arrays will be concatenated. These widths are used when the next/image component uses layout="fixed" or layout="intrinsic".

If no configuration is provided, the default below is used.

module.exports = {
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}
Related
For more information on what to do next, we recommend the following sections:

next/image
See all available properties for the Image component
