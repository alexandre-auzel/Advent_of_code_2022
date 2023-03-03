const fs = require('fs');
const internal = require('stream');

const sum = (array) => {
  return array.reduce((acc, el) => acc+el, 0)
}

fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const elfCal = data.split('\n\n').map((elf) => elf.split('\n')).map((elf) => elf.map((cal) => parseInt(cal))).map((elf) => sum(elf));
  const max1 = elfCal.slice(0, -1).reduce((acc, el, i) => {
    const [max, indexMax] = acc;
    if(el > max){
      return [el, i]
    }
    return acc
  }, [0, -1]);
  elfCal.splice(max1[1], 1)
  const max2 = elfCal.slice(0, -1).reduce((acc, el, i) => {
    const [max, indexMax] = acc;
    if(el > max){
      return [el, i]
    }
    return acc
  }, [0, -1]);
  elfCal.splice(max2[1], 1)
  const max3 = elfCal.slice(0, -1).reduce((acc, el, i) => {
    const [max, indexMax] = acc;
    if(el > max){
      return [el, i]
    }
    return acc
  }, [0, -1]);
  console.log(max1[0]+ max2[0]+ max3[0])

});