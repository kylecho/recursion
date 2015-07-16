// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  var result = [];
  function traverse(node, className){
    var nodes = node.childNodes
    for (var i = 0; i < nodes.length; i++){
        var classes = nodes[i].classList;
        if (classes && classes.contains(className)) {
            result.push(nodes[i]);
        }
        if (nodes[i].childNodes[0]){
            traverse(nodes[i], className);
        }
    }
  }
  traverse(document, className);
  return result;
};
