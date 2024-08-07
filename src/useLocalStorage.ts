// T - generic type
// T | (() => T)) - value of type T or a function that will return a type T

import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
	const [value, setValue] = useState<T>(() => {
		const jsonValue = localStorage.getItem(key);
		if (jsonValue == null) {
			if (typeof initialValue === "function") {
				// this tells us that this function intialValue is a function that will return type T
				// () calls the function
				return (initialValue as () => T)();
			} else {
				return initialValue;
			}
		} else {
			return JSON.parse(jsonValue);
		}
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue] as [T, typeof setValue];
}
