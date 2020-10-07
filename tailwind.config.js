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
      fontFamily: {
        'headline': ['Amiko'],
      },
      fontSize: {
        'headline': '48px',
        'sub-headline': '28px',
        'article-headline': '20px',
        'article': '16px'
      }
    },
  },
  variants: {},
  plugins: [],
};
