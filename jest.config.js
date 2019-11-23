
module.exports = {
  verbose: true,
  moduleNameMapper: {
    "^vue$": "vue/dist/vue.common.js"
  },
  moduleFileExtensions: [
      "js",
      "json",
      "vue"
  ],
  transform: {
      "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
      ".*\\.(vue)$": "<rootDir>/node_modules/vue-jest"
  }
}

/*
,
  collectCoverage: true,
  collectCoverageFrom: [
      "src/components/*.{js,vue}",
      "!**/node_modules/**"
  ],
  coverageReporters: [
      "html",
      "text-summary"
  ],
*/