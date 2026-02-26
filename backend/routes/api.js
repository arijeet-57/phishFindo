import express from 'express';
import multer from 'multer';
import ScanResult from '../models/ScanResult.js';
import { analyzeWithAI } from '../utils/analyzer.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Detect input type
function detectInputType(text) {
  if (!text) return 'message';
  const urlRegex = /https?:\/\/[^\s]+|www\.[^\s]+/i;
  if (urlRegex.test(text)) return 'url';
  
  const emailIndicators = ['from:', 'to:', 'subject:', 'date:', '@', 'dear ', 'click here', 'verify your'];
  const lowerText = text.toLowerCase();
  const matchCount = emailIndicators.filter(ind => lowerText.includes(ind)).length;
  if (matchCount >= 2) return 'email';
  
  return 'message';
}

// POST /api/analyze
router.post('/analyze', upload.single('file'), async (req, res) => {
  try {
    const { content } = req.body;
    const file = req.file;

    if (!content && !file) {
      return res.status(400).json({ error: 'Content or file required' });
    }

    const inputType = file ? 'file' : detectInputType(content);
    const fileUrl = file ? `/uploads/${file.filename}` : null;

    // Create scan record
    const scan = new ScanResult({
      input_type: inputType,
      input_content: content || '(file upload)',
      file_url: fileUrl,
      status: 'scanning'
    });
    await scan.save();

    // Analyze with AI
    try {
      const aiResult = await analyzeWithAI(content, inputType, fileUrl);

      // Update scan record
      scan.risk_score = aiResult.riskScore || 0;
      scan.verdict = aiResult.verdict || 'suspicious';
      scan.flags = aiResult.flags || [];
      scan.explanation = aiResult.explanation || '';
      scan.recommended_actions = aiResult.recommendedActions || [];
      scan.status = 'complete';
      await scan.save();

      res.json(scan);
    } catch (aiError) {
      scan.status = 'error';
      scan.explanation = 'AI analysis failed: ' + aiError.message;
      await scan.save();
      res.status(500).json({ error: 'Analysis failed', scan });
    }
  } catch (error) {
    console.error('Analysis Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/history
router.get('/history', async (req, res) => {
  try {
    const scans = await ScanResult.find({ status: 'complete' })
      .sort({ created_at: -1 })
      .limit(50);
    res.json(scans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/scan/:id
router.get('/scan/:id', async (req, res) => {
  try {
    const scan = await ScanResult.findById(req.params.id);
    if (!scan) {
      return res.status(404).json({ error: 'Scan not found' });
    }
    res.json(scan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;