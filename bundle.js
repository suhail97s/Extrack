(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
(function (process){(function (){
(function(){

   "use strict";

   var libPrefix = process.env.COVER ? './lib-cov' : './lib';

   module.exports = process.browser ? {
      compare: require('./lib/compare'),
      XMLSerializer: require('./lib/canonizer'),
      revXPath: require('./lib/revxpath'),
      GroupingReporter: require('./lib/reporters/groupingReporter.js')
   } :
   {
      compare: require(libPrefix + '/compare'),
      XMLSerializer: require(libPrefix + '/canonizer'),
      revXPath: require(libPrefix + '/revxpath'),
      GroupingReporter: require(libPrefix + '/reporters/groupingReporter.js')
   };

})();
}).call(this)}).call(this,require('_process'))
},{"./lib/canonizer":3,"./lib/compare":6,"./lib/reporters/groupingReporter.js":9,"./lib/revxpath":10,"_process":1}],3:[function(require,module,exports){
(function(){

   "use strict";

   var c = require('./node_types'), spaces = '  ';


   function _sortAttributes(a, b) {
      return a.nodeName < b.nodeName ? -1 : 1;
   }

   function _canonizeNode(node, indent) {
      var i = new Array(indent + 1).join(spaces), hasChildren = node.childNodes.length > 0, ret;
      ret = i + "<" + node.nodeName +
                     _canonizeAttributes(node.attributes, indent + 1);
      if(hasChildren) {
         ret += ">" + _canonizeNodeList(node.childNodes, indent + 2) +
            "\n" + i + "</" + node.nodeName + ">";
      } else
         ret += " />";
      return ret;
   }

   function _canonizeAttributes(attrs, indent) {

      var aList = [], ret = "", i = new Array(indent + 1);
      if (attrs && attrs.length) {

         Object.keys(attrs).map(function (i) {
            return parseInt(i, 10);
         }).filter(function (i) {
            return typeof(i) == 'number' && i >= 0;
         }).sort(function (a, b) {
            return a < b ? -1 : 1;
         }).forEach(function (k) {
            aList.push(attrs[k]);
         });
         aList.sort(_sortAttributes);
         aList.forEach(function(a){
            ret += "\n" + i.join(spaces) + a.nodeName + "=\"" + (a.nodeValue + "").replace(/"/g, '&quot;') + "\"";
         });
      }
      return ret;
   }

   function _canonizeNodeList(list, indent) {
      var ret = '',
          i, l;
      if(list){
         l = list.length;
         for(i=0; i < l; i++) {
            ret += "\n" + canonize(list.item(i), indent);
         }
      }
      return ret;
   }

   function _canonizeText(nodeType, text, indent) {
      var ret = [], i = new Array(indent + 1).join(spaces);
      switch (nodeType) {
         case c.CDATA_SECTION_NODE:
            ret[0] = "<![CDATA[";
            ret[2] = "]]>";
            break;
         case c.COMMENT_NODE:
            ret[0] = "<!--";
            ret[2] = "-->";
            break;
         case c.TEXT_NODE:
            break;
      }
      if(nodeType !== c.CDATA_SECTION_NODE)
         text = text.trim();
      ret[1] = text;
      return i + ret.join('');
   }

   function canonize(node, indent) {
      indent = indent || 0;
      switch (node.nodeType) {
         case c.DOCUMENT_NODE:
            return canonize(node.documentElement, indent);
         case c.ELEMENT_NODE:
            return _canonizeNode(node, indent);
         case c.CDATA_SECTION_NODE:
            // fallthrough
         case c.COMMENT_NODE:
            // fallthrough
         case c.TEXT_NODE:
            return _canonizeText(node.nodeType, node.nodeValue, indent);
         default:
            throw Error("Node type " + node.nodeType + " serialization is not implemented");
      }

   }

   function XMLSerializer() {}

   XMLSerializer.prototype.serializeToString = function(doc) {
      return canonize(doc);
   };

   module.exports = XMLSerializer;

})();
},{"./node_types":7}],4:[function(require,module,exports){
(function(){

  "use strict";

  module.exports = function collapseSpaces(str) {
    // Replace all whitespace with the space character and then collapse all white space to one space character
    return str.replace(/\s/g, ' ').replace(/\s\s+/g, ' ');
  };

})();

},{}],5:[function(require,module,exports){
(function(){

   "use strict";

   var type = require('./node_types');
   var revxpath = require('./revxpath.js');
   var collapseSpaces = require('./collapse_spaces');
   var normalizeNewlines = require('./normalize_newlines');

   var typeMap = {},
       comparatorTypeMap = {};

   typeMap[type.ATTRIBUTE_NODE] = "attribute";
   typeMap[type.ELEMENT_NODE] = "element";
   typeMap[type.TEXT_NODE] = "text node";
   typeMap[type.COMMENT_NODE] = "comment node";
   typeMap[type.CDATA_SECTION_NODE] = "CDATA node";
   typeMap[type.DOCUMENT_NODE] = "document";
   typeMap[type.DOCUMENT_FRAGMENT_NODE] = "document fragment";

   Object.keys(type).forEach(function(k){
      comparatorTypeMap[type[k]] = k;
   });

   function Collector(options) {
      this._diff = [];
      this._options = options || {};
   }

   Collector.prototype._describeNode = function(node) {
      if(node.nodeType == type.TEXT_NODE ||
         node.nodeType == type.CDATA_SECTION_NODE ||
         node.nodeType == type.COMMENT_NODE) {
         var nodeValue = node.nodeValue;

         if(this._options.stripSpaces) {
            nodeValue = nodeValue.trim();
         }
         if(this._options.collapseSpaces) {
            nodeValue = collapseSpaces(nodeValue);
         }
         if(this._options.normalizeNewlines) {
            nodeValue = normalizeNewlines(nodeValue);
         }

         return "'" + nodeValue + "'";
      }
      else
         return "'" + node.nodeName + "'";
   };

   Collector.prototype.getDifferences = function() {
      return this._diff;
   };

   Collector.prototype.getResult = function() {
      return this._diff.length == 0
   };

   Collector.prototype.collectFailure = function(expected, actual) {

      var msg, canContinue = true, vExpected, vActual, ref = expected || actual, cmprtr, r;

      if(this._options.comparators && (cmprtr = this._options.comparators[comparatorTypeMap[ref.nodeType]])) {
         if(!(cmprtr instanceof Array))
            cmprtr = [ cmprtr ];
         for(var i = 0, l = cmprtr.length; i < l; i++) {
            r = cmprtr[i](expected, actual);
            if(r) {
               // true -> ignore differences. Stop immediately, continue;
               if(r === true) {
                  return true;
               }
               // string - treat as error message, continue;
               else if(typeof r == 'string') {
                  msg = r;
                  canContinue = true;
               }
               // object - .message = error message, .stop - stop flag
               else if(typeof r == 'object') {
                  msg = r.message;
                  canContinue = !(!!r.stop);
               }
               break;
            }

         }
      }

      if(!msg) {

         if(expected && !actual) {
            msg = typeMap[expected.nodeType].charAt(0).toUpperCase() + typeMap[expected.nodeType].substr(1) +
               " " + this._describeNode(expected) + " is missed";
            canContinue = true;
         }
         else if(!expected && actual) {
            msg = "Extra " + typeMap[actual.nodeType] + " " + this._describeNode(actual);
            canContinue = true;
         }
         else {
            if(expected.nodeType == actual.nodeType) {
               if(expected.nodeName == actual.nodeName) {
                  vExpected = expected.nodeValue;
                  vActual = actual.nodeValue;
                  if(this._options.stripSpaces && expected.nodeType != type.CDATA_SECTION_NODE) {
                     vExpected = vExpected.trim();
                     vActual = vActual.trim();
                  }
                  if(this._options.collapseSpaces && expected.nodeType != type.CDATA_SECTION_NODE) {
                     vExpected = collapseSpaces(vExpected);
                     vActual = collapseSpaces(vActual);
                  }
                  if(this._options.normalizeNewlines) {
                     vExpected = normalizeNewlines(vExpected);
                     vActual = normalizeNewlines(vActual);
                  }
                  if(vExpected == vActual)
                     throw new Error("Nodes are considered equal but shouldn't");
                  else {
                     switch(expected.nodeType) {
                        case type.ATTRIBUTE_NODE:
                           msg = "Attribute '" + expected.nodeName + "': expected value '" + vExpected + "' instead of '" + vActual + "'";
                           break;
                        case type.COMMENT_NODE:
                           msg = "Expected comment value '" + vExpected + "' instead of '" + vActual + "'";
                           break;
                        case type.CDATA_SECTION_NODE:
                           msg = "Expected CDATA value '" + vExpected + "' instead of '" + vActual + "'";
                           break;
                        case type.TEXT_NODE:
                           msg = "Expected text '" + vExpected + "' instead of '" + vActual + "'";
                           break;
                        default:
                           throw new Error("nodeValue is not equal, but nodeType is unexpected");
                     }
                     canContinue = true;
                  }
               }
               else {
                  msg = "Expected " + typeMap[expected.nodeType] +
                     " '" + expected.nodeName + "' instead of '" + actual.nodeName + "'";
                  canContinue = false;
               }
            }
            else {
               msg = "Expected node of type " + expected.nodeType +
                  " (" + typeMap[expected.nodeType] + ") instead of " +
                  actual.nodeType + " (" + typeMap[actual.nodeType] + ")";
               canContinue = false;
            }
         }
      }

      this._diff.push({
         node: revxpath(ref.ownerElement || ref.parentNode),
         message: msg
      });

      return canContinue;
   };

   module.exports = Collector;


})();

},{"./collapse_spaces":4,"./node_types":7,"./normalize_newlines":8,"./revxpath.js":10}],6:[function(require,module,exports){
(function(){

   "use strict";

   var type = require('./node_types');
   var Collector = require('./collector');
   var collapseSpaces = require('./collapse_spaces');
   var normalizeNewlines = require('./normalize_newlines');

   function Comparator(options, collector) {
      this._options = options || {};
      if(!collector)
         throw new Error("Collector instance must be specified");
      this._collector = collector;
   }

   Comparator.prototype._filterNodes = function(list) {
      var ret = [],
         i, l, item;
      for (i = 0, l = list.length; i < l; i++) {
         item = list.item(i);
         if (item.nodeType == type.COMMENT_NODE && !this._options.compareComments)
            continue;
         if (item.nodeType == type.TEXT_NODE && ("" + item.nodeValue).trim() == "")
            continue;
         ret.push(item);
      }
      return ret;
   };

   Comparator.prototype._compareNodeList = function(left, right) {
      var lLeft = this._filterNodes(left),
         lRight = this._filterNodes(right),
         i, l, result = true;

      for (i = 0, l = Math.max(lLeft.length, lRight.length); i < l; i++) {
         if(lLeft[i] && lRight[i]) {
            if (!this.compareNode(lLeft[i], lRight[i])) {
               result = false;
            }
         }
         else {
            this._collector.collectFailure(lLeft[i], lRight[i]);
            result = false;
         }
      }
      return result;
   };

   Comparator.prototype._compareAttributes = function(expected, actual) {
      var aExpected = {}, aActual = {},
         i, l;

      if (!expected && !actual)
         return true;



      for(i = 0, l = expected.length; i < l; i++) {
         aExpected[expected[i].nodeName] = expected[i];
      }

      for(i = 0, l = actual.length; i < l; i++) {
         aActual[actual[i].nodeName] = actual[i];
      }

      for(i in aExpected) {
         // both nodes has an attribute
         if(aExpected.hasOwnProperty(i) && aActual.hasOwnProperty(i)) {
            // but values is differ
            var vExpected = aExpected[i].nodeValue;
            var vActual = aActual[i].nodeValue;
            if(this._options.stripSpaces && aExpected[i].nodeType != type.CDATA_SECTION_NODE) {
               vExpected = vExpected.trim();
               vActual = vActual.trim();
            }
            if(this._options.collapseSpaces && aExpected[i].nodeType != type.CDATA_SECTION_NODE) {
               vExpected = collapseSpaces(vExpected);
               vActual = collapseSpaces(vActual);
            }
            if(this._options.normalizeNewlines) {
               vExpected = normalizeNewlines(vExpected);
               vActual = normalizeNewlines(vActual);
            }
            if(vExpected !== vActual) {
               if(!this._collector.collectFailure(aExpected[i], aActual[i]))
                  return false;
            }
            // remove to check for extra/missed attributes;
            delete aActual[i];
            delete aExpected[i];
         }
      }

      // report all missed attributes
      for(i in aExpected) {
         if(aExpected.hasOwnProperty(i))
            if(!this._collector.collectFailure(aExpected[i], null))
               return false;
      }

      // report all extra attributes
      for(i in aActual) {
         if(aActual.hasOwnProperty(i))
            if(!this._collector.collectFailure(null, aActual[i]))
               return false;
      }

      return true;
   };

   Comparator.prototype.compareNode = function(left, right) {
      var vLeft, vRight, r;

      if (typeof left === 'string' || typeof right === 'string') {
         throw new Error('String comparison is not supported. You must parse string to document to perform comparison.');
      }

      if (left.nodeName === right.nodeName && left.nodeType == right.nodeType) {
         switch (left.nodeType) {
            case type.DOCUMENT_NODE:
               return this.compareNode(left.documentElement, right.documentElement);
            case type.ELEMENT_NODE:
               return this._compareAttributes(left.attributes, right.attributes) &&
                     this._compareNodeList(left.childNodes, right.childNodes);
            case type.TEXT_NODE:
               // fallthrough
            case type.CDATA_SECTION_NODE:
               // fallthrough
            case type.DOCUMENT_FRAGMENT_NODE:
               // fallthrough 
            case type.COMMENT_NODE:
               if (left.nodeType == type.COMMENT_NODE && !this._options.compareComments)
                  return true;
               vLeft = "" + left.nodeValue;
               vRight = "" + right.nodeValue;
               if (this._options.stripSpaces && left.nodeType !== type.CDATA_SECTION_NODE) {
                  vLeft = vLeft.trim();
                  vRight = vRight.trim();
               }
               if (this._options.collapseSpaces && left.nodeType !== type.CDATA_SECTION_NODE) {
                  vLeft = collapseSpaces(vLeft);
                  vRight = collapseSpaces(vRight);
               }
               if (this._options.normalizeNewlines) {
                  vLeft = normalizeNewlines(vLeft);
                  vRight = normalizeNewlines(vRight);
               }
               r = vLeft === vRight;
               return !r ? this._collector.collectFailure(left, right) : r;
            default:
               throw Error("Node type " + left.nodeType + " comparison is not implemented");
         }
      } else
         return this._collector.collectFailure(left, right);
   };

   module.exports = function(a, b, options) {


      var collector = new Collector(options);
      var comparator = new Comparator(options, collector);
      comparator.compareNode(a, b);

      return collector;

   };

})();

},{"./collapse_spaces":4,"./collector":5,"./node_types":7,"./normalize_newlines":8}],7:[function(require,module,exports){
(function(){

   "use strict";

   module.exports = {
      ELEMENT_NODE: 1,
      ATTRIBUTE_NODE: 2,
      TEXT_NODE: 3,
      CDATA_SECTION_NODE: 4,
      ENTITY_REFERENCE_NODE: 5,
      ENTITY_NODE: 6,
      PROCESSING_INSTRUCTION_NODE: 7,
      COMMENT_NODE: 8,
      DOCUMENT_NODE: 9,
      DOCUMENT_TYPE_NODE: 10,
      DOCUMENT_FRAGMENT_NODE: 11,
      NOTATION_NODE: 12
   };

})();
},{}],8:[function(require,module,exports){
(function(){

  "use strict";

  module.exports = function normalizeNewlines(str) {
    // First replace all CR+LF newlines then replace CR newlines
    return str.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  };

})();

},{}],9:[function(require,module,exports){
(function() {

   "use strict";

   module.exports = {
      report: function(res) {
         var _res = this.getDifferences(res);
         return Object.keys(_res).map(function(path){
            return [path, "\n\t", _res[path].join('\n\t')].join('');
         }.bind(this)).join('\n');
      },
      getDifferences: function(res) {
         var _res = {};
         res.getDifferences().forEach(function(f){
            (_res[f.node] = (_res[f.node] || [])).push(f.message);
         }.bind(this));
         return _res;
      }
   };

})();
},{}],10:[function(require,module,exports){
(function(){

   "use strict";

   var type = require('./node_types');

   function _describeNode(node) {
      var parent = node.parentNode,
          myName = node.nodeName,
          sameSiblings,
          i, l;

      // Find all siblings that have the same name.
      if (parent && parent.childNodes && parent.childNodes.length) {
         sameSiblings = [];
         for(i = 0, l = parent.childNodes.length; i < l; i++) {
            if (parent.childNodes[i].nodeName === myName) {
               sameSiblings.push(parent.childNodes[i]);
            }
         }
      }

      if(node.nodeType == type.DOCUMENT_NODE)
         return "";

      if(sameSiblings && sameSiblings.length > 1) {
         if(node.hasAttribute('id'))
            return myName + "[@id='" + node.getAttribute('id') + "']";
         for(i = 0, l = sameSiblings.length; i < l; i++) {
            if(sameSiblings[i] == node)
               return myName + "[" + (i + 1) + "]";
         }
         throw new Error("Node is not found, but should be!");
      } else
         return myName;
   }

   function _processNode(node, res) {

      res.unshift(_describeNode(node));
      if(node.parentNode)
         _processNode(node.parentNode, res);

   }

   module.exports = function revXPath(node) {

      var res;

      if(!node)
         return "";

      if(node.nodeType == type.DOCUMENT_NODE)
         return "/";

      _processNode(node, res = []);
      return res.join('/');

   };


})();
},{"./node_types":7}],11:[function(require,module,exports){

/* ========================================================================DO NOT CHANGE ANY CODES ABOVE THIS LINE============================================================*/

/* ======== PROBLEM: ONLY WORK IF AT THE TIME U OPEN THE BROWSER, THERE ARE 
===========         ALREADY TABS OPENED (OR WHEN U ADDON THE EXTENSION, THE TAB IS ALREADY OPEN)
=========== TO DO: ADD THE DIFFENCES FROM THE REPORT TO AN ARRAY OR STH, AND PUT THEM IN THE 
===========        REPORT (CAN CREATE ANOTHER PAGE, SUMMARY OF DOM DIFFERENCES GROUPED BY URL)
* ========= FKING PAIN IN THE ASS */

var compare =  require('./dom-compare').compare
var reporter =  require('./dom-compare').GroupingReporter

var result, current, original;

/* =======================================GETTING THE EXPECTED DOM=======================================*/
function expectedDOM(){
  
   /* GET ACTIVE TABS ONLY. IF WANT ALL TABS IN WINDOW, REMOVE ACTIVE: TRUE */
   browser.tabs.query({currentWindow: true, active: true }).then((tabs) => {
      tab = tabs[0].url;
      console.log("Expected URL:" + tab);

      /* GETS THE EXPECTED DOM BY QUERYING IT OURSELVES, AFTER OBTAINING THE URLS OF OPEN TABS */
      fetch(tab).then(res => res.text()).then((responseText) => {

         const doc = new DOMParser().parseFromString(responseText, 'text/html');
         let temp = doc.querySelector('body').innerHTML;   
         original = new DOMParser().parseFromString(temp, 'text/html');
         console.log("original" + original);

      })
   })
   
}
/* ==================================END===================================== */

/* START OF CONTENT-SCRIPT CODE THINGS */

/* ==============================GET ACTIVE TABS=============================== */
function getActiveTab()
{
   /* GET ACTIVE TABS ONLY. IF WANT ALL TABS IN WINDOW, REMOVE ACTIVE: TRUE */
   return browser.tabs.query({currentWindow: true, active: true })
} 
/* ==================================END===================================== */
/* ==============INITIATE COMMUNICATION TO TABS RECEIVED BY FUNCTION IN CONTENT-SCRIPT.JS=============== */
function getTabsSendmessage()
{
   getActiveTab().then((tabs) => {
      let tab = tabs[0]
      if(! (tab.url.startsWith("about:")))
      {
         //console.log(tab.url.startsWith("about"));
      /* THE MESSAGE WE SENDING TO TAB, IN THIS FORMAT (TAB.ID, MESSAGE) */
         browser.tabs.sendMessage(
            tab.id,
            {greeting: "Hi from bundle.js"}
         ).then(response => {
            /* RESPONSE WE GOT BACK FROM CONTENT-SCRIPT.JS */
            console.log("Message from the content-script.js:");
            // console.log(response.response);
            // Changing the response back to document type, from currentDOM.innerHTML
            current = new DOMParser().parseFromString(response.response, "text/html");
            console.log("current:" + current);
            //get the expected DOM
            expectedDOM();
            // compare the two DOM
            analyseDOM();
            });
         }
   })   
}
/* ==================================END===================================== */
/* =========CHECKS IF DOCUMENT IS READY BUT HONESTLY MCM NO DIFF LMAO USELESS============ */
function sendMessageToTabs() {
   if(document.readyState === 'ready' || document.readyState === 'complete') 
   {
      getTabsSendmessage();
   } 
   else 
   {
      document.onreadystatechange = function () 
      {
         if (document.readyState == "complete") 
         {
            getTabsSendmessage();
         }
      }
   }
}
/* ==================================END===================================== */
/* =============================DOM COMPARISON =================================*/
function analyseDOM(){
   /* ONLY ABLE TO COMPARE DOCUMENT TYPE, NOT STRINGS*/
   result = compare(original, current);

   // get comparison result
   // console.log("Result:")
   console.log("Results:" + result.getResult()); // false IF trees are different

   // get all differences
   diff = result.getDifferences(); // array of diff-objects

   // differences, grouped by node XPath
   groupedDiff = reporter.getDifferences(result); // object, key - node XPATH, value - array of differences (strings)

   // string representation
   console.log(reporter.report(result));
}
/* ==================================END===================================== */

/* =============================CONTENT SCRIPT LISTENERS =================================*/
// update when the tab is activated
 browser.tabs.onActivated.addListener(sendMessageToTabs);
 
 // update when the tab is updated (CHANGE URL OR WATEV)
 browser.tabs.onUpdated.addListener(sendMessageToTabs);
/* ==================================END===================================== */

/* =================DO NOT REMOVE THIS LINE =====================*/
},{"./dom-compare":2}]},{},[11]);
/* ==================================END===================================== */


