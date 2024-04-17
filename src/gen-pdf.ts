import { readFileSync, writeFileSync } from "fs";
import Handlerbars from "handlebars";
import puppeteer from "puppeteer";

const browser = await puppeteer.launch({
  args: [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    // "--font-render-hinting=none",
  ],
});
const page = await browser.newPage();
const rawData = {
  unitName: "Phòng tổ chức hành chính",
  purpose: "Test",
  startTimestamp: "08:00 16/04/2024",
  endTimestamp: "08:30 16/04/2024",
  roomName: "Phòng 609",
  requirements: {
    micro: false,
    speaker: false,
    projector: false,
    photographer: true,
    water: true,
    plasticFlower: false,
    plantFlower: false,
    tablecloth: true,
    giftTray: false,
  },
  title: "Tập huấn eoffice",
  banners: "Tập huấn eoffice",
  otherRequirement: "Không",
  payment: {
    unit: false,
    uni: true,
    others: false,
  },
  prepareBeforeTimestamp: "07:30 16/04/2024",
  // Ngày đơn vị đề nghị ký
  issuedDate: {
    day: 16,
    month: 4,
    year: 2024,
  },
  creator: {
    fullName: "Nguyễn Minh Đức",
  },
};

const strTemplate = readFileSync("static/invoice.hbs", { encoding: "utf-8" });
const engine = Handlerbars.compile(strTemplate);

const html = engine(rawData);

await page.setContent(html, { waitUntil: "domcontentloaded" });
await page.emulateMediaType("screen");
const buffer = await page.pdf({ format: "A4" });

await browser.close();

writeFileSync("static/invoice.pdf", buffer);

process.exit();
