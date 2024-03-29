import { MongoClient, GridFSBucket } from "mongodb";
import { readFileSync } from "node:fs";
import { pipeline } from "node:stream/promises";
import { Readable } from "stream";

const mongoClient = new MongoClient(
  "mongodb://bkc-boffice-vmu-db-root:1f108de27f1843bce5ffd0d10c8ff197-bkc-boffice-hum-db-pw-d7c76098495f60d3380e7aa793b8885a@203.162.246.119:27025/BOffice?authSource=admin&readPreference=primary&ssl=false"
);
await mongoClient.connect();
const db = mongoClient.db();
const bucket = new GridFSBucket(db, { bucketName: "boffice" });

const fileMap: { filename: string; fsPath: string }[] = [
  {
    filename:
      "OutgoingDocument/uKspSqJlo5/OutgoingDocument/Scj65YJYPx/1.3.2024. Mai Xuân Hương thôi TBM CSHH.pdf",
    fsPath: "static/294_last.pdf",
  },
  {
    filename:
      "OutgoingDocument/pSvePyiSGR/OutgoingDocument/Scj65YJYPx/1.3.2024. Mai Xuân Hương thôi TBM CSHH-print.pdf",
    fsPath: "static/294_print.pdf",
  },
];

await Promise.all(
  fileMap.map(async ({ filename, fsPath }) => {
    console.log(`Start replace file ${filename}...`);
    try {
      const fileContent = readFileSync(fsPath);
      const files = await bucket.find({ filename }).toArray();
      await Promise.all(files.map((file) => bucket.delete(file._id)));
      await pipeline(
        Readable.from(fileContent),
        bucket.openUploadStream(filename)
      );
      console.log(`Replace file ${filename} successful!`);
    } catch (error) {
      console.log(`Replace file ${filename} failed: ${error}`);
    }
  })
);

process.exit();
