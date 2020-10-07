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
      }),
    },
    maxWidth: {
      "3-4": "75%",
    },
  },
  variants: {},
  plugins: [],
};
