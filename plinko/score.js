const outputs = [];
const k = 3;

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  outputs.push([dropPosition, bounciness, size, bucketLabel]);
}

function distance(pointA, pointB) {
  return Math.abs(pointA - pointB);
}

function runAnalysis() {
  const bucket = knn();

  console.log('Your point will probably fall into', bucket);
}

function knn(data) {
  return  _.chain(data, point)
    .map(row => [distance(row[0], point), row[3]])
    .sortBy(row => row[0])
    .slice(0,k)
    .countBy(row => row[1])
    .toPairs()
    .sortBy(row => row[1])
    .last()
    .first()
    .parseInt()
    .value()
}

function splitDataset(data, testCount) {
  const shuffled = _.shuffle(data);

  const testSet = _.slice(shuffled, 0, testCount);
  const trainingSet = _.slice(shuffled, testCount);

  return [testSet, trainingSet];
}