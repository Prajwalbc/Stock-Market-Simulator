const puppeteer = require("puppeteer");

// Webscrapers
exports.getScripInfoSearch = async (scripName) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(`https://www.screener.in/`);
  // await page.screenshot({ path: "./test/1.png" });

  // await page.waitForTimeout(1000);
  await page.type("[type=search]", `${scripName}`);
  // await page.screenshot({ path: "./test/2.png" });

  await page.waitForTimeout(500);
  await page.keyboard.press("Backspace");
  await page.waitForTimeout(500);
  await page.keyboard.press("Enter");

  await page.waitForTimeout(1000);
  // await page.screenshot({ path: "./test/3.png" });

  // execute code in dom
  const data = await page.evaluate(() => {
    let scripDetails = [];

    let directScripName = window.location.href
      .toString()
      .replace("https://www.screener.in/company/", "")
      .replace("/", "")
      .replace("consolidated/", "");

    const scripName = document.querySelector(
      ".flex-row.flex-wrap.flex-align-center.flex-grow h1"
    );
    const scripDes = document.querySelector(".sub.show-more-box.about p");

    scripDetails.push({
      scripName: scripName.innerText,
      directScripName: directScripName,
      scripDes: scripDes.innerText,
    });

    const wrappedArr = document.querySelectorAll(
      ".company-ratios #top-ratios li"
    );
    wrappedArr.forEach((item) => {
      const ratioName = item.querySelector(".name");
      const ratioValue = item.querySelector(".nowrap.value");
      scripDetails.push({
        ratioName: ratioName.innerText,
        ratioValue: ratioValue.innerText,
      });
    });
    return scripDetails;
  });

  await browser.close();

  data.forEach((obj, index) => (obj.id = index + 1));
  // console.log(data);
  return data;
};

// Webscrapers
exports.getScripInfoDirect = async (scripName) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(`https://www.screener.in/company/${scripName}/consolidated/`);

  // await page.screenshot({ path: "./test/1.png" });

  // await page.waitForTimeout(500);

  // execute code in dom
  const data = await page.evaluate(() => {
    let scripDetails = [];

    const scripName = document.querySelector(
      ".flex-row.flex-wrap.flex-align-center.flex-grow h1"
    );
    const scripDes = document.querySelector(".sub.show-more-box.about p");

    let directScripName = window.location.href
      .toString()
      .replace("https://www.screener.in/company/", "")
      .replace("/", "")
      .replace("consolidated/", "");

    scripDetails.push({
      scripName: scripName.innerText,
      scripDes: scripDes.innerText,
      directScripName: directScripName,
    });

    const wrappedArr = document.querySelectorAll(
      ".company-ratios #top-ratios li"
    );
    wrappedArr.forEach((item) => {
      const ratioName = item.querySelector(".name");
      const ratioValue = item.querySelector(".nowrap.value");
      scripDetails.push({
        ratioName: ratioName.innerText,
        ratioValue: ratioValue.innerText,
      });
    });
    return scripDetails;
  });

  await browser.close();

  data.forEach((obj, index) => (obj.id = index + 1));
  return data;
};

// Webscrapers
exports.getScripPriceUpdateList = async (scripRouteNames) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  let scripPricesList = [];

  for (let i = 0; i < scripRouteNames.length; i++) {
    await page.goto(
      `https://www.screener.in/company/${scripRouteNames[i]}/consolidated/`
    );

    // await page.screenshot({ path: "./test/1.png" });

    // await page.waitForTimeout(500);

    // execute code in dom
    const scripDetail = await page.evaluate(() => {
      let scripDetails = [];

      const scripName = document.querySelector(
        ".flex-row.flex-wrap.flex-align-center.flex-grow h1"
      );

      scripDetails.push({
        scripName: scripName.innerText,
      });

      const wrappedArr = document.querySelectorAll(
        ".company-ratios #top-ratios li"
      );
      wrappedArr.forEach((item) => {
        const ratioName = item.querySelector(".name");
        const ratioValue = item.querySelector(".nowrap.value");
        scripDetails.push({
          ratioName: ratioName.innerText,
          ratioValue: ratioValue.innerText,
        });
      });

      let tmp = {};
      tmp.scripName = scripDetails[0].scripName;
      tmp.scripPrice = scripDetails[2].ratioValue;
      return tmp;
    });
    scripDetail.directScripName = scripRouteNames[i];
    scripPricesList.push(scripDetail);
  }

  await browser.close();

  // console.log(data);
  return scripPricesList;
};
