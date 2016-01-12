var INDENT_REGEX = /^[ ]+/;

module.exports = function(context) {
  var maxLength = context.options[0];

  function checkProgramForMaxIndent(node) {
    var lines = context.getSourceLines();

    lines.forEach(function(line, i) {
      var lineNumber = i + 1;
      var match = INDENT_REGEX.exec(line);
      var indentation = match && match[0].length;

      if (indentation && indentation > maxLength) {
        context.report(node, {
          column: 0,
          line: lineNumber ,
        }, "Line " + lineNumber + " exceeds the maximum indentation "
          + maxLength + " with " + indentation + " indentation spaces");
      }
    })
  }

  return {
    Program: checkProgramForMaxIndent,
  }

}

module.exports.schema = [{
  minimum: 0,
  type: "integer",
}]
