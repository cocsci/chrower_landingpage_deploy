module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "hero-pattern": "url('/images/hero_bg.png')",
        "curve-background": "url('/images/curve_background.png')",
      }),
      fontFamily: {
        headline: ["Amiko"],
      },
      fontSize: {
        headline: "48px",
        "sub-headline": "28px",
        "article-headline": "20px",
        article: "16px",
      },
      backgroundColor: (theme) => ({
        primary: "#313131",
        dividercolor: "#588977",
        newsletter: "#f1f1f1",
      }),
      maxWidth: {
        "3-4": "75%",
      },
      colors: {
        dividercolor: "#588977",
      },
    },
  },
  variants: {},
  plugins: [],
};
