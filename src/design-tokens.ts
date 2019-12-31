// Options
export enum Color {
  pampas = '#F8F7F6',
  horizon = '#5D7FA9',
  glacier = '#7C9EC2',
  rum = '#715E85',
  ebonyClay = '#212836',
  monza = '#dd0000',
  green = '#00bb00',
}

export enum Padding {
  xs = '0.5rem',
  s = '1rem',
  m = '1.2rem',
  l = '1.6rem',
  xl = '2rem',
  xxl = '2.4rem',
}

export enum FontSize {
  xs = '0.8rem',
  s = '1rem',
  m = '1.4rem',
  l = '1.8rem',
  xl = '2rem',
  xxl = '2.2rem',
}

// Decisions
const DefaultColors = {
  backgroundColor: Color.pampas,
  textColor: Color.ebonyClay,
  linkColor: Color.rum,

  positiveColor: Color.green,
  negativeColor: Color.monza,

  primaryColor: Color.horizon,
  secondaryColor: Color.rum,
  tertiaryColor: Color.glacier,
}

export const DesignToken = {
  ...DefaultColors,

  lineHeightFactor: 1.613,

  defaultPadding: Padding.m,

  maxWidth: '1170px',

  cviDisplay: {
    fontSize: FontSize.xxl,
  },

  header: {
    backgroundColor: Color.ebonyClay,
    textColor: Color.glacier,
    textSize: FontSize.xl,
  },

  footer: {
    backgroundColor: Color.glacier,
    textColor: DefaultColors.textColor,
    textSize: FontSize.xs,
  },

  table: {
    border: `1px solid ${Color.horizon}`,
    padding: Padding.xs,
  },
}
