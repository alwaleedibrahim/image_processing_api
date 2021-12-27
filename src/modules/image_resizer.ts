// Import sharp for image manipulation
import sharp from 'sharp'

// Import fs for file handling
import { promises as fsPromises } from 'fs'

const resizeImage = async (
  imageName: string,
  imageHeight: number,
  imageWidth: number
): Promise<string> => {
  const imagePath = `assets/images/${imageName}.jpg`

  // Check if imageName matches an existing image in assets/images directory
  try {
    const imageExists: boolean = (await fsPromises.stat(imagePath)).isFile()
    if (!imageExists) {
      return 'Error'
    }
  } catch (err) {
    return 'Error'
  }

  if (isNaN(imageHeight) || isNaN(imageWidth)) {
    return 'Error'
  }

  // Set the path where the resized image will be stored (or where it is stored already)
  const resizedImagePath = `assets/resized/${imageName}_${imageHeight}_${imageWidth}.jpg`

  // Try to access the resized image
  // (in case it was resized previously)
  try {
    await fsPromises.open(resizedImagePath, 'r')
  } catch (Err) {
    // Throwing an error means that image doesn't exist
    try {
      // Use sharp to resize the image
      await sharp(imagePath)
        .resize(imageHeight, imageWidth)
        .toFile(resizedImagePath)
    } catch (Err) {
      // Catch errors in resizing process
      return 'Error'
    }
  }
  return resizedImagePath
}

export default resizeImage
