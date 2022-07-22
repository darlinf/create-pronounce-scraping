const { chromium } = require("playwright");

const config = {
  timeout: 5000,
};

module.exports = config;

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.google.com");

  const seachButton_HomePage =
    "xpath=//html/body/div[1]/div[3]/form/div[1]/div[1]/div[3]/center/input[1]";
  const seachInput_HomePage =
    "xpath=//html/body/div[1]/div[3]/form/div[1]/div[1]/div[1]/div/div[2]/input";
  const textContent_ResultPage =
    'xpath=//*[@id="plugins-knowledge-verticals-language-pronunciation__onebox_content"]/div[2]/div/div[1]/div[1]/div/div[2]/span[2]/span[1]';

  const textContentPronunce_ResultPage =
    'xpath=//*[@id="plugins-knowledge-verticals-language-pronunciation__onebox_content"]/div[2]/div/div[1]/div/div/div[2]';

  const seachInput_ResultPage =
    'xpath=//*[@id="tsf"]/div[1]/div[1]/div[2]/div/div[2]/input';
  const seachButton_ResultPage =
    'xpath=//*[@id="tsf"]/div[1]/div[1]/div[2]/button';

  const changePronunceTypeSelect_ResultPage =
    'xpath=//*[@id="plugins-knowledge-verticals-language-pronunciation__onebox_content"]/div[1]/div/div[2]';
  const changePronunceTypeButton_ResultPage =
    'xpath=//*[@id="ow27"]/div[2]/g-menu/g-menu-item[2]/div';

  await page.fill(seachInput_HomePage, "how to pronounce drop");
  await page.click(seachButton_HomePage);
  await page.textContent(textContent_ResultPage);

  let pronounces = [];

  for (var i = 0; i < wordToSeach.length; i++) {
    await page.fill(
      seachInput_ResultPage,
      "how to pronounce " + wordToSeach[i]
    );

    await page.click(seachButton_ResultPage);

    try {
      await page
        .locator(changePronunceTypeSelect_ResultPage)
        .click({ timeout: 4000 });
      await page.click(changePronunceTypeButton_ResultPage);

      const content = await page.textContent(textContentPronunce_ResultPage);

      pronounces.push({
        word: wordToSeach[i],
        pronounce: content,
      });
    } catch (error) {
      pronounces.push({
        word: wordToSeach[i],
        pronounce: "",
      });
    }

    /*await page.screenshot({
      path: `screenshot/  ${Math.random(10)} - ${wordToSeach[i]} .png`,
    });*/
  }

  writeFile(JSON.stringify(pronounces));

  await browser.close();
})();
const word = "Chapter Introduction Welcome to the first css";

const wordToSeach = [...new Set(word.toLowerCase().split(" "))];

const fs = require("fs");

function writeFile(content) {
  fs.writeFile("files/test.json", content, (err) => {
    if (err) {
      console.error(err);
    }
  });
}
