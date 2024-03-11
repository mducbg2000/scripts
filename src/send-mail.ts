import { createTransport } from "nodemailer";
import { promisify } from "node:util";
import chunk from "lodash.chunk";
import { readFileSync, writeFileSync } from "node:fs";

const sleep = promisify(setTimeout);

const batches = chunk(["mducbg2000@gmail.com"], 10);

const mailClient = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "Gmail",
  auth: {
    user: "eoffice@vimaru.edu.vn",
    pass: "rrzytnqltffydyqb",
  },
});

const fileContent = readFileSync("static/HDSD_eOffice_ver1.pdf");
console.log(`Read file successful! Content length: ${fileContent.length}`);

console.log("Start send mail...");
const sUser: string[] = [];
const fUser: string[] = [];
for (const batch of batches) {
  await Promise.all(
    batch.map(async (username) => {
      console.log(`Start send to ${username}`);
      try {
        await mailClient.sendMail({
          from: "eoffice@vimaru.edu.vn",
          to: username,
          subject:
            "Cập nhật ảnh chữ ký cá nhân và hướng dẫn sử dụng hệ thống eOffice",
          html: `
Kính gửi Thầy/Cô, <br><br>

Hệ thống Quản lý văn bản và điều hành của Trường Đại học Hàng hải Việt Nam xin gửi tới Thầy/Cô một số đề nghị như sau: <br>
<ol>
<li>
Cập nhật ảnh chữ ký cá nhân tại hệ thống ký số eSign. <br>
Trang web: <a href="https://esign.vimaru.edu.vn">https://esign.vimaru.edu.vn</a> <br>
Email: ${username} <br>
Mật khẩu ban đầu: 12345678<br>
</li>

<li>
Hướng dẫn truy cập hệ thống eOffice <br>
Trang web: <a href="https://eoffice.vimaru.edu.vn">https://eoffice.vimaru.edu.vn</a> <br>
Email: ${username} <br>
Mật khẩu ban đầu: 12345678 <br>
</li>
</ol>
Email này được gửi tới các thầy cô lần đầu tiên truy cập vào hai hệ thống eSign và eOffice. Nếu Thầy/Cô đã truy cập hệ thống và thực hiện cập nhật trước đó, xin vui lòng bỏ qua email này. <br> <br>
Trong quá trình sử dụng, các Thầy/Cô cần hỗ trợ có thể gửi email tới địa chỉ: eOffice@vimaru.edu.vn. Hướng dẫn sử dụng hệ thống có trong file đính kèm. <br><br>

Trân trọng, <br>
Hệ thống Quản lý văn bản và điều hành
`,
          attachments: [
            {
              content: fileContent,
              filename: "HDSD_eOffice_ver1.pdf",
              encoding: "binary",
              contentType: "application/pdf",
            },
          ],
        });
        console.log(`Send to ${username} success!`);
        sUser.push(username);
      } catch (err) {
        console.log(`Send to ${username} fail!: ${err}`);
        fUser.push(username);
      }
    })
  );
  await sleep(1000);
}
console.log(`Success: ${sUser.length}`);
console.log(`Failed: ${fUser.length}`);
writeFileSync("static/failed.json", JSON.stringify(fUser));
writeFileSync("static/success.json", JSON.stringify(sUser));
console.log("Finish!");
process.exit();
