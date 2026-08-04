package sql_values

import "database/sql"

func NullableToStringPtr(value sql.NullString) *string {
	if value.Valid {
		return &value.String
	}

	return nil
}

func StringPtrToNullable(value *string) sql.NullString {
	if value == nil {
		return sql.NullString{
			Valid:  false,
			String: "",
		}
	}

	return sql.NullString{
		Valid:  true,
		String: *value,
	}
}
