var T = require("ThreadManager.js");
var I = require("Interactive.js");
var D = require("DBManager.js")("DB");
var K = require("KBManager.js");

한글공백 = String.fromCharCode(12644);
숫자공백 = String.fromCharCode(8199);
투명공백 = String.fromCharCode(8237);

/**
 * Hangul.js
 * https://github.com/e-/Hangul.js
 *
 * Copyright 2017, Jaemin Jo
 * under the MIT license.
 */
tajaRoom = []
function() {
  "use strict";
  var CHO = [
      "ㄱ",
      "ㄲ",
      "ㄴ",
      "ㄷ",
      "ㄸ",
      "ㄹ",
      "ㅁ",
      "ㅂ",
      "ㅃ",
      "ㅅ",
      "ㅆ",
      "ㅇ",
      "ㅈ",
      "ㅉ",
      "ㅊ",
      "ㅋ",
      "ㅌ",
      "ㅍ",
      "ㅎ"
    ],
    JUNG = [
      "ㅏ",
      "ㅐ",
      "ㅑ",
      "ㅒ",
      "ㅓ",
      "ㅔ",
      "ㅕ",
      "ㅖ",
      "ㅗ",
      ["ㅗ", "ㅏ"],
      ["ㅗ", "ㅐ"],
      ["ㅗ", "ㅣ"],
      "ㅛ",
      "ㅜ",
      ["ㅜ", "ㅓ"],
      ["ㅜ", "ㅔ"],
      ["ㅜ", "ㅣ"],
      "ㅠ",
      "ㅡ",
      ["ㅡ", "ㅣ"],
      "ㅣ"
    ],
    JONG = [
      "",
      "ㄱ",
      "ㄲ",
      ["ㄱ", "ㅅ"],
      "ㄴ",
      ["ㄴ", "ㅈ"],
      ["ㄴ", "ㅎ"],
      "ㄷ",
      "ㄹ",
      ["ㄹ", "ㄱ"],
      ["ㄹ", "ㅁ"],
      ["ㄹ", "ㅂ"],
      ["ㄹ", "ㅅ"],
      ["ㄹ", "ㅌ"],
      ["ㄹ", "ㅍ"],
      ["ㄹ", "ㅎ"],
      "ㅁ",
      "ㅂ",
      ["ㅂ", "ㅅ"],
      "ㅅ",
      "ㅆ",
      "ㅇ",
      "ㅈ",
      "ㅊ",
      "ㅋ",
      "ㅌ",
      "ㅍ",
      "ㅎ"
    ],
    HANGUL_OFFSET = 0xac00,
    CONSONANTS = [
      "ㄱ",
      "ㄲ",
      "ㄳ",
      "ㄴ",
      "ㄵ",
      "ㄶ",
      "ㄷ",
      "ㄸ",
      "ㄹ",
      "ㄺ",
      "ㄻ",
      "ㄼ",
      "ㄽ",
      "ㄾ",
      "ㄿ",
      "ㅀ",
      "ㅁ",
      "ㅂ",
      "ㅃ",
      "ㅄ",
      "ㅅ",
      "ㅆ",
      "ㅇ",
      "ㅈ",
      "ㅉ",
      "ㅊ",
      "ㅋ",
      "ㅌ",
      "ㅍ",
      "ㅎ"
    ],
    COMPLETE_CHO = [
      "ㄱ",
      "ㄲ",
      "ㄴ",
      "ㄷ",
      "ㄸ",
      "ㄹ",
      "ㅁ",
      "ㅂ",
      "ㅃ",
      "ㅅ",
      "ㅆ",
      "ㅇ",
      "ㅈ",
      "ㅉ",
      "ㅊ",
      "ㅋ",
      "ㅌ",
      "ㅍ",
      "ㅎ"
    ],
    COMPLETE_JUNG = [
      "ㅏ",
      "ㅐ",
      "ㅑ",
      "ㅒ",
      "ㅓ",
      "ㅔ",
      "ㅕ",
      "ㅖ",
      "ㅗ",
      "ㅘ",
      "ㅙ",
      "ㅚ",
      "ㅛ",
      "ㅜ",
      "ㅝ",
      "ㅞ",
      "ㅟ",
      "ㅠ",
      "ㅡ",
      "ㅢ",
      "ㅣ"
    ],
    COMPLETE_JONG = [
      "",
      "ㄱ",
      "ㄲ",
      "ㄳ",
      "ㄴ",
      "ㄵ",
      "ㄶ",
      "ㄷ",
      "ㄹ",
      "ㄺ",
      "ㄻ",
      "ㄼ",
      "ㄽ",
      "ㄾ",
      "ㄿ",
      "ㅀ",
      "ㅁ",
      "ㅂ",
      "ㅄ",
      "ㅅ",
      "ㅆ",
      "ㅇ",
      "ㅈ",
      "ㅊ",
      "ㅋ",
      "ㅌ",
      "ㅍ",
      "ㅎ"
    ],
    COMPLEX_CONSONANTS = [
      ["ㄱ", "ㅅ", "ㄳ"],
      ["ㄴ", "ㅈ", "ㄵ"],
      ["ㄴ", "ㅎ", "ㄶ"],
      ["ㄹ", "ㄱ", "ㄺ"],
      ["ㄹ", "ㅁ", "ㄻ"],
      ["ㄹ", "ㅂ", "ㄼ"],
      ["ㄹ", "ㅅ", "ㄽ"],
      ["ㄹ", "ㅌ", "ㄾ"],
      ["ㄹ", "ㅍ", "ㄿ"],
      ["ㄹ", "ㅎ", "ㅀ"],
      ["ㅂ", "ㅅ", "ㅄ"]
    ],
    COMPLEX_VOWELS = [
      ["ㅗ", "ㅏ", "ㅘ"],
      ["ㅗ", "ㅐ", "ㅙ"],
      ["ㅗ", "ㅣ", "ㅚ"],
      ["ㅜ", "ㅓ", "ㅝ"],
      ["ㅜ", "ㅔ", "ㅞ"],
      ["ㅜ", "ㅣ", "ㅟ"],
      ["ㅡ", "ㅣ", "ㅢ"]
    ],
    CONSONANTS_HASH,
    CHO_HASH,
    JUNG_HASH,
    JONG_HASH,
    COMPLEX_CONSONANTS_HASH,
    COMPLEX_VOWELS_HASH;

  function _makeHash(array) {
    var length = array.length,
      hash = { 0: 0 };
    for (var i = 0; i < length; i++) {
      if (array[i]) hash[array[i].charCodeAt(0)] = i;
    }
    return hash;
  }

  CONSONANTS_HASH = _makeHash(CONSONANTS);
  CHO_HASH = _makeHash(COMPLETE_CHO);
  JUNG_HASH = _makeHash(COMPLETE_JUNG);
  JONG_HASH = _makeHash(COMPLETE_JONG);

  function _makeComplexHash(array) {
    var length = array.length,
      hash = {},
      code1,
      code2;
    for (var i = 0; i < length; i++) {
      code1 = array[i][0].charCodeAt(0);
      code2 = array[i][1].charCodeAt(0);
      if (typeof hash[code1] === "undefined") {
        hash[code1] = {};
      }
      hash[code1][code2] = array[i][2].charCodeAt(0);
    }
    return hash;
  }

  COMPLEX_CONSONANTS_HASH = _makeComplexHash(COMPLEX_CONSONANTS);
  COMPLEX_VOWELS_HASH = _makeComplexHash(COMPLEX_VOWELS);

  function _isConsonant(c) {
    return typeof CONSONANTS_HASH[c] !== "undefined";
  }

  function _isCho(c) {
    return typeof CHO_HASH[c] !== "undefined";
  }

  function _isJung(c) {
    return typeof JUNG_HASH[c] !== "undefined";
  }

  function _isJong(c) {
    return typeof JONG_HASH[c] !== "undefined";
  }

  function _isHangul(c /* code number */) {
    return 0xac00 <= c && c <= 0xd7a3;
  }

  function _isJungJoinable(a, b) {
    return COMPLEX_VOWELS_HASH[a] && COMPLEX_VOWELS_HASH[a][b]
      ? COMPLEX_VOWELS_HASH[a][b]
      : false;
  }

  function _isJongJoinable(a, b) {
    return COMPLEX_CONSONANTS_HASH[a] && COMPLEX_CONSONANTS_HASH[a][b]
      ? COMPLEX_CONSONANTS_HASH[a][b]
      : false;
  }

  var disassemble = function(string, grouped) {
    if (string === null) {
      throw new Error("Arguments cannot be null");
    }

    if (typeof string === "object") {
      string = string.join("");
    }

    var result = [],
      length = string.length,
      cho,
      jung,
      jong,
      code,
      r;

    for (var i = 0; i < length; i++) {
      var temp = [];

      code = string.charCodeAt(i);
      if (_isHangul(code)) {
        // 완성된 한글이면
        code -= HANGUL_OFFSET;
        jong = code % 28;
        jung = ((code - jong) / 28) % 21;
        cho = parseInt((code - jong) / 28 / 21);
        temp.push(CHO[cho]);
        if (typeof JUNG[jung] === "object") {
          temp = temp.concat(JUNG[jung]);
        } else {
          temp.push(JUNG[jung]);
        }
        if (jong > 0) {
          if (typeof JONG[jong] === "object") {
            temp = temp.concat(JONG[jong]);
          } else {
            temp.push(JONG[jong]);
          }
        }
      } else if (_isConsonant(code)) {
        //자음이면
        if (_isCho(code)) {
          r = CHO[CHO_HASH[code]];
        } else {
          r = JONG[JONG_HASH[code]];
        }
        if (typeof r === "string") {
          temp.push(r);
        } else {
          temp = temp.concat(r);
        }
      } else if (_isJung(code)) {
        r = JUNG[JUNG_HASH[code]];
        if (typeof r === "string") {
          temp.push(r);
        } else {
          temp = temp.concat(r);
        }
      } else {
        temp.push(string.charAt(i));
      }

      if (grouped) result.push(temp);
      else result = result.concat(temp);
    }

    return result;
  };

  var disassembleToString = function(str) {
    if (typeof str !== "string") {
      return "";
    }
    str = disassemble(str);
    return str.join("");
  };

  var assemble = function(array) {
    if (typeof array === "string") {
      array = disassemble(array);
    }

    var result = [],
      length = array.length,
      code,
      stage = 0,
      complete_index = -1, //완성된 곳의 인덱스
      previous_code;

    function _makeHangul(index) {
      // complete_index + 1부터 index까지를 greedy하게 한글로 만든다.
      var code,
        cho,
        jung1,
        jung2,
        jong1 = 0,
        jong2,
        hangul = "";
      if (complete_index + 1 > index) {
        return;
      }
      for (var step = 1; ; step++) {
        if (step === 1) {
          cho = array[complete_index + step].charCodeAt(0);
          if (_isJung(cho)) {
            // 첫번째 것이 모음이면 1) ㅏ같은 경우이거나 2) ㅙ같은 경우이다
            if (
              complete_index + step + 1 <= index &&
              _isJung((jung1 = array[complete_index + step + 1].charCodeAt(0)))
            ) {
              //다음것이 있고 모음이면
              result.push(String.fromCharCode(_isJungJoinable(cho, jung1)));
              complete_index = index;
              return;
            } else {
              result.push(array[complete_index + step]);
              complete_index = index;
              return;
            }
          } else if (!_isCho(cho)) {
            result.push(array[complete_index + step]);
            complete_index = index;
            return;
          }
          hangul = array[complete_index + step];
        } else if (step === 2) {
          jung1 = array[complete_index + step].charCodeAt(0);
          if (_isCho(jung1)) {
            //두번째 또 자음이 오면 ㄳ 에서 ㅅ같은 경우이다
            cho = _isJongJoinable(cho, jung1);
            hangul = String.fromCharCode(cho);
            result.push(hangul);
            complete_index = index;
            return;
          } else {
            hangul = String.fromCharCode(
              (CHO_HASH[cho] * 21 + JUNG_HASH[jung1]) * 28 + HANGUL_OFFSET
            );
          }
        } else if (step === 3) {
          jung2 = array[complete_index + step].charCodeAt(0);
          if (_isJungJoinable(jung1, jung2)) {
            jung1 = _isJungJoinable(jung1, jung2);
          } else {
            jong1 = jung2;
          }
          hangul = String.fromCharCode(
            (CHO_HASH[cho] * 21 + JUNG_HASH[jung1]) * 28 +
              JONG_HASH[jong1] +
              HANGUL_OFFSET
          );
        } else if (step === 4) {
          jong2 = array[complete_index + step].charCodeAt(0);
          if (_isJongJoinable(jong1, jong2)) {
            jong1 = _isJongJoinable(jong1, jong2);
          } else {
            jong1 = jong2;
          }
          hangul = String.fromCharCode(
            (CHO_HASH[cho] * 21 + JUNG_HASH[jung1]) * 28 +
              JONG_HASH[jong1] +
              HANGUL_OFFSET
          );
        } else if (step === 5) {
          jong2 = array[complete_index + step].charCodeAt(0);
          jong1 = _isJongJoinable(jong1, jong2);
          hangul = String.fromCharCode(
            (CHO_HASH[cho] * 21 + JUNG_HASH[jung1]) * 28 +
              JONG_HASH[jong1] +
              HANGUL_OFFSET
          );
        }

        if (complete_index + step >= index) {
          result.push(hangul);
          complete_index = index;
          return;
        }
      }
    }

    for (var i = 0; i < length; i++) {
      code = array[i].charCodeAt(0);
      if (!_isCho(code) && !_isJung(code) && !_isJong(code)) {
        //초, 중, 종성 다 아니면
        _makeHangul(i - 1);
        _makeHangul(i);
        stage = 0;
        continue;
      }
      //console.log(stage, array[i]);
      if (stage === 0) {
        // 초성이 올 차례
        if (_isCho(code)) {
          // 초성이 오면 아무 문제 없다.
          stage = 1;
        } else if (_isJung(code)) {
          // 중성이오면 ㅐ 또는 ㅘ 인것이다. 바로 구분을 못한다. 따라서 특수한 stage인 stage4로 이동
          stage = 4;
        }
      } else if (stage == 1) {
        //중성이 올 차례
        if (_isJung(code)) {
          //중성이 오면 문제없음 진행.
          stage = 2;
        } else {
          //아니고 자음이오면 ㄻ같은 경우가 있고 ㄹㅋ같은 경우가 있다.
          if (_isJongJoinable(previous_code, code)) {
            // 합쳐질 수 있다면 ㄻ 같은 경우인데 이 뒤에 모음이 와서 ㄹ마 가 될수도 있고 초성이 올 수도 있다. 따라서 섣불리 완성할 수 없다. 이땐 stage5로 간다.
            stage = 5;
          } else {
            //합쳐질 수 없다면 앞 글자 완성 후 여전히 중성이 올 차례
            _makeHangul(i - 1);
          }
        }
      } else if (stage == 2) {
        //종성이 올 차례
        if (_isJong(code)) {
          //종성이 오면 다음엔 자음 또는 모음이 온다.
          stage = 3;
        } else if (_isJung(code)) {
          //그런데 중성이 오면 앞의 모음과 합칠 수 있는지 본다.
          if (_isJungJoinable(previous_code, code)) {
            //합칠 수 있으면 여전히 종성이 올 차례고 그대로 진행
          } else {
            // 합칠 수 없다면 오타가 생긴 경우
            _makeHangul(i - 1);
            stage = 4;
          }
        } else {
          // 받침이 안되는 자음이 오면 ㄸ 같은 이전까지 완성하고 다시시작
          _makeHangul(i - 1);
          stage = 1;
        }
      } else if (stage == 3) {
        // 종성이 하나 온 상태.
        if (_isJong(code)) {
          // 또 종성이면 합칠수 있는지 본다.
          if (_isJongJoinable(previous_code, code)) {
            //합칠 수 있으면 계속 진행. 왜냐하면 이번에 온 자음이 다음 글자의 초성이 될 수도 있기 때문
          } else {
            //없으면 한글자 완성
            _makeHangul(i - 1);
            stage = 1; // 이 종성이 초성이 되고 중성부터 시작
          }
        } else if (_isCho(code)) {
          // 초성이면 한글자 완성.
          _makeHangul(i - 1);
          stage = 1; //이 글자가 초성이되므로 중성부터 시작
        } else if (_isJung(code)) {
          // 중성이면 이전 종성은 이 중성과 합쳐지고 앞 글자는 받침이 없다.
          _makeHangul(i - 2);
          stage = 2;
        }
      } else if (stage == 4) {
        // 중성이 하나 온 상태
        if (_isJung(code)) {
          //중성이 온 경우
          if (_isJungJoinable(previous_code, code)) {
            //이전 중성과 합쳐질 수 있는 경우
            _makeHangul(i);
            stage = 0;
          } else {
            //중성이 왔지만 못합치는 경우. ㅒㅗ 같은
            _makeHangul(i - 1);
          }
        } else {
          // 아니면 자음이 온 경우.
          _makeHangul(i - 1);
          stage = 1;
        }
      } else if (stage == 5) {
        // 초성이 연속해서 두개 온 상태 ㄺ
        if (_isJung(code)) {
          //이번에 중성이면 ㄹ가
          _makeHangul(i - 2);
          stage = 2;
        } else {
          _makeHangul(i - 1);
          stage = 1;
        }
      }
      previous_code = code;
    }
    _makeHangul(i - 1);
    return result.join("");
  };

  var search = function(a, b) {
    var ad = disassemble(a).join(""),
      bd = disassemble(b).join("");
    return ad.indexOf(bd);
  };

  var rangeSearch = function(haystack, needle) {
    var hex = disassemble(haystack).join(""),
      nex = disassemble(needle).join(""),
      grouped = disassemble(haystack, true),
      re = new RegExp(nex, "gi"),
      indices = [],
      result;

    if (!needle.length) return [];

    while ((result = re.exec(hex))) {
      indices.push(result.index);
    }

    function findStart(index) {
      for (var i = 0, length = 0; i < grouped.length; ++i) {
        length += grouped[i].length;
        if (index < length) return i;
      }
    }

    function findEnd(index) {
      for (var i = 0, length = 0; i < grouped.length; ++i) {
        length += grouped[i].length;
        if (index + nex.length <= length) return i;
      }
    }

    return indices.map(function(i) {
      return [findStart(i), findEnd(i)];
    });
  };

  function Searcher(string) {
    this.string = string;
    this.disassembled = disassemble(string).join("");
  }

  Searcher.prototype.search = function(string) {
    return disassemble(string)
      .join("")
      .indexOf(this.disassembled);
  };

  var endsWithConsonant = function(string) {
    if (typeof string === "object") {
      string = string.join("");
    }

    var code = string.charCodeAt(string.length - 1);

    if (_isHangul(code)) {
      // 완성된 한글이면
      code -= HANGUL_OFFSET;
      var jong = code % 28;
      if (jong > 0) {
        return true;
      }
    } else if (_isConsonant(code)) {
      //자음이면
      return true;
    }
    return false;
  };

  var hangul = {
    disassemble: disassemble,
    d: disassemble, // alias for disassemble
    disassembleToString: disassembleToString,
    ds: disassembleToString, // alias for disassembleToString
    assemble: assemble,
    a: assemble, // alias for assemble
    search: search,
    rangeSearch: rangeSearch,
    Searcher: Searcher,
    endsWithConsonant: endsWithConsonant,
    isHangul: function(c) {
      if (typeof c === "string") c = c.charCodeAt(0);
      return _isHangul(c);
    },
    isComplete: function(c) {
      if (typeof c === "string") c = c.charCodeAt(0);
      return _isHangul(c);
    },
    isConsonant: function(c) {
      if (typeof c === "string") c = c.charCodeAt(0);
      return _isConsonant(c);
    },
    isVowel: function(c) {
      if (typeof c === "string") c = c.charCodeAt(0);
      return _isJung(c);
    },
    isCho: function(c) {
      if (typeof c === "string") c = c.charCodeAt(0);
      return _isCho(c);
    },
    isJong: function(c) {
      if (typeof c === "string") c = c.charCodeAt(0);
      return _isJong(c);
    },
    isHangulAll: function(str) {
      if (typeof str !== "string") return false;
      for (var i = 0; i < str.length; i++) {
        if (!_isHangul(str.charCodeAt(i))) return false;
      }
      return true;
    },
    isCompleteAll: function(str) {
      if (typeof str !== "string") return false;
      for (var i = 0; i < str.length; i++) {
        if (!_isHangul(str.charCodeAt(i))) return false;
      }
      return true;
    },
    isConsonantAll: function(str) {
      if (typeof str !== "string") return false;
      for (var i = 0; i < str.length; i++) {
        if (!_isConsonant(str.charCodeAt(i))) return false;
      }
      return true;
    },
    isVowelAll: function(str) {
      if (typeof str !== "string") return false;
      for (var i = 0; i < str.length; i++) {
        if (!_isJung(str.charCodeAt(i))) return false;
      }
      return true;
    },
    isChoAll: function(str) {
      if (typeof str !== "string") return false;
      for (var i = 0; i < str.length; i++) {
        if (!_isCho(str.charCodeAt(i))) return false;
      }
      return true;
    },
    isJongAll: function(str) {
      if (typeof str !== "string") return false;
      for (var i = 0; i < str.length; i++) {
        if (!_isJong(str.charCodeAt(i))) return false;
      }
      return true;
    }
  };

  if (typeof define == "function" && define.amd) {
    define(function() {
      return hangul;
    });
  } else if (typeof module !== "undefined") {
    module.exports = hangul;
  }
};

function readFile(file) {
	var filedir = new java.io.File("/sdcard/kbot/"+  file);
	try {
		var br = new java.io.BufferedReader(new java.io.FileReader(filedir));
		var readStr = "";
		var str = null;
		while (((str = br.readLine()) != null)) {
			readStr += str + "\n";
		}
		br.close();
		return readStr.trim();
	} catch (e) {
		return e;
	}
}

function Taja(room) {
  var list = readFile("s.txt").split("\n");
  this.test = list[Math.floor(Math.random() * list.length)];
  var tasu = d(this.test).length;
  var time = 0.5 * tasu;
  var minus = room == "시갤톡방" ? 1.4 : 1.4;

  function chg(str) {
    return (
      String.fromCharCode(8237) +
      str.replace(" ", " ").replace(" ", " ") +
      String.fromCharCode(8237)
    );
  }

  function start() {
    Api.replyRoom(room, "타자대결을 시작합니다.\n3");
    java.lang.Thread.sleep(1000);
    Api.replyRoom(room, "2");
    java.lang.Thread.sleep(1000);
    Api.replyRoom(room, "1");
    java.lang.Thread.sleep(1000);
    Api.replyRoom(room, chg(this.test) + "\n(제한시간 " + time + "초)");
    var past = new Date();
    var winner = monitor(
      room,
      "",
      v => {
        return Boolean(v.m == this.test);
      },
      v => {
        return v.s;
      },
      time
    );
    if (winner == -1) {
      Api.replyRoom(room, "시간초과!");
      tajaRoom.splice(tajaRoom.indexOf(room), 1);
      return;
    }
    var fin = (new Date() - past) / 1000 - minus;
    var vel = java.lang.String.format("%.2f", (60 * tasu) / fin);
    Api.replyRoom(
      room,
      winner +
        "의 승리!\n총글자수:" +
        tasu +
        "\n걸린시간:" +
        fin.toFixed(3) +
        "\n타자속도:분당 " +
        vel +
        "타"
    );
    tajaRoom.splice(tajaRoom.indexOf(room), 1);
    return;
  }
  this.start = start;
}

function response(room, msg, sender, isGroupChat, replier, imageDB) {
  /** @param {String} room - 방 이름
   * @param {String} msg - 메세지 내용
   * @param {String} sender - 발신자 이름
   * @param {Boolean} isGroupChat - 단체채팅 여부
   * @param {Object} replier - 세션 캐싱 답장 메소드 객체
   * @param {Object} imageDB - 프로필 이미지와 수신된 이미지 캐싱 객체
   * @method imageDB.getImage() - 수신된 이미지가 있을 경우 Base64 인코딩 되어있는 JPEG 이미지 반환, 기본 값 null
   * @method imageDB.getProfileImage() - Base64 인코딩 되어있는 JPEG 프로필 이미지 반환, 기본 값 null
   * @method replier.reply("문자열") - 메시지가 도착한 방에 답장을 보내는 메소드 */
  var r = {
    replier: replier,
    msg: msg,
    sender: sender,
    room: room,
    reply: function(str) {
      this.replier.reply(
        String(str)
          .trim()
          .encoding()
      );
    }
  };
  if (1) {
    if (1) {
      saveChats(r);
    }
    if (msg == "^로딩") {
      reload(r);
      return;
    }
  }
  if (r.msg == "어흥") {
    r.replier.reply("애옹애옹");
  } else if (r.msg == "애옹") {
    r.replier.reply("어흐으응");
  }
  if (r.msg.indexOf("/한일") != -1) {
    한일(r.msg.substring(4));
  }
  if (msg == "!타자대결") {
    tajaRoom.push(room);
    var taja = new Taja(room);
    taja.start();
  }
  if (r.msg.indexOf("/날씨") != -1) {
    weather(r.msg.substring(4));
  }
  if (msg[0] === "^" && room === "시립대 봇제작방") {
    try {
      replier.reply(
        String(eval(msg.substring(1)))
          .trim()
          .encoding()
      );
    } catch (e) {
      replier.reply(e);
    }
  }
  if (msg === "/기상") {
    r.replier.reply(
      org.jsoup.Jsoup.connect(
        "https://weather.naver.com/photo/satPhoto.nhn?photoType=IR&photoRgn=R"
      )
        .get()
        .select("#satPhotoImage")
        .attr("src")
    );
  }
  if (msg === "/태풍") {
    r.replier.reply(
      org.jsoup.Jsoup.connect(
        "https://search.naver.com/search.naver?sm=top_hty&fbm=0&ie=utf8&query=%ED%83%9C%ED%92%8D"
      )
        .get()
        .select("#etcinfo_typhoon > div.map_dzst > a > img")
        .attr("src")
    );
  }
  if (msg === "/채팅분석") {
    if (room === "시립대 단톡방") {
      var messages = D.selectForArray(
        "Chats",
        "chat",
        "room is ?",
        "시립대 단톡방"
      ).join(",");
      var messages2 = messages.replace(
        /[\{\}\[\]\/?.;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g,
        ""
      );

      r.replier.reply(
        org.jsoup.Jsoup.connect("http://wagle.dlinkddns.com:5000/foo")
          .requestBody(messages2)
          .ignoreContentType(true)
          .timeout(30000)
          .post()
          .text()
      );
    }
    if (room === "고딩") {
      var messages = D.selectForArray(
        "Chats",
        "chat",
        "room is ?",
        "고딩"
      ).join(",");
      var messages2 = messages.replace(
        /[\{\}\[\]\/?.;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g,
        ""
      );

      r.replier.reply(
        org.jsoup.Jsoup.connect("http://wagle.dlinkddns.com:5000/foo")
          .requestBody(messages2)
          .ignoreContentType(true)
          .post()
          .text()
      );
    }
    if (room === "시립대 봇제작방") {
      var messages = D.selectForArray(
        "Chats",
        "chat",
        "room is ?",
        "시립대 봇제작방"
      ).join(",");
      var messages2 = messages.replace(
        /[\{\}\[\]\/?.;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g,
        ""
      );

      r.replier.reply(
        org.jsoup.Jsoup.connect("http://wagle.dlinkddns.com:5000/foo")
          .requestBody(messages2)
          .ignoreContentType(true)
          .post()
          .text()
      );
    }
    if (room === "시립대 전전컴 톡방") {
      var messages = D.selectForArray(
        "Chats",
        "chat",
        "room is ?",
        "시립대 전전컴 톡방"
      ).join(",");
      var messages2 = messages.replace(
        /[\{\}\[\]\/?.;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g,
        ""
      );

      r.replier.reply(
        org.jsoup.Jsoup.connect("http://wagle.dlinkddns.com:5000/foo")
          .requestBody(messages2)
          .ignoreContentType(true)
          .post()
          .text()
      );
    }
    if (room === "회기광장") {
      var messages = D.selectForArray(
        "Chats",
        "chat",
        "room is ?",
        "회기광장"
      ).join(",");
      var messages2 = messages.replace(
        /[\{\}\[\]\/?.;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g,
        ""
      );

      r.replier.reply(
        org.jsoup.Jsoup.connect("http://wagle.dlinkddns.com:5000/foo")
          .requestBody(messages2)
          .ignoreContentType(true)
          .post()
          .text()
      );
    }
    if (room === "국민대 잡담방") {
      var messages = D.selectForArray(
        "Chats",
        "chat",
        "room is ?",
        "국민대 잡담방"
      ).join(",");
      var messages2 = messages.replace(
        /[\{\}\[\]\/?.;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g,
        ""
      );

      r.replier.reply(
        org.jsoup.Jsoup.connect("http://wagle.dlinkddns.com:5000/foo")
          .requestBody(messages2)
          .ignoreContentType(true)
          .post()
          .text()
      );
    }
    if (room === "대학교") {
      var messages = D.selectForArray(
        "Chats",
        "chat",
        "room is ?",
        "대학교"
      ).join(",");
      var messages2 = messages.replace(
        /[\{\}\[\]\/?.;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g,
        ""
      );
    }
    r.replier.reply(
      org.jsoup.Jsoup.connect("http://wagle.dlinkddns.com:5000/foo")
        .requestBody(messages2)
        .ignoreContentType(true)
        .post()
        .text()
    );
  }
}

function weather(loc) {
  const geo = getLoc(loc);
  const currentWeather = JSON.parse(
    org.jsoup.Jsoup.connect(
      "http://api.openweathermap.org/data/2.5/weather?lat=" +
        geo.lat +
        "&lon=" +
        geo.lng +
        "&APPID=29651a70baa0ef6b0d27750f1581ad8a&units=metric"
    )
      .ignoreContentType(true)
      .get()
      .text()
  );

  const main = currentWeather.weather[0].main;
  const temp = currentWeather.main.temp;
  const temp_min = currentWeather.main.temp_min;
  const temp_max = currentWeather.main.temp_max;
  const clouds = currentWeather.clouds.all;
  const forecast = JSON.parse(
    org.jsoup.Jsoup.connect(
      "http://api.openweathermap.org/data/2.5/forecast?lat=" +
        geo.lat +
        "&lon=" +
        geo.lng +
        "&APPID=29651a70baa0ef6b0d27750f1581ad8a&units=metric"
    )
      .ignoreContentType(true)
      .get()
      .text()
  );
  const forecast2 = forecast.list
    .map(
      v =>
        new Date("T" + v.dt_txt.split(" ")[1]).getHours() +
        "시 " +
        Math.round(v.main.temp) +
        "℃ " +
        v.weather[0].main
    )
    .join("\n");
  r.replier.reply(
    loc +
      " 날씨\n" +
      main +
      "  /   기온 : " +
      Math.round(temp) +
      "℃\n최저 : " +
      Math.round(temp_min) +
      "℃ 최고 : " +
      Math.round(temp_max) +
      "℃\n" +
      "--------------------\n" +
      forecast2
        .split("\n")
        .slice(0, 7)
        .join("\n")
  );
}

function getLoc(loc) {
  return JSON.parse(
    org.jsoup.Jsoup.connect(
      encodeURI(
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
          loc +
          "&language=ko&key=AIzaSyAfu7q_gMnCG3XGAl4dithaqcW-xmwIKhw"
      )
    )
      .ignoreContentType(true)
      .get()
      .text()
  ).results[0].geometry.location;
}

function replaceAll(str, searchStr, replaceStr) {
  return str.split(searchStr).join(replaceStr);
}

function saveChats(r) {
  D.insert("Chats", {
    room: r.room,
    date: new Date(),
    user: r.sender,
    chat: r.msg
  });
}

function 번역다운(txt) {
  return org.jsoup.Jsoup.connect(
    "http://wagle.dlinkddns.com:5000/text/" + encodeURI(txt)
  )
    .get()
    .text();
}

function 한일(txt) {
  const text = txt;
  r.replier.reply(
    한일1(text) +
      "\n\n" +
      일한1(한일1(text)) +
      "\n\n" +
      한일1(일한1(한일1(text))) +
      "\n" +
      번역다운(한일1(text))
  );
}

function 한일1(txt) {
  const apiURL = "https://openapi.naver.com/v1/papago/n2mt";
  const text = txt;
  const userAgent =
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.21 (KHTML, like Gecko) Chrome/19.1.1042.0 Safari/535.21";
  return JSON.parse(
    org.jsoup.Jsoup.connect(apiURL)
      .header("X-Naver-Client-Id", "p3HqeWKxZLXiX9QKSN0m")
      .header("X-Naver-Client-Secret", "OmKzleb4Cd")
      .data({ source: "ko", target: "ja", text: text })
      .ignoreHttpErrors(true)
      .followRedirects(true)
      .ignoreContentType(true)
      .post()
      .select("body")
      .text()
  ).message.result.translatedText;
}

function 일한1(txt) {
  const apiURL = "https://openapi.naver.com/v1/papago/n2mt";
  const text = txt;
  const userAgent =
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.21 (KHTML, like Gecko) Chrome/19.0.1042.0 Safari/535.21";
  return JSON.parse(
    org.jsoup.Jsoup.connect(apiURL)
      .header("X-Naver-Client-Id", "p3HqeWKxZLXiX9QKSN0m")
      .header("X-Naver-Client-Secret", "OmKzleb4Cd")
      .data({ source: "ja", target: "ko", text: text })
      .ignoreHttpErrors(true)
      .followRedirects(true)
      .ignoreContentType(true)
      .post()
      .select("body")
      .text()
  ).message.result.translatedText;
}

fileName = () => new Date().getTime().toString();

function save(text) {
  const file = "storage/emulated/0/kbot/" + fileName() + ".txt";
  const filedir = new java.io.File(file);
  var bw = new java.io.BufferedWriter(new java.io.FileWriter(filedir));
  bw.write(text);
  bw.close();
  return 0;
}

function reload(r) {
  if (r.sender == "잠만보") {
    reloadcheck = 1;
    var Timer = new Date();
    file = "storage/emulated/0/kbot/response.js";
    checksum = org.jsoup.Jsoup.connect(
      "https://github.com/wagle2/sleepy/commits/master"
    )
      .get()
      .select("div.repository-content>a")
      .attr("href")
      .split("commit/")[1];
    conn = new java.net.URL(
      "https://raw.githubusercontent.com/wagle2/sleepy/" +
        checksum +
        "/response.js"
    ).openConnection();
    br = new java.io.BufferedReader(
      new java.io.InputStreamReader(conn.getInputStream())
    );
    str = "";
    tmp = null;
    while ((tmp = br.readLine()) != null) {
      str += tmp + "\n";
    }
    var filedir = new java.io.File(file);
    var bw = new java.io.BufferedWriter(new java.io.FileWriter(filedir));
    bw.write(str.toString());
    bw.close();
    var time = (new Date() - Timer) / 1000;
    r.replier.reply("파일저장 완료 / " + time + "s\n" + new Date());
    Api.reload();
    var time = (new Date() - Timer) / 1000;
    reloadcheck = 0;
    r.replier.reply("reloading 완료 / " + time + "s\n" + new Date());
  }
}

String.prototype.encoding = function() {
  return this.replace(/\\u([\da-fA-F]{4})/g, (m, p1) =>
    String.fromCharCode(parseInt(p1, 16))
  );
};

Object.defineProperty(Object.prototype.__proto__, "prop", {
  get: function() {
    return Object.getOwnPropertyNames(this);
  }
});
Object.defineProperty(Object.prototype.__proto__, "prop2", {
  get: function() {
    var self = this;
    return Object.getOwnPropertyNames(this)
      .map(v => v + " : " + self[v])
      .join("\n");
  }
});

//이 아래 6가지 메소드는 스크립트 액티비티에서 사용하는 메소드들
function onCreate(savedInstanceState, activity) {}
function onStart(activity) {}
function onResume(activity) {}
function onPause(activity) {}
function onStop(activity) {}
function onDestroy(activity) {}
