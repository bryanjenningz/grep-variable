// grepVariable 1.0.0
// (c) 2015 Bryan Jennings
// github.com/bryanjenningz

(function(factory) {
  // Set root depending on the environment.
  var root = (window === window.window && window) || (global === global.global && global);
  factory(root);
})(function(root) {
  // Breadth-first search for a variable that works in browsers and Node.js.
  // variable: (String) Name of the variable that you're looking for.
  // callback: (Function) Optional function that gets called with the arguments: 
  //   callback(variableValue (Any type), variableName (String), variableEnvironment(Object or Array))
  // exact: (Boolean) Whether to return the exact variable name or similar variables.
  //   If set to false (default), grep('hey') would find variables that contain 'hey' in their name.
  //   Example: grep('hey') // matches 'hey', 'heyThere', 'they'
  var grepVariable = function(variable, callback, exact) {
    var saved = [root];

    while (saved.length > 0) {
      current = saved.shift();

      for (var key in current) {
        if (exact ? key === variable : key.indexOf(variable) >= 0) {
          if (callback) {
            callback(current[key], key, current);
          } else {
            console.log(key + ': ' + JSON.stringify(current[key]));
          }
        }

        // If it is an object or an array, save it to traverse later
        if (typeof current[key] === 'object' && current[key] !== null) {
          saved.push(current[key]);
        }
      }
    }
  };

  return grepVariable;
});
