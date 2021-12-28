import resizeImage from '../../modules/image_resizer'

describe('Testing resizeImage function', () => {
  it('Returns a string', async () => {
    const returnValue = await resizeImage('santamonica', 100, 200)
    expect(typeof returnValue).toBe('string')
  })
  it('Returns error when passing nonexisting image name', async () => {
    const returnValue = await resizeImage('foo', 100, 200)
    expect(returnValue).toBe('Error')
  })
  it('Returns an error if imageHight is NaN', async () => {
    const returnValue = await resizeImage('santamonica', NaN, 200)
    expect(returnValue).toBe('Error')
  })
  it('Returns an error if imageWidth is NaN', async () => {
    const returnValue = await resizeImage('santamonica', 200, NaN)
    expect(returnValue).toBe('Error')
  })
  it('Returns resized image path when succeeds', async () => {
    const returnValue = await resizeImage('santamonica', 300, 200)
    expect(returnValue).toBe('assets/resized/santamonica_300_200.jpg')
  })
})
