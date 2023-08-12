export const getRandomSetFromArray = (array, count) => {
	if (count > array.length) {
		console.error('Count cannot be greater than the array length.');
		return new Set();
	}

	const randomSet = new Set();

	while (randomSet.size < count) {
		const randomIndex = Math.floor(Math.random() * array.length);
		randomSet.add(array[randomIndex]);
	}

	return randomSet;
};

export function generateShortUUID(length = 8) {
  const fullUUID = crypto.randomUUID();
  const shortUUID = fullUUID.replace(/-/g, '').substring(0, length);
  return shortUUID;
}

export function randomizeArrayValues(inputArray) {
  const randomizedArray = [...inputArray]; // Clone the input array
  for (let i = randomizedArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [randomizedArray[i], randomizedArray[j]] = [randomizedArray[j], randomizedArray[i]]; // Swap elements
  }
  return randomizedArray;
}