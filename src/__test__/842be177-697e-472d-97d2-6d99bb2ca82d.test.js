const puppeteer = require('puppeteer');
const weatherApp = require('../app/app-functions');
const { config } = require('../config');

let browser, page;

beforeAll(async () => {
  browser = await puppeteer.launch({ headless: true });
});

describe('Weather App', () => {
  it('Page has been deployed on Server', async () => {
    page = await browser.newPage();
    await page.goto(config.url);
  });

  it('Widget-icon has been defined on Widget #4', async () => {
    const dataFound = await weatherApp.validateIconOnSuggestsWidget({ page });
    expect(dataFound).toBeTruthy();
  });

  it('Widget-headquarter has been defined and equal to MEDELLÍN - CO on Widget #4', async () => {
    const dataFound = await weatherApp.validateHeadquarterOnSuggestsWidget({
      page
    });
    expect(dataFound).toContain('MEDELLÍN - CO');
  });

  it('Widget-temperature has been defined and equal to 25° C on Widget #4', async () => {
    const dataFound = await weatherApp.validateTemperatureOnSuggestsWidget({
      page
    });
    expect(dataFound).toContain('25° C');
  });

  it('Widget-humidity has been defined and equal to 5.1 m/s on Widget #4', async () => {
    const dataFound = await weatherApp.validateHumidityOnSuggestsWidget({
      page
    });
    expect(dataFound).toContain('40 %');
  });

  it('Widget-wind has been defined and equal to 5.1 m/s on Widget #4', async () => {
    const dataFound = await weatherApp.validateWindOnSuggestsWidget({ page });
    expect(dataFound).toContain('5.1 m/s');
  });

  it('Widget-day has been defined and equal to WEDNESDAY on Widget #4', async () => {
    const dataFound = await weatherApp.validateDayOnSuggestsWidget({ page });
    expect(dataFound).toContain('WEDNESDAY');
  });
});
