function getScore(location, searchValue) {
  const [city] = location?.split(',');
  if (location.indexOf(searchValue) !== 0) {
    return 0;
  }
  var longer = city;
  var shorter = searchValue;
  if (city.length < searchValue.length) {
    longer = searchValue;
    shorter = city;
  }
  var longerLength = longer.length;
  if (longerLength === 0) {
    return 1.0;
  }
  return (longerLength - calcDistance(longer, shorter)) / parseFloat(longerLength);
}

function calcDistance(s1, s2) {
  var costs = new Array();
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
      if (i === 0) {
        costs[j] = j;
      } else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1[i - 1] != s2[j - 1]) {
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          }
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0) {
      costs[s2.length] = lastValue;
    }
  }
  return costs[s2.length];
}

module.exports = { getScore };