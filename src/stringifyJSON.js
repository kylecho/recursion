// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {

	// determine wrapper type (primitive, array, object)
	if (obj === true      ||
			obj === false     ||
			obj === null      ||
			obj === undefined ||
			obj === NaN       ||
			typeof obj === 'number') {
		return '' + obj + '';
	} else if (typeof obj === 'string') {
		return '"' + obj + '"';
	} else if (obj.constructor === Object) {
		return findObj(obj);
	} else if (obj.constructor === Array) {
		return findArr(obj);
	}
	
	// helper function for object type
	function findObj(obj) {
		var keys = Object.keys(obj);
		var keyValueArr = [];
		for (var i = 0; i < keys.length; i++) {
			var keyValueStr = '"' + keys[i] + '":';
			if (typeof obj[keys[i]] === 'function') {
				continue;
			}
			if (keys[i] === 'undefined') {
				continue;
			}
			if (obj[keys[i]] === true      ||
					obj[keys[i]] === false     ||
					obj[keys[i]] === null      ||
					obj[keys[i]] === undefined ||
					obj[keys[i]] === NaN) {
				keyValueStr = keyValueStr + obj[keys[i]];
			} else if (typeof obj[keys[i]] === 'string') {
				keyValueStr = keyValueStr + '"' + obj[keys[i]] + '"';
			} else if (obj[keys[i]].constructor === Object) {
				keyValueStr = keyValueStr + findObj(obj[keys[i]]);
			} else if (obj[keys[i]].constructor === Array) {
				keyValueStr = keyValueStr + findArr(obj[keys[i]]);
			} else {
				keyValueStr = keyValueStr + obj[keys[i]];
			}
			keyValueArr.push(keyValueStr);
		}
		return '{' + keyValueArr.join(',') + '}';
	}

	// helper function for array type
	function findArr(obj) {
		var elementArr = [];
		for (var i = 0; i < obj.length; i++) {
			var element;
			if (obj[i] === true      ||
					obj[i] === false     ||
					obj[i] === null      ||
					obj[i] === undefined ||
					obj[i] === NaN) {
				element = obj[i];
			} else if (typeof obj[i] === 'string') {
				element = '"' + obj[i] + '"';
			} else if (obj[i].constructor === Object) {
				element = findObj(obj[i]);
			} else if (obj[i].constructor === Array) {
				element = findArr(obj[i]);
			} else {
				element = obj[i];
			}
			elementArr.push(element);
		}
		return '[' + elementArr.join(',') + ']';
	}

};
