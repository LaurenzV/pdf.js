#!/usr/bin/env node
import fs from 'fs';
import { Jbig2Image } from './jbig2.js';

async function decodeJbig2File(filePath) {
  console.log(`Reading JBIG2 file: ${filePath}`);

  // Read the JB2 file
  const fileData = fs.readFileSync(filePath);
  const globalsData = fs.readFileSync("/Users/lstampfl/Programming/GitHub/hayro/globals_data.jb2");
  console.log(`File size: ${fileData.length} bytes`);

  // Create JBIG2 decoder
  const jbig2Image = new Jbig2Image();

  // Decode using parseChunks method (this is how PDF.js uses it)
  const chunks = [
    {
      data: globalsData,
      start: 0,
      end: globalsData.length
    },
    {
    data: fileData,
    start: 0,
    end: fileData.length
  }
  ];

  try {
    // console.log('Decoding JBIG2 data...');
    const result = jbig2Image.parseChunks(chunks);
    for (let i = 0; i < result.length; i++) {
      // console.log(i + ", " + result[i]);
    }
    // console.log(`✓ Successfully decoded! Result: ${result.length} bytes`);
    return result;
  } catch (error) {
    console.error('✗ Decoding failed:', error.message);
    throw error;
  }
}

// CLI
const filePath = process.argv[2];
if (!filePath) {
  console.log('Usage: node jbig_main.js <jb2_file_path>');
  console.log('Example: node jbig_main.js /path/to/file.jb2');
  process.exit(1);
}

if (!fs.existsSync(filePath)) {
  console.error(`File not found: ${filePath}`);
  process.exit(1);
}

decodeJbig2File(filePath).catch(console.error);
