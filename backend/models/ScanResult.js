import mongoose from 'mongoose';

const scanResultSchema = new mongoose.Schema({
  input_type: {
    type: String,
    enum: ['url', 'email', 'message', 'file'],
    required: true
  },
  input_content: {
    type: String,
    required: true
  },
  file_url: String,
  risk_score: {
    type: Number,
    min: 0,
    max: 100
  },
  verdict: {
    type: String,
    enum: ['safe', 'suspicious', 'malicious']
  },
  flags: [String],
  explanation: String,
  recommended_actions: [String],
  status: {
    type: String,
    enum: ['scanning', 'complete', 'error'],
    default: 'scanning'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('ScanResult', scanResultSchema);