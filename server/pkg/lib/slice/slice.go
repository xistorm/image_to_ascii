package slice

import "errors"

func Filter[T any](slice []T, cb func(T) bool) []T {
	result := make([]T, 0)
	for _, value := range slice {
		if cb(value) {
			result = append(result, value)
		}
	}

	return result
}

func Map[T any, R any](slice []T, cb func(T) R) []R {
	result := make([]R, 0)
	for _, value := range slice {
		processed := cb(value)
		result = append(result, processed)
	}

	return result
}

func Find[T any](slice []T, cb func(T) bool) (T, error) {
	var empty T
	for _, value := range slice {
		if cb(value) {
			return value, nil
		}
	}

	return empty, errors.New("not found")
}
