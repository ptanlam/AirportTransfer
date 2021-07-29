import { diskStorage } from "multer";
import { extname } from "path";
import { v4 as uuidv4 } from "uuid";

export const storage = diskStorage({
  destination: "./uploads",
  filename: (req, file, callback) => {
    callback(null, generateFilename(req, file));
  },
});

function generateFilename(req, file) {
  return `${uuidv4()}${extname(file.originalname)}`;
}
