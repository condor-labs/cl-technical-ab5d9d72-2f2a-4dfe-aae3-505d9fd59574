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

  it('Widget-favorite has been defined as Widget #3', async () => {
    const dataFound = await weatherApp.validateFavoritesWidget({ page });
    expect(dataFound).toBeTruthy();
  });

  it('Widget-favorite should have 2 headquarters with class as widget-card on Widget #3', async () => {
    const dataFound = await weatherApp.validateItemsOnFavoritesWidget({ page });
    expect(dataFound.length).toEqual(2);
  });

  it('Widget-favorite should have 2 headquarters (Medellín - CO, Jacksonville - US) with class as widget-card on Widget #3', async () => {
    const dataFound = await weatherApp.validateItemsByNameOnFavoritesWidget({
      page
    });
    expect(dataFound[0]).toContain('Medellín - CO');
    expect(dataFound[1]).toContain('Jacksonville - US');
  });

  it('Widget-temperature has been defined (25° C, 25° C) as Widget #3', async () => {
    const dataFound = await weatherApp.validateItemsByTempOnFavoritesWidget({
      page
    });
    expect(dataFound[0]).toContain('25° C');
    expect(dataFound[1]).toContain('25° C');
  });

  it('Widget-humidity has been defined (40 %, 90 %) as Widget #3', async () => {
    const dataFound = await weatherApp.validateItemsByHumidityOnFavoritesWidget(
      {
        page
      }
    );
    expect(dataFound[0]).toContain('40 %');
    expect(dataFound[1]).toContain('90 %');
  });

  it('Widget-wind has been defined (5.1 m/s, 63.6 m/s) as Widget #3', async () => {
    const dataFound = await weatherApp.validateItemsByWindOnFavoritesWidget({
      page
    });

    expect(dataFound[0]).toContain('5.1 m/s');
    expect(dataFound[1]).toContain('63.6 m/s');
  });

  it('Widget-icon has been defined as Widget #3', async () => {
    const dataFound = await weatherApp.validateItemsByIconOnFavoritesWidget({
      page
    });
    expect(dataFound[0]).toBeTruthy();
    expect(dataFound[1]).toBeTruthy();
  });
});
