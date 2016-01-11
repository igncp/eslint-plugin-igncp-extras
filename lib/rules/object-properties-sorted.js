module.exports = function(context) {
  var getKey = function(node) {
    return node.key.type === 'Identifier'
      ? node.key.name : node.key.value;
  };

  function checkSorted(declarations) {
    declarations.reduce(function(prev, curr) {
      var prevPropName = getKey(prev);
      var currentPropName = getKey(curr);

      if (currentPropName < prevPropName) {
        context.report(curr, 'Object properties declarations should be sorted alphabetically');

        return prev;
      }

      return curr;
    }, declarations[0]);
  }

  return {
    ClassProperty: function(node) {
      if (node.value && node.value.type === 'ObjectExpression') {
        checkSorted(node.value.properties);
      }
    },

    MemberExpression: function(node) {
      var right = node.parent.right;

      if (right && right.type === 'ObjectExpression') {
        checkSorted(right.properties);
      }
    },

    ObjectPattern: function(node) {
      checkSorted(node.properties);
    },

    ObjectExpression: function(node) {
      checkSorted(node.properties);
    },
  };
};

module.exports.schema = [];
