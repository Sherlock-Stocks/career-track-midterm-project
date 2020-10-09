let count = 0;
const possibleKeys = process.env.API_MULTI_KEY;
const split = possibleKeys.split(',');

function getAPISprinkler() {
  if(count < split.length) {
    count++;
    return split[count - 1];

  } else {
    count = 1;
    return split[0];
  }
}
module.exports = getAPISprinkler;
