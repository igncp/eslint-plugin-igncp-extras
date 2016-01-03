module.exports = function(context) {
  const getKey = (node) => node.key.type === 'Identifier'
    ? node.key.name : node.key.value;

  function checkSorted(declarations) {
    declarations.reduce((prev, curr) => {
      const prevPropName = getKey(prev);
      const currentPropName = getKey(curr);

      if (currentPropName < prevPropName) {
        context.report(curr, 'Object properties declarations should be sorted alphabetically');

        return prev;
      }

      return curr;
    }, declarations[0]);
  }

  return {
    ClassProperty(node) {
      if (node.value && node.value.type === 'ObjectExpression') {
        checkSorted(node.value.properties);
      }
    },

    MemberExpression(node) {
      const right = node.parent.right;

      if (right && right.type === 'ObjectExpression') {
        checkSorted(right.properties);
      }
    },

    ObjectPattern(node) {
      checkSorted(node.properties);
    },

    ObjectExpression(node) {
      checkSorted(node.properties);
    },
  };
};

module.exports.schema = [];
