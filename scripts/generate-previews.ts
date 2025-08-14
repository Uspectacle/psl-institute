import * as fs from 'fs';
import * as path from 'path';

// Import articles data
import { articles } from '../src/data/articles';

const pdf2pic = require('pdf2pic');

// Configuration
const CONFIG = {
  pdfsDir: path.join(process.cwd(), 'public', 'pdfs'),
  previewsDir: path.join(process.cwd(), 'public', 'previews'),
  density: 150,        // DPI quality
  width: 600,          // Preview width
  height: 800,         // Preview height
  quality: 85,         // JPEG quality
  format: 'jpg' as const
};

interface ConversionResult {
  success: boolean;
  articleId: string;
  message: string;
  outputPath?: string;
}

/**
 * Clean previews directory - remove all existing preview files
 */
async function cleanPreviewsDirectory(): Promise<void> {
  console.log('🧹 Cleaning previews directory...');
  
  if (!fs.existsSync(CONFIG.previewsDir)) {
    fs.mkdirSync(CONFIG.previewsDir, { recursive: true });
    console.log('📁 Created previews directory');
    return;
  }

  const files = fs.readdirSync(CONFIG.previewsDir);
  let deletedCount = 0;

  for (const file of files) {
    if (file.endsWith('-preview.jpg') || file.endsWith('-preview.png')) {
      const filePath = path.join(CONFIG.previewsDir, file);
      fs.unlinkSync(filePath);
      deletedCount++;
    }
  }

  console.log(`🗑️  Deleted ${deletedCount} existing preview files`);
}

/**
 * Check if PDF file exists for given article
 */
function pdfExists(articleId: string): boolean {
  const pdfPath = path.join(CONFIG.pdfsDir, `${articleId}.pdf`);
  return fs.existsSync(pdfPath);
}

/**
 * Generate preview image for a single PDF
 */
async function generateSinglePreview(articleId: string): Promise<ConversionResult> {
  const pdfPath = path.join(CONFIG.pdfsDir, `${articleId}.pdf`);
  const outputPath = path.join(CONFIG.previewsDir, `${articleId}-preview.jpg`);

  if (!pdfExists(articleId)) {
    return {
      success: false,
      articleId,
      message: `PDF file not found: ${pdfPath}`
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
      quality: CONFIG.quality
    });

    // Convert only the first page (index 1 in pdf2pic)
    const result = await convert(1, { responseType: 'base64' });

    if (result && fs.existsSync(outputPath)) {
      const stats = fs.statSync(outputPath);
      const fileSizeKB = Math.round(stats.size / 1024);
      
      return {
        success: true,
        articleId,
        message: `Preview generated successfully (${fileSizeKB}KB)`,
        outputPath
      };
    } else {
      return {
        success: false,
        articleId,
        message: 'Conversion completed but output file not found'
      };
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      articleId,
      message: `Conversion failed: ${errorMessage}`
    };
  }
}

/**
 * Generate all preview images
 */
async function generateAllPreviews(): Promise<void> {
  console.log('🚀 Starting PDF preview generation...');
  console.log(`📋 Found ${articles.length} articles in data`);

  // Clean previous previews
  await cleanPreviewsDirectory();

  const results: ConversionResult[] = [];
  let successCount = 0;
  let errorCount = 0;

  // Process each article
  for (const article of articles) {
    const result = await generateSinglePreview(article.id);
    results.push(result);

    if (result.success) {
      console.log(`✅ ${article.id}: ${result.message}`);
      successCount++;
    } else {
      console.log(`❌ ${article.id}: ${result.message}`);
      errorCount++;
    }
  }

  // Summary
  console.log('\n📊 Generation Summary:');
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${errorCount}`);
  console.log(`📁 Output directory: ${CONFIG.previewsDir}`);

  // List generated files
  if (successCount > 0) {
    console.log('\n📸 Generated preview files:');
    const previewFiles = fs.readdirSync(CONFIG.previewsDir)
      .filter(file => file.endsWith('-preview.jpg'))
      .sort();
    
    previewFiles.forEach(file => {
      const filePath = path.join(CONFIG.previewsDir, file);
      const stats = fs.statSync(filePath);
      const fileSizeKB = Math.round(stats.size / 1024);
      console.log(`  📄 ${file} (${fileSizeKB}KB)`);
    });
  }

  // Exit with error if any conversions failed
  if (errorCount > 0) {
    console.log(`\n⚠️  ${errorCount} conversion(s) failed. Check the logs above for details.`);
    process.exit(1);
  }

  console.log('\n🎉 All previews generated successfully!');
}

/**
 * Validate articles data
 */
function validateArticlesData(): void {
  console.log('🔍 Validating articles data...');
  
  if (!articles || articles.length === 0) {
    console.error('❌ No articles found in data file');
    process.exit(1);
  }

  const invalidArticles = articles.filter(article => !article.id || !article.title);
  if (invalidArticles.length > 0) {
    console.error('❌ Found articles with missing id or title:');
    invalidArticles.forEach(article => {
      console.error(`  - Article: ${JSON.stringify(article)}`);
    });
    process.exit(1);
  }

  console.log(`✅ Articles data valid (${articles.length} articles)`);
}

/**
 * Main execution
 */
async function main(): Promise<void> {
  try {
    console.log('🖼️  PDF Preview Generator v1.0.0\n');
    
    // Validate data first
    validateArticlesData();
    
    // Generate previews
    await generateAllPreviews();
    
  } catch (error) {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

export { generateAllPreviews, generateSinglePreview };