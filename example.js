const puppeteer = require('puppeteer')

const main = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://kunoichiwp.com')

  // PC の Viewport でスクリーンショットを作成する
  await page.setViewport({ width: 1440, height: 896 })
  await page.screenshot({ path: 'pc-1440x896.png' })

  // モバイルデバイスの Viewport でスクリーンショットを作成する
  await page.setViewport({ width: 414, height: 896 })
  await page.screenshot({ path: 'mobile-414x896.png' })

  await browser.close()
}

// go!
main()
