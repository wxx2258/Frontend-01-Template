"use strict";

function cov_1752tyxu1z() {
  var path = "/Users/xiaoxinwu/mygithub/Frontend-01-Template/week18/tools/test-demo/src/add.js";
  var hash = "68a1e9943bd32deb661ecc7b83c4ed5da7d53767";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/Users/xiaoxinwu/mygithub/Frontend-01-Template/week18/tools/test-demo/src/add.js",
    statementMap: {
      "0": {
        start: {
          line: 2,
          column: 2
        },
        end: {
          line: 2,
          column: 15
        }
      },
      "1": {
        start: {
          line: 5,
          column: 0
        },
        end: {
          line: 5,
          column: 25
        }
      }
    },
    fnMap: {
      "0": {
        name: "add",
        decl: {
          start: {
            line: 1,
            column: 9
          },
          end: {
            line: 1,
            column: 12
          }
        },
        loc: {
          start: {
            line: 1,
            column: 19
          },
          end: {
            line: 3,
            column: 1
          }
        },
        line: 1
      }
    },
    branchMap: {},
    s: {
      "0": 0,
      "1": 0
    },
    f: {
      "0": 0
    },
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "68a1e9943bd32deb661ecc7b83c4ed5da7d53767"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_1752tyxu1z = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_1752tyxu1z();

function add(a, b) {
  cov_1752tyxu1z().f[0]++;
  cov_1752tyxu1z().s[0]++;
  return a + b;
}

cov_1752tyxu1z().s[1]++;
module.exports.add = add;

