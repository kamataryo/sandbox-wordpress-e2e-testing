const { createURL } = require('@wordpress/e2e-test-utils')

describe('WordPress サイトのトップページをテストする', () => {
  beforeAll(async () => {
    const frontpageURL = createURL('/')
    await page.goto(frontpageURL)
  })

  test('WordPress の文字が含まれる', async () => {
    await expect(page).toMatch('WordPress')
  })

  test('検索ができる', async () => {
    await expect(page).toFillForm('form.search-form', { s: 'my-word' })
    await page.evaluate(() =>
      document.querySelector('form.search-form').submit()
    )
    await page.waitForNavigation({ waitUntil: 'domcontentloaded' })
    expect(page.url()).toContain('?s=my-word')
  })
})
