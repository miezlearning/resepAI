import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true,
    default: 'Anonymous'
  },
  date: {
    type: Date,
    default: Date.now
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  }
});

const RecipeSchema = new mongoose.Schema({
  nama_resep: {
    type: String,
    required: true
  },
  porsi: {
    type: Number,
    required: true
  },
  waktu_memasak: {
    type: String,
    required: true
  },
  bahan: {
    type: [String],
    required: true
  },
  langkah: {
    type: [String],
    required: true
  },
  tips: {
    type: String,
    required: true
  },
  kategori: {
    type: String,
    required: true
  },
  tingkat_kesulitan: {
    type: String,
    required: true,
    enum: ['Easy', 'Medium', 'Hard']
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  comments: [CommentSchema],
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Export the model
export default mongoose.models.Recipe || mongoose.model('Recipe', RecipeSchema);