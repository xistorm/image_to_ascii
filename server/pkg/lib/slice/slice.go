package slice

func Filter[T any](slice []T, cb func(T) bool) []T {
	var result []T
	for _, value := range slice {
		if cb(value) {
			result = append(result, value)
		}
	}

	return result
}

func Map[T any, R any](slice []T, cb func(T) R) []R {
	var result []R
	for _, value := range slice {
		processed := cb(value)
		result = append(result, processed)
	}

	return result
}
