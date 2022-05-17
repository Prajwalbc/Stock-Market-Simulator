const puppeteer = require("puppeteer");

exports.scripDetails = async (req, res) => {
  try {
    const { scrip } = req.params;
    const parsedScripName = scrip.toString().replace(/_/g, " ");
    const scripInfo = await getScripInfo(parsedScripName);
    // console.log(parsedScripName);
    res.json({ scripInfo: scripInfo });
  } catch (err) {
    console.log(err.message);
    res.json({ scripInfo: [], message: "Could'nt find stock deails" });
  }
};

// Webscrapers
const getScripInfo = async (scripName) => {
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

    const scripName = document.querySelector(
      ".flex-row.flex-wrap.flex-align-center.flex-grow h1"
    );
    const scripDes = document.querySelector(".sub.show-more-box.about p");

    scripDetails.push({
      scripName: scripName.innerText,
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

  // console.log(data);
  return data;
};
