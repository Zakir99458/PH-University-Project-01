import { v2 as cloudinary } from 'cloudinary'
import config from '../config'
export const sendImageToCloudinary = async () => {
  cloudinary.config({
    cloud_name: config.cloudinary_api_name,
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_api_secret, // Click 'View Credentials' below to copy your API secret
  })

  // Upload an image
  await cloudinary.uploader.upload(
    'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg',
    {
      public_id: 'shoes',
    },
    function (error, result) {
      console.log(result)
    },
  )
}
