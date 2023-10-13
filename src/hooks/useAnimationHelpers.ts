export default function useImagePreloader() {
  const interpolate = (
    rangeStart: number,
    rangeEnd: number,
    selectedStart: number,
    selectedEnd: number,
    value: number
  ) => {
    const rangeDiff = rangeEnd - rangeStart;
    const selectedDiff = selectedEnd - selectedStart;
    const valueDiff = value - rangeStart;
    const scale = valueDiff / rangeDiff;
    return selectedStart + scale * selectedDiff;
  };

  const getStyle = (property: string, value: number | string) => {
    let newProperty: string;
    let newValue: string | number;
    switch (property) {
      case "y":
        newProperty = "transform";
        newValue = `translateY(${value}px)`;
        break;
      case "opacity":
        newProperty = property;
        newValue = value;
        break;
      default:
        newProperty = property;
        newValue = value + "px";
        break;
    }

    return [newProperty, newValue];
  };

  return { interpolate, getStyle };
}
