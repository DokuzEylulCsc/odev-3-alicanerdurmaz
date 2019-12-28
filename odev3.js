/* 
  Alican Erdurmaz - 2018280067 - ODEV 3
   
  TESTED ON ->
  Javascript runtime : Node v12.14.0
  OS: {
    Host   : Manjaro 18.1.4 Juhraya
    Kernel : 5.4.2-1
  }
*/

const fs = require("fs");

const inputDir = "./input.txt";
const outputDir = "./output.txt";

const input = fs
  .readFileSync(inputDir)
  .toString()
  .split("\n");

const answers = input[1].split(",");
const numberOfQuestions = input[0];

const studentsData = input.slice(2).map(e => e.split(","));
const students = {};
studentsData.forEach(student => {
  let score = 0;
  for (let i = 1; i <= numberOfQuestions; i++) {
    if (student[i] === "") {
      continue;
    } else if (student[i] === answers[i - 1]) {
      score += 4;
    } else if (student[i] !== answers[i - 1]) {
      score -= 1;
    }
  }
  students[student[0]] = score;
  return {};
});

const arithmetics = calculateArithmetics(students);
const result = `${toTxt(students)}${arithmetics.toString()}`;
fs.writeFileSync(outputDir, result);

function calculateArithmetics(obj) {
  const max = Math.max.apply(null, Object.values(obj));
  const min = Math.min.apply(null, Object.values(obj));
  const average = Object.values(obj).reduce((a, b) => a + b) / Object.values(obj).length;
  const median = findMedian(Object.values(obj));
  const range = max - min;
  return [max, min, average, median, range];
}

function findMedian(arr) {
  const sorted = arr.sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }

  return sorted[middle];
}

function toTxt(obj) {
  let txt = "";
  const arr = Object.entries(obj).sort((a, b) => b[1] - a[1]);
  arr.forEach(e => {
    txt += `${e[0]},${e[1]}\n`;
  });

  return txt;
}
