const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// To be able to parse JSON in our app
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

// The units with the names
const length = {
  millimeter: "millimeter",
  centimeter: "centimeter",
  meter: "meter",
  kilometer: "kilometer",
  inch: "inch",
  foot: "foot",
  yard: "yard",
  mile: "mile",
};
const weight = {
  milligram: "milligram",
  gram: "gram",
  kilogram: "kilogram",
  ounce: "ounce",
  pound: "pound",
};
const temperature = {
  celsius: "celsius",
  fahrenheit: "fahrenheit",
  kelvin: "kelvin",
};

// Factors, thanks chatgpt, I will trust you
const conversionFactors = {
  length: {
    millimeter: 0.001,
    centimeter: 0.01,
    meter: 1,
    kilometer: 1000,
    inch: 0.0254,
    foot: 0.3048,
    yard: 0.9144,
    mile: 1609.344,
  },
  weight: {
    milligram: 0.000001,
    gram: 0.001,
    kilogram: 1,
    ounce: 0.0283495,
    pound: 0.453592,
  },
};

// temp conversion functions, will also trust you gpt
function celsiusToKelvin(celsius) {
  return celsius + 273.15;
}

function kelvinToCelsius(kelvin) {
  return kelvin - 273.15;
}

function fahrenheitToCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

// Conversion endpoint
app.post("/convert", (req, res) => {
  const { value, fromUnit, toUnit, unitType } = req.body;
  let result;

  try {
    const numValue = parseFloat(value);

    if (isNaN(numValue)) {
      throw new Error("Invalid number provided");
    }

    if (unitType === "temperature") {
      // Handle temperature conversions
      // it will transform the unit you got to celsius anyways, then convert the celsius you got to the one you want to
      let celsius;
      switch (fromUnit) {
        case "celsius":
          celsius = numValue;
          break;
        case "fahrenheit":
          celsius = fahrenheitToCelsius(numValue);
          break;
        case "kelvin":
          celsius = kelvinToCelsius(numValue);
          break;
      }

      switch (toUnit) {
        case "celsius":
          result = celsius;
          break;
        case "fahrenheit":
          result = celsiusToFahrenheit(celsius);
          break;
        case "kelvin":
          result = celsiusToKelvin(celsius);
          break;
      }
    } else {
      // Handle length and weight conversions, simple unlike the temperature
      const factors = conversionFactors[unitType];
      if (!factors) {
        throw new Error("Invalid unit type");
      }

      const fromFactor = factors[fromUnit];
      const toFactor = factors[toUnit];

      if (!fromFactor || !toFactor) {
        throw new Error("Invalid conversion units");
      }

      result = (numValue * fromFactor) / toFactor;
    }

    res.json({
      success: true,
      result: result,
      value: numValue,
      fromUnit,
      toUnit,
      unitType,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

// Main page route
app.get("/", (req, res) => {
  const pageData = {
    title: "Unit converter",
    heading: "Welcome to unit converter",
    types: ["length", "weight", "temperature"],
    unitData: {
      length: Object.values(length),
      weight: Object.values(weight),
      temperature: Object.values(temperature),
    },
  };

  res.render("index", pageData);
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
