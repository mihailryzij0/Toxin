import puppeteer from "puppeteer";
import { toMatchImageSnapshot } from "jest-image-snapshot";

expect.extend({ toMatchImageSnapshot });

const sleep = async (x) =>
  new Promise((resolve) => {
    setTimeout(resolve, x);
  });

jest.setTimeout(10000);
describe("styles.test", () => {
  [
    { width: 1450, height: 1080 },
    // { width: 600, height: 1080 },
  ].forEach(({ width, height }) =>
    it(`should have proper view for ${width}x${height} params`, async () => {
      // setting up puppeteer
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      // set current view port size
      await page.setViewport({ width, height });
      // navigate to the page, served with webpack
      // IMPORTANT!: test assumes webpack is started
      await page.goto("http://localhost:9000/", { waitUntil: "networkidle0" });
      await sleep(3000);

      const image = await page.screenshot();
      await browser.close();

      expect(image).toMatchImageSnapshot(
        process.env.CI
          ? {
              failureThreshold: 1,
              failureThresholdType: "percent",
            }
          : undefined
      );
    })
  );
});
