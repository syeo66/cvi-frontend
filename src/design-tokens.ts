// Options
export enum Color {
  grayNurse = '#EFF0EF',
  burningSand = '#D79673',
  bouquet = '#B28BAC',
  tapestry = '#B35F9E',
  outerSpace = '#2C3136',
}

export enum Padding {
  xs = '0.5rem',
  s = '1rem',
  m = '1.2rem',
  l = '1.6rem',
  xl = '2rem',
  xxl = '2.4rem',
}

export enum FontSizes {
  xs = '0.8rem',
  s = '1rem',
  m = '1.4rem',
  l = '1.8rem',
  xl = '2rem',
  xxl = '2.2rem',
}

// Decisions
const DefaultColors = {
  backgroundColor: Color.grayNurse,
  textColor: Color.outerSpace,
  primaryColor: Color.tapestry,
  secondaryColor: Color.burningSand,
}

export const DesignToken = {
  ...DefaultColors,
  defaultPadding: Padding.m,

  header: {
    backgroundColor: Color.outerSpace,
    textColor: Color.bouquet,
    textSize: FontSizes.xl,
  },
}
