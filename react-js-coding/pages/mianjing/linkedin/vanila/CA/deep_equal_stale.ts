export default function deepEqual(valueA: unknown, valueB: unknown): boolean {
  const getType = (value: unknown) => {
    if (typeof value === "number") {
      return "number";
    }
    if (typeof value === "string") {
      return "string";
    }
    if (typeof value === "boolean") {
      return "boolean";
    }
    if (value === null) {
      return "null";
    }
    if (Array.isArray(value)) {
      return "array";
    }
    if (typeof value === "object") {
      return "object";
    }
    return "unknown";
  };

  const type = getType(valueA);

  if (type !== getType(valueB)) {
    return false;
  }

  if (["number", "boolean", "null", "string"].includes(type)) {
    return valueA === valueB;
  }
  if (type === "array") {
    if (valueA.length !== valueB.length) {
      return false;
    }
    for (let i = 0; i < valueA.length; i++) {
      if (!deepEqual(valueA[i], valueB[i])) {
        return false;
      }
    }
    return true;
  }

  if (type === "object") {
    const Akeys = Object.keys(valueA);
    const Bkeys = Object.keys(valueB);

    if (Akeys.length !== Bkeys.length) {
      return false;
    }

    for (const key of Akeys) {
      if (!Object.hasOwn(valueB, key)) {
        return false;
      }
      if (!deepEqual(valueA[key], valueB[key])) {
        return false;
      }
    }

    return true;
  }
}
