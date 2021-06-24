const findRotateSteps = (ring, key) => {
  let count = 0;
  const innerFunc = (focus, currentString, targetIndex) => {
    const newString = currentString + ring[focus];
    let newTargetIndex = targetIndex;
    if (ring[focus] === key[targetIndex]) {
      count += 1;
      newTargetIndex += 1;
    }
    if (currentString === key) {
      return count;
    }
    // check which direction we need to rotate and rotate
    let left = !(ring[focus + 1] === key[newTargetIndex]);
    let newFocus = focus;
    if (newFocus === 0 && left) {
      newFocus = ring.length - 1;
    } else if (left) {
      newFocus -= 1;
    } else if (!left) {
      newFocus += 1;
    }
    count += 1;
    innerFunc(newFocus, newString, newTargetIndex);
  };
  innerFunc(0, '', 0);
  return count;
};

console.log(findRotateSteps('godding', 'gd'));
