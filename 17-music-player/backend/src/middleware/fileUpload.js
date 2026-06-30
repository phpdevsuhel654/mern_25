'use strict';

const fs = require('fs');
const path = require('path');
const AppError = require('../utils/AppError');
const httpStatus = require('../constants/httpStatus');

const UPLOAD_DIR = path.join(__dirname, '../../uploads/images');
const ALLOWED_MIMES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Ensure upload directory exists
const ensureUploadDir = () => {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
};

// Parse multipart form data
const parseMultipart = (buffer, boundary) => {
  const sections = buffer.toString('binary').split(`--${boundary}`);
  
  for (const section of sections) {
    if (section.includes('filename=')) {
      const headerEnd = section.indexOf('\r\n\r\n');
      if (headerEnd === -1) continue;
      
      // Get headers
      const headerSection = section.substring(0, headerEnd);
      const fileNameMatch = headerSection.match(/filename="([^"]+)"/);
      const mimeMatch = headerSection.match(/Content-Type: ([^\r\n]+)/);
      
      if (fileNameMatch && mimeMatch) {
        const fileName = fileNameMatch[1];
        const mimeType = mimeMatch[1];
        
        // Extract file content
        let fileContent = section.substring(headerEnd + 4);
        fileContent = fileContent.replace(/\r\n$/, '');
        fileContent = fileContent.replace(/--$/, '');
        
        return {
          fileName,
          mimeType,
          content: Buffer.from(fileContent, 'binary')
        };
      }
    }
  }
  
  return null;
};

const handleFileUpload = async (req, res, next) => {
  try {
    const contentType = req.headers['content-type'];
    
    if (!contentType || !contentType.includes('multipart/form-data')) {
      return next(new AppError('Invalid content type', httpStatus.BAD_REQUEST));
    }

    ensureUploadDir();

    // Extract boundary
    const boundaryMatch = contentType.match(/boundary=(?:"([^"]+)"|([^\s;]+))/);
    if (!boundaryMatch) {
      return next(new AppError('Invalid boundary', httpStatus.BAD_REQUEST));
    }

    const boundary = boundaryMatch[1] || boundaryMatch[2];

    // Collect body
    let body = Buffer.alloc(0);
    let size = 0;

    req.on('data', (chunk) => {
      body = Buffer.concat([body, chunk]);
      size += chunk.length;

      if (size > MAX_FILE_SIZE) {
        req.pause();
        req.destroy();
        return next(new AppError('File too large', httpStatus.PAYLOAD_TOO_LARGE));
      }
    });

    req.on('end', () => {
      const fileData = parseMultipart(body, boundary);

      if (!fileData) {
        return next(new AppError('No file found', httpStatus.BAD_REQUEST));
      }

      const { fileName, mimeType, content } = fileData;

      if (!ALLOWED_MIMES.includes(mimeType)) {
        return next(new AppError('Invalid file type', httpStatus.BAD_REQUEST));
      }

      // Generate unique filename
      const ext = path.extname(fileName);
      const uniqueName = `artist-${Date.now()}-${Math.random().toString(36).substring(7)}${ext}`;
      const filePath = path.join(UPLOAD_DIR, uniqueName);

      // Write file
      try {
        fs.writeFileSync(filePath, content);

        // Attach to request
        req.uploadedFile = {
          url: `/uploads/images/${uniqueName}`,
          filename: uniqueName,
          path: filePath
        };

        next();
      } catch (err) {
        return next(new AppError('Failed to save file', httpStatus.INTERNAL_SERVER_ERROR));
      }
    });

    req.on('error', (err) => {
      next(err);
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  handleFileUpload,
  ensureUploadDir,
  ALLOWED_MIMES,
  MAX_FILE_SIZE,
  UPLOAD_DIR
};
