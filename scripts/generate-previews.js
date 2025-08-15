const fs = require("fs");
const path = require("path");
const pdf2pic = require("pdf2pic");

// Configuration
const CONFIG = {
  pdfsDir: path.join(process.cwd(), "public", "pdfs"),
  previewsDir: path.join(process.cwd(), "public", "previews"),
  density: 150,
  width: 600,
  height: 800,
  quality: 85,
  format: "jpg",
};

/**
 * Clean previews directory - remove all existing preview files
 */
async function cleanPreviewsDirectory() {
  console.log("🧹 Cleaning previews directory...");

  if (!fs.existsSync(CONFIG.previewsDir)) {
    fs.mkdirSync(CONFIG.previewsDir, { recursive: true });
    console.log("📁 Created previews directory");
    return;
  }

  const files = fs.readdirSync(CONFIG.previewsDir);
  let deletedCount = 0;

  for (const file of files) {
    if (file.endsWith("-preview.jpg") || file.endsWith("-preview.png")) {
      const filePath = path.join(CONFIG.previewsDir, file);
      fs.unlinkSync(filePath);
      deletedCount++;
    }
  }

  console.log(`🗑️  Deleted ${deletedCount} existing preview files`);
}

/**
 * Check if a PDF file exists
 */
function pdfExists(articleId) {
  const pdfPath = path.join(CONFIG.pdfsDir, `${articleId}.pdf`);
  return fs.existsSync(pdfPath);
}

/**
 * Generate preview image for a single PDF
 */
async function generateSinglePreview(articleId) {
  const pdfPath = path.join(CONFIG.pdfsDir, `${articleId}.pdf`);
  const outputPath = path.join(
    CONFIG.previewsDir,
    `${articleId}-preview.1.jpg`
  );

  if (!pdfExists(articleId)) {
    return {
      success: false,
      articleId,
      message: `PDF file not found: ${pdfPath}`,
    };
  }

  try {
    console.log(`📄 Processing: ${articleId}...`);

    const convert = pdf2pic.fromPath(pdfPath, {
      density: CONFIG.density,
      saveFilename: `${articleId}-preview`,
      savePath: CONFIG.previewsDir,
      format: CONFIG.format,
      width: CONFIG.width,
      height: CONFIG.height,
      quality: CONFIG.quality,
    });

    const result = await convert(1);

    console.log("pdf2pic conversion result:", result);
    console.log(
      "Output file exists after conversion:",
      outputPath,
      fs.existsSync(outputPath)
    );

    if (result && fs.existsSync(outputPath)) {
      const stats = fs.statSync(outputPath);
      const fileSizeKB = Math.round(stats.size / 1024);

      return {
        success: true,
        articleId,
        message: `Preview generated successfully (${fileSizeKB}KB)`,
        outputPath,
      };
    } else {
      return {
        success: false,
        articleId,
        message: "Conversion completed but output file not found",
      };
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return {
      success: false,
      articleId,
      message: `Conversion failed: ${errorMessage}`,
    };
  }
}

/**
 * Generate all preview images
 */
async function generateAllPreviews() {
  console.log("🚀 Starting PDF preview generation...");

  // Get all PDF files from the target directory
  const pdfFiles = fs
    .readdirSync(CONFIG.pdfsDir)
    .filter((file) => path.extname(file).toLowerCase() === ".pdf")
    .map((file) => path.basename(file, ".pdf"));

  console.log(`📋 Found ${pdfFiles.length} PDF files in the target directory`);

  // Clean previous previews
  await cleanPreviewsDirectory();

  const results = [];
  let successCount = 0;
  let errorCount = 0;

  // Process each PDF file
  for (const articleId of pdfFiles) {
    const result = await generateSinglePreview(articleId);
    results.push(result);

    if (result.success) {
      console.log(`✅ ${articleId}: ${result.message}`);
      successCount++;
    } else {
      console.log(`❌ ${articleId}: ${result.message}`);
      errorCount++;
    }
  }

  // Summary
  console.log("\n📊 Generation Summary:");
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${errorCount}`);
  console.log(`📁 Output directory: ${CONFIG.previewsDir}`);

  // List generated files
  if (successCount > 0) {
    console.log("\n📸 Generated preview files:");
    const previewFiles = fs
      .readdirSync(CONFIG.previewsDir)
      .filter((file) => file.endsWith("-preview.jpg"))
      .sort();

    previewFiles.forEach((file) => {
      const filePath = path.join(CONFIG.previewsDir, file);
      const stats = fs.statSync(filePath);
      const fileSizeKB = Math.round(stats.size / 1024);
      console.log(`  📄 ${file} (${fileSizeKB}KB)`);
    });
  }

  // Exit with error if any conversions failed
  if (errorCount > 0) {
    console.log(
      `\n⚠️  ${errorCount} conversion(s) failed. Check the logs above for details.`
    );
    process.exit(1);
  }

  console.log("\n🎉 All previews generated successfully!");
}

/**
 * Main execution
 */
async function main() {
  try {
    console.log("🖼️  PDF Preview Generator v1.0.0\n");

    // Generate previews
    await generateAllPreviews();
  } catch (error) {
    console.error("💥 Fatal error:", error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

// Export functions for external use
module.exports = {
  generateAllPreviews,
  generateSinglePreview,
};
