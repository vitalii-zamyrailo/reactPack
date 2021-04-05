export function square(num) {
	return Math.pow(num, 2);
}

export function cube(num) { // tree-shaking example for webpack prod mode
	return Math.pow(num, 3);
}
