module.exports = {
  verbose: true,
  rootDir: './',
  transform: {
      '^.+\\.js?$': 'babel-jest',
  },
  "coverageThreshold": ["json-summary"],
  "coverageThreshold": {
    "global": {
      "branches": 80,
      "functions": 80,
      "lines": 80,
      "statements": -10
    }
  }
}