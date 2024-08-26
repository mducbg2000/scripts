import { writeFileSync } from "fs";
import { render, type PdfFormData } from "./render.js";
import { logger } from "./libs/logger.js";

const rawData: PdfFormData = {
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
  prepareBeforeTimestamp: "07:30 16/04/2024",
  // Ngày đơn vị đề nghị ký
  issuedDate: {
    day: 16,
    month: 4,
    year: 2024,
  },
  creator: {
    fullName: "Trần Văn Tuyền",
    isPrioritized: true,
  },
};

const pdf = await render(rawData);
writeFileSync("static/invoice.pdf", pdf);
logger.info("Gen pdf successful!");
