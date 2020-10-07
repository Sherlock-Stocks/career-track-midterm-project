let count = 0;
const possibleKeys = JSON.parse(process.env.API_MULI_KEY);

function getAPIKey() {
  if(count < possibleKeys.length) {
    count ++;
    return possibleKeys[count];
  } else {
    count = 1;
    return possibleKeys[0]; 
  }
}
