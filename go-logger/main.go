package main

import (
	"fmt"
	"strconv"
	"strings"
	"time"
)

func main() {
	// logger := Logger.New(Logger{}, "%M")
	logger := NewLogger("")
	logger.Log("Here")
	logger.Error("Error in line 1")
	logger.Warn("Function depricated")

	logger.Log("LOL")
	logger.Error("Error in line 1")
	logger.Warn("Function depricated")
}

type Logger struct {
	format string
	prefix string
}

func (L *Logger) SetFormat(f string) bool {
	if !strings.Contains(f, "%M") {
		fmt.Println("Must contain message format")
		return true
	}
	L.format = f
	return false
}

func (L *Logger) SetPrefix(prefix string) {
	L.prefix = prefix
}

func (L Logger) Display(l string, color string, _type string) {
	formats := [5]string{"%h", "%m", "%s", "%T", "%M"}
	logg := L.prefix + L.format
	currentTime := time.Now()

	for _, element := range formats {
		a := ""
		switch element {
		case "%h":
			a = strconv.Itoa(currentTime.Hour())
		case "%m":
			a = strconv.Itoa(currentTime.Minute())
		case "%s":
			a = strconv.Itoa(currentTime.Second())
		case "%T":
			a = _type
		case "%M":
			a = l
		}
		logg = strings.Replace(logg, element, a, -1)
	}
	fmt.Println(color, logg)
}

func (L Logger) Log(l string) {
	L.Display(l, "\033[36m", "  Log  ")
}
func (L Logger) Warn(l string) {
	L.Display(l, "\033[33m", "Warning")
}
func (L Logger) Error(l string) {
	L.Display(l, "\033[31m", " Error ")
}

func (Logger) New(f string) Logger {
	logger := Logger{}
	logger.SetPrefix("%h:%m:%s [ %T ]: ")
	if err := logger.SetFormat(f); !err {
		return logger
	}
	logger.SetFormat("%M")
	return Logger{}
}

func NewLogger(f string) Logger {
	logger := Logger{}
	logger.SetPrefix("%h:%m:%s [ %T ]: ")
	if err := logger.SetFormat(f); !err {
		return logger
	}
	logger.SetFormat("%M")
	return logger
}
