export default function useAnimotionHelpers() {
  const getStyle = (property: string, value: number | string) => {
    let newProperty: string;
    let newValue: string | number;
    switch (property) {
      case 'y':
        newProperty = 'transform';
        newValue = `translateY(${value}px)`;
        break;
      case 'opacity':
        newProperty = property;
        newValue = value;
        break;
      default:
        newProperty = property;
        newValue = value + 'px';
        break;
    }

    return [newProperty, newValue];
  };

  return { getStyle };
}
