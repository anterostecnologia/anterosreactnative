

class AnterosUtils {
	constructor() {}
	isArray(input) {
		return (
			input instanceof Array ||
			Object.prototype.toString.call(input) === "[object Array]"
		);
	}
}

const instance = new AnterosUtils();
export { instance as AnterosUtils };
