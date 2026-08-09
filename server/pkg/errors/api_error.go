package errors

type ApiError struct {
	Code    string `json:"code"`
	Message string `json:"message"`
}

func NewApiError(code string, message string) *ApiError {
	return &ApiError{
		Code:    code,
		Message: message,
	}
}
