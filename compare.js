var getPixels = require('get-pixels'),
    ndArray = require('ndarray');


if (!process.argv[2] || !process.argv[3]) {
  console.log('Error: You must pass two filenames as parameters.');
  process.exit(1);
}

function compare(image1, image2) {
  if (image1.shape[0] * image1.shape[1] !== image2.shape[0] * image2.shape[1]) {
    console.log('Error: Images are not the same dimensions');
    process.exit(1);
  }
  var samePixelCount = 0;
  var differentPixelCount = 0;
  var pixelCount = image1.shape[0] * image1.shape[1];

  for (var i = 0; i < pixelCount; i++) {
    if (image1.data[i] === image2.data[i]) {
      samePixelCount++;
    } else {
      differentPixelCount++;
    }
  }
  var similarity = samePixelCount / (samePixelCount + differentPixelCount) * 100;
  console.log('The images are ' + similarity.toFixed(2) + '% similar');
}

getPixels(process.argv[2], function(error, image1) {
  if (error) {
    console.log(error);
    process.exit(1);
  }
  getPixels(process.argv[3], function(error, image2) {
    if (error) {
      console.log(error);
      process.exit(1);
    }
    compare(image1, image2);
  });
});
