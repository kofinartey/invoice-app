const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");
const { SESV2 } = require("aws-sdk");
require("dotenv").config();

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

//upload file to s3
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };

  return s3.upload(uploadParams).promise();
}

//download file from s3
async function getFileStream(fileKey) {
  try {
    const downloadParams = {
      Key: fileKey,
      Bucket: bucketName,
    };
    return await s3.getObject(downloadParams).createReadStream();
  } catch (error) {
    console.log(error);
  }
}

//check file's existence on s3
function fileExists(fileKey) {
  const existenceParams = {
    Key: fileKey,
    Bucket: bucketName,
  };
  return s3.headObject(existenceParams, (err, metadata) => {
    if (err && err.code === "NotFound") {
      // console.log("FILE NOT ON S3");
      return false;
    } else {
      // console.log("FILE  ALREADY EXISTS ON S3");
      return true;
    }
  });
}
//delete file on s3
function deleteAvatars3(fileKey) {
  const deleteParams = {
    Key: fileKey,
    Bucket: bucketName,
  };
  return s3.deleteObject(deleteParams).promise();
}

module.exports = {
  uploadFile,
  getFileStream,
  fileExists,
  deleteAvatars3,
};
