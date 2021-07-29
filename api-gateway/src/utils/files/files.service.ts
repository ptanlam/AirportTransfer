import { Injectable } from "@nestjs/common";
import { S3 } from "aws-sdk";
import { v4 as uuid } from "uuid";
const xlsx = require("xlsx");

@Injectable()
export class FilesService {
  async uploadToAwsS3(dataBuffer: Buffer, filename: string) {
    try {
      const s3 = new S3();
      const uploadResult = await s3
        .upload({
          Bucket: process.env.AWS_BUCKET,
          Body: dataBuffer,
          Key: `${uuid()}-${filename}`,
        })
        .promise();

      return uploadResult.Location;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteFromAwsS3(photoKey: string) {
    const params = { Bucket: process.env.AWS_BUCKET, Key: photoKey };
    try {
      const s3 = new S3();
      const result = await s3.deleteObject(params).promise();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  readExcelFile(dataBuffer: Buffer, numberOfSeats) {
    const wb = xlsx.read(dataBuffer, {
      sheetRows: parseInt(numberOfSeats) + 1,
    });
    const wsname = wb.SheetNames[0];
    const ws = wb.Sheets[wsname];
    const tickets = xlsx.utils.sheet_to_json(ws);
    return tickets;
  }
}
