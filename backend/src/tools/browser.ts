import puppeteer, { Browser as HeadlessBrowser } from 'puppeteer'

class Browser {
  static instance: Browser

  driver: HeadlessBrowser

  isBusy = false

  public async openBrowser() {
    this.isBusy = true
    if (!this.driver) {
      this.driver = await puppeteer.launch({
        headless: false,
      })
    }
  }

  public async navigate(url: string) {
    const page = await this.driver.newPage()
    await page.goto(url)

    return page
  }

  public async closeBrowser() {
    await this.driver.close()

    this.isBusy = false
  }

  public static getInstance(): Browser {
    if (!this.instance) {
      this.instance = new Browser()
    }

    return this.instance
  }
}

export const browser = Browser.getInstance()
