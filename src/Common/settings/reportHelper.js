export const getScreenNumberFromModule = (name, screen) => {
  if (name === "task") {
    switch (screen) {
      case "Assessment":
        return "1";
      case "Observation":
        return "1";
    }
  } else if (name === "sound1") {
    switch (screen) {
      case "Assessment":
        return "2";
      case "Observation":
        return "2";
      case "Incident":
        return "2";
      case "Hazard":
        return "2";
    }
  } else if (name === "critical_risk") {
    switch (screen) {
      case "Assessment":
        return "3";
      case "Observation":
        return "3";
    }
  } else if (name === "sound2") {
    switch (screen) {
      case "Assessment":
        return "4";
      case "Observation":
        return "4";
      case "Incident":
        return "3";
      case "Hazard":
        return "3";
    }
  } else if (name === "sound3") {
    switch (screen) {
      case "Assessment":
        return "5";
      case "Observation":
        return "5";
      case "Incident":
        return "8";
    }
  } else if (name === "consquence") {
    switch (screen) {
      case "Assessment":
        return "6";
      case "Incident":
        return "5";
      case "Hazard":
        return "4";
    }
  } else if (name === "likelihood") {
    switch (screen) {
      case "Assessment":
        return "7";
      case "Incident":
        return "6";
      case "Hazard":
        return "5";
    }
  } else if (name === "rating_value") {
    switch (screen) {
      case "Assessment":
        return "8";
      case "Incident":
        return "7";
      case "Hazard":
        return "6";
    }
  } else if (name === "image") {
    switch (screen) {
      case "Assessment":
        return "9";
      case "Observation":
        return "6";
      case "Incident":
        return "9";
      case "Hazard":
        return "7";
    }
  } else if (name === "sound4") {
    switch (screen) {
      case "Assessment":
        return "10";
      case "Observation":
        return "7";
      case "Incident":
        return "10";
      case "Hazard":
        return "8";
    }
  } else if (name === "activity_name") {
    switch (screen) {
      case "Incident":
        return "1";
      case "Hazard":
        return "1";
    }
  } else if (name === "actual_consequence") {
    switch (screen) {
      case "Incident":
        return "4";
    }
  }
};
