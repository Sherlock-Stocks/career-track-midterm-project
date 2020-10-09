let count = 0;
const possibleKeys = (process.env.API_MULTI_KEY);

exports.getAPISprinkler = () => {
  if(count < possibleKeys.length) {
    count ++;
    return possibleKeys[count - 1];
  } else {
    count = 1;
    return possibleKeys[0]; 
  }
};
