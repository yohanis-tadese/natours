const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have name'],
      unique: true,
      trim: true,
      maxLength: [40, 'A tour name must have less or eqal than 40 charachter'],
      minLength: [10, 'A tour name must have more or eqal than 10 charachter'],
      // validate: [validator.isAlpha, 'Tour name must only contain characters']
    },
    slug: String,
    secure: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have durations'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium,difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be bellow 5.0'],
    },
    ratingsQuantity: { type: Number, default: 0 },
    price: {
      type: Number,
      required: [true, 'A tour must have Price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // this only points to current doc on NEW document creation
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price',
      },
    },
    summary: {
      type: String,
      trim: true, //only work in string use remove empty space frm begining and end cut
      required: [true, 'A tour must have a sumary'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date, //automatical ly created time stamp
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
  },
  {
    toJSON: { virtuals: true }, // Corrected syntax
    toObject: { virtuals: true }, // Corrected syntax
  }
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

/*

//DOCUMENT MIDDLWARE work befuar .save and .create
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

tourSchema.post('save', function (doc, next) {
  console.log(doc);
  next();
});

//QUERY MIDDELEWARE
tourSchema.pre(/^find/, function (next) {
  this.find({ secure: { $ne: true } });
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  console.log(docs);
  next();
});

//Aggregation meddleware
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({
    $match: { secure: { $ne: true } },
  });
  next();
});
*/

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
