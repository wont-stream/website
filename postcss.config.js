module.exports = {
  plugins: [require('tailwindcss'), require('postcss-uncss').postcssPlugin, require('autoprefixer'), require('cssnano')({
    preset: 'default',
  })]
};
