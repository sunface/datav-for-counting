package utils

import (
	"errors"
	"fmt"
	"strconv"
)

// 将interface{}类型转为string类型
func Interface2String(v interface{}) (string, error) {
	switch v := v.(type) {
	case string:
		return v, nil
	case []byte:
		return string(v), nil
	case int:
		return strconv.FormatInt(int64(v), 10), nil
	case uint:
		return strconv.FormatUint(uint64(v), 10), nil
	case float64:
		return strconv.FormatFloat(v, 'f', 6, 64), nil
	case bool:
		return strconv.FormatBool(v), nil
	default:
		return "", errors.New("invalid interface type")
	}
}

// 将interface{}类型转为int类型
func Interface2Int(v interface{}) int {
	switch v := v.(type) {
	case float64:
		return int(v)
	case int64:
		return int(v)
	case int:
		return v
	default:
		return 0
	}
}

// []byte转为10进制整数
var errBase10 = errors.New("failed to convert to Base10")

func ByteToBase10(b []byte) (n uint64, err error) {
	base := uint64(10)

	n = 0
	for i := 0; i < len(b); i++ {
		var v byte
		d := b[i]
		switch {
		case '0' <= d && d <= '9':
			v = d - '0'
		default:
			n = 0
			err = errors.New("failed to convert to Base10")
			return
		}
		n *= base
		n += uint64(v)
	}

	return n, err
}

// 为float64指定2位小数位
func DecimalPrecision(f float64) float64 {
	f, err := strconv.ParseFloat(fmt.Sprintf("%.2f", f), 64)
	if err != nil {
		return 0
	}
	return f
}
