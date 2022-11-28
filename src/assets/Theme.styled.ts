export type themeType = {
  headerTop: string;
  background: string;
  baseColor: string;
  baseBTN: string;
  hoverBTN: string;
  cc: string;
};

export const lightTheme: themeType = {
headerTop: "#F4F5F7",
background: "#F4F5F7",
baseColor: "#F0F0F0",
baseBTN: "#000000",
hoverBTN: "#01b4e4",
cc: "blue",
}

export const darkTheme: themeType = {
headerTop: "#606060",
background: "#606060",
baseColor: "#F0F0F0",
baseBTN: "white",
hoverBTN: "#01b4e4",
cc: "green"
}
