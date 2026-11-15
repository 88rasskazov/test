import { StatusCodes } from 'http-status-codes'
import { expect, test } from '@playwright/test'

const baseUrl = 'https://shop.tl-academy.ee/api/products'

// GET tests
test.describe('GET /api/products/{id}', () => {
  test('get product with correct id should receive code 200', async ({ request }) => {
    const response = await request.get(`${baseUrl}/1`)

    const responseBody = await response.json()
    const statusCode = response.status()

    console.log('response body:', responseBody)

    expect(statusCode).toBe(StatusCodes.OK)
    expect(responseBody.id).toBe(1)
  })

  test('get product with non-existing id should receive code 404', async ({ request }) => {
    const response = await request.get(`${baseUrl}/1000`)

    const responseBody = await response.json()
    const statusCode = response.status()

    console.log('response body:', responseBody)

    expect(statusCode).toBe(StatusCodes.NOT_FOUND)
    expect(responseBody.error).toBe('Product not found')
  })

  test('get product with negative id should receive code 400', async ({ request }) => {
    const response = await request.get(`${baseUrl}/-1`)

    const responseBody = await response.json()
    const statusCode = response.status()

    console.log('response body:', responseBody)

    expect(statusCode).toBe(StatusCodes.BAD_REQUEST)
    expect(responseBody.error).toBe('Invalid product id')
  })

  // NEW TEST 1
  test('get product with id 0 should receive code 400', async ({ request }) => {
    const response = await request.get(`${baseUrl}/0`)

    const responseBody = await response.json()
    const statusCode = response.status()

    console.log('response body:', responseBody)

    expect(statusCode).toBe(StatusCodes.BAD_REQUEST)
    expect(responseBody.error).toBe('Invalid product id')
  })

  // NEW TEST 2
  test('get product with string id should receive code 400', async ({ request }) => {
    const response = await request.get(`${baseUrl}/abc`)

    const responseBody = await response.json()
    const statusCode = response.status()

    console.log('response body:', responseBody)

    expect(statusCode).toBe(StatusCodes.BAD_REQUEST)
    expect(responseBody.error).toBe('Invalid product id')
  })
})

// POST tests
test.describe('POST /api/products', () => {
  test('post product with correct data should receive code 201', async ({ request }) => {
    const requestBody = {
      name: 'Orange',
      category: 'Fruit',
      price: 2.39,
      quantity: 10,
    }

    const response = await request.post(baseUrl, {
      data: requestBody,
    })

    const responseBody = await response.json()
    const statusCode = response.status()

    console.log('response status:', statusCode)
    console.log('response body:', responseBody)

    try {
      expect(statusCode).toBe(StatusCodes.CREATED)
      expect(typeof responseBody.name).toBe('string')
      expect(typeof responseBody.price).toBe('number')

      expect(responseBody.name).toBe(requestBody.name)
      expect(responseBody.category).toBe(requestBody.category)
      expect(responseBody.price).toBe(requestBody.price)
      expect(responseBody.quantity).toBe(requestBody.quantity)
      expect(responseBody.available).toBe(true)
      expect(responseBody.id).toBeGreaterThan(0)
    } finally {
      // Delete the created product
      if (statusCode === StatusCodes.CREATED && Number.isInteger(responseBody.id)) {
        await request.delete(`${baseUrl}/${responseBody.id}`)
      }
    }
  })

  // NEW TEST 3
  test('post product without name should receive code 400', async ({ request }) => {
    const requestBody = {
      category: 'Fruit',
      price: 2.39,
      quantity: 10,
    }

    const response = await request.post(baseUrl, {
      data: requestBody,
    })

    const responseBody = await response.json()
    const statusCode = response.status()

    console.log('response body:', responseBody)

    expect(statusCode).toBe(StatusCodes.BAD_REQUEST)
    expect(responseBody.error).toBe('Name is required')
  })

  // NEW TEST 4
  test('post product without category should receive code 400', async ({ request }) => {
    const requestBody = {
      name: 'Orange',
      price: 2.39,
      quantity: 10,
    }

    const response = await request.post(baseUrl, {
      data: requestBody,
    })

    const responseBody = await response.json()
    const statusCode = response.status()

    console.log('response body:', responseBody)

    expect(statusCode).toBe(StatusCodes.BAD_REQUEST)
    expect(responseBody.error).toBe('Category is required')
  })

  // NEW TEST 5
  test('post product with negative quantity should receive code 400', async ({ request }) => {
    const requestBody = {
      name: 'Orange',
      category: 'Fruit',
      price: 2.39,
      quantity: -1,
    }

    const response = await request.post(baseUrl, {
      data: requestBody,
    })

    const responseBody = await response.json()
    const statusCode = response.status()

    console.log('response body:', responseBody)

    expect(statusCode).toBe(StatusCodes.BAD_REQUEST)
    expect(responseBody.error).toBe('Quantity must be a non-negative integer')
  })
})
