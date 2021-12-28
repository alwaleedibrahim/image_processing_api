import supertest from 'supertest'

import app from '../index'

const request = supertest(app)

describe('Testing main endpoint (Get /) ', () => {
  it('Responses with status code 200', async () => {
    const response = await request.get('/')
    expect(response.status).toBe(200)
  })
})

describe('Testing API endpoint (Get api/)', () => {
  it('Responses with status code 404 when no arguments specified', async () => {
    const response = await request.get('/api')
    expect(response.status).toBe(404)
  })
  it('Responses with status code 404 when invalid arguments given', async () => {
    const response = await request.get(
      '/api?image=santamonica&height=large&width=larger'
    )
    expect(response.status).toBe(404)
  })
  it('Responses with status code 200 when request succeeds', async () => {
    const response = await request.get(
      '/api?image=santamonica&height=300&width=400'
    )
    expect(response.status).toBe(200)
  })
})
