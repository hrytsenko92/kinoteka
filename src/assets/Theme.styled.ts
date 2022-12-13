export type themeType = {
  background?: string;
  textColorOne?: string;
  textColorTwo?: string;
  textColorHover?: string;
  iconColor?: string;
  blurColorOne?: string;
};
export const lightTheme: themeType = {
  background: "#EDF2F0", 
  textColorOne: "#181818", 
  textColorTwo: "#a0a5a8", 
  textColorHover: "#181818", 
  iconColor: "#4B70E2", 
  blurColorOne: "white",
}

export const darkTheme: themeType = {
  background: "#1F1E1E",
  textColorOne: "#FFFFFF",
  textColorTwo: "#BBA5A5",
  textColorHover: "#BBA5A5",
  iconColor: "#D01E1E",
  blurColorOne: "black",
}


export type sizesAndDeviceType = {
  mobile: string;
    tablet: string;
    laptop: string;
    laptopL: string
    desktop: string;
}
export const sizes: sizesAndDeviceType = {
  mobile: "768px",
  tablet: "1024px",
  laptop: "1400px",
  laptopL: "1760px",
  desktop: "1920px",
};

export const devices: sizesAndDeviceType = {
  mobile: `(min-width: ${sizes.mobile})`,
  tablet: `(min-width: ${sizes.tablet})`,
  laptop: `(min-width: ${sizes.laptop})`,
  laptopL: `(min-width: ${sizes.laptopL})`,
  desktop: `(min-width: ${sizes.desktop})`,
};



