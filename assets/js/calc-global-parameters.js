export function globalParameters() {
var globalObjectPattern = {
    pattern: /[0-9]/,
    patternNew: /\*|\+|\-|\/|×|÷/,
    patternNan: /\*|\/|/,
    patternDot: /\./,
  };
  return globalObjectPattern;
}