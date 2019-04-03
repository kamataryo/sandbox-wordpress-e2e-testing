const {
  createNewPost,
  getEditedPostContent
} = require('@wordpress/e2e-test-utils')

jest.setTimeout(60000) // タイムアウトを長めに設定

// insertBlocks は e2e-test-utils に含まれているが、動かないので自分でユーティリティを作る
const insertBlock = async searchTerm => {
  await page.click('.edit-post-header [aria-label="Add block"]')
  await page.waitForSelector('.editor-inserter__menu')
  await page.keyboard.type(searchTerm)
  await page.click(`button[aria-label="${searchTerm}"]`)
}

describe('Echo ブロックのテスト', () => {
  beforeEach(async () => await createNewPost())

  test('エコーブロックで作成される Post の内容がスナップショットと一致する', async () => {
    await insertBlock('Echo Block')
    await page.keyboard.type('Hello')
    await page.keyboard.press('Enter')
    expect(await getEditedPostContent()).toMatchSnapshot()
  })
})
