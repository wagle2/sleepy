var T = require("ThreadManager.js");
var I = require("Interactive.js");
var D = require("DBManager.js")("DB");
var K = require("KBManager.js");

한글공백 = String.fromCharCode(12644);
숫자공백 = String.fromCharCode(8199);
투명공백 = String.fromCharCode(8237);
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
  I.run(room, sender, msg);
  //인터렉티브 적용

  cut = String.fromCharCode(8237).repeat(500);
  var r = { replier: replier, msg: msg, sender: sender, room: room };

if (room == "test" || room == "시립대 봇제작방") {
			if (msg.indexOf("]") == 0) {
				replier.reply(eval(msg.substring(1)));
			}

function 한일(r) {
  const text = r.msg.split(" ")[1];
  r.replier.reply(
    한일1(text) +
      "\n\n" +
      일한1(한일1(text)) +
      "\n\n" +
      한일1(일한1(한일1(text)))
  );
}

function 한일1(r) {
  const apiURL = "https://openapi.naver.com/v1/papago/n2mt";
  const text = r;
  const userAgent =
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.21 (KHTML, like Gecko) Chrome/19.0.1042.0 Safari/535.21";
  return JSON.parse(
    org.jsoup.Jsoup.connect(apiURL)
      .userAgent(userAgent)
      .header("X-Naver-Client-Id", "ra4TWI7i1c4UkntvakEg")
      .header("X-Naver-Client-Secret", "OnUVOoJMYp")
      .data({ source: "ko", target: "ja", text: text })
      .ignoreHttpErrors(true)
      .followRedirects(true)
      .ignoreContentType(true)
      .post()
      .select("body")
      .text()
  ).message.result.translatedText;
}

function 일한1(r) {
  const apiURL = "https://openapi.naver.com/v1/papago/n2mt";
  const text = r;
  const userAgent =
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.21 (KHTML, like Gecko) Chrome/19.0.1042.0 Safari/535.21";
  return JSON.parse(
    org.jsoup.Jsoup.connect(apiURL)
      .userAgent(userAgent)
      .header("X-Naver-Client-Id", "ra4TWI7i1c4UkntvakEg")
      .header("X-Naver-Client-Secret", "OnUVOoJMYp")
      .data({ source: "ja", target: "ko", text: text })
      .ignoreHttpErrors(true)
      .followRedirects(true)
      .ignoreContentType(true)
      .post()
      .select("body")
      .text()
  ).message.result.translatedText;
}

percent = function(r) {
  r.replier.reply(
    r.msg + "은 " + Math.floor(Math.random() * 100) + "% 입니다."
  );
};




String.prototype.cut = function(line) {
  var str = this.toString();
  str = str.split("\n");
  str[line - 1] += String.fromCharCode(8237).repeat(500);
  str = str.join("\n");
  return str;
};

Object.defineProperty(String.prototype, "XMLEncode", {
  value: function() {
    var res = "";
    for (var i = 0; i < this.toString().length; i++) {
      res +=
        "&#x" +
        java.lang.String.format(
          "%04x",
          java.lang.Integer(this.toString().charCodeAt(i))
        ) +
        ";";
    }
    return res;
  }
});


function reload(r) {
  if (r.sender == "잠만보" || r.sender == "정인" || r.sender == "승현") {
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
    T.interruptAll();
    r.replier.reply("파일저장 완료 / " + time + "s\n" + new Date());
    Api.reload();
    var time = (new Date() - Timer) / 1000;
    reloadcheck = 0;
    r.replier.reply("reloading 완료 / " + time + "s\n" + new Date());
  }
}

File = {
  JSONread: function(path) {
    return JSON.parse(this.read(path));
  },

  read: function(path) {
    //read file data from path and return it (str)
    var filedir = new java.io.File(path);
    try {
      var br = new java.io.BufferedReader(new java.io.FileReader(filedir));
      var readStr = "";
      var str = null;
      while ((str = br.readLine()) != null) {
        readStr += str + "\n";
      }
      br.close();
      return readStr.trim();
    } catch (e) {
      return e;
    }
  },

  save: function(path, str) {
    //get file data from 'str' and save it to 'path'
    var filedir = new java.io.File(path);
    new java.io.File(filedir.getParent()).mkdirs();
    try {
      var bw = new java.io.BufferedWriter(new java.io.FileWriter(filedir));
      bw.write(str.toString());
      bw.close();
    } catch (e) {
      return e;
    }
  }
};

String.prototype.extension = function(char, length) {
  const addLength =
    length - this.toString().length >= 0 ? length - this.toString().length : 0;
  return char.repeat(addLength) + this.toString();
};
String.prototype.extensionRight = function(char, length) {
  const addLength =
    length - this.toString().length >= 0 ? length - this.toString().length : 0;
  return this.toString() + char.repeat(addLength);
};

Object.defineProperty(String.prototype, "encoding", {
  value: function() {
    return this.replace(/\\u([\da-fA-F]{4})/g, (m, p1) =>
      String.fromCharCode(parseInt(p1, 16))
    );
  }
});

// Date.prototype
Object.defineProperty(Date.prototype, "toDateString", {
  value: function(sep) {
    sep = sep == undefined ? "-" : sep;
    return (
      String(this.getFullYear()).extension("0", 4) +
      sep +
      String(this.getMonth() + 1).extension("0", 2) +
      sep +
      String(this.getDate()).extension("0", 2)
    );
  }
});
Object.defineProperty(Date.prototype, "toTimeString", {
  value: function(sep) {
    sep = sep == undefined ? ":" : sep;
    return (
      String(this.getHours()).extension("0", 2) +
      sep +
      String(this.getMinutes()).extension("0", 2) +
      sep +
      String(this.getSeconds()).extension("0", 2)
    );
  }
});
Object.defineProperty(String.prototype, "받침", {
  value: function() {
    var lastCharCode = this.toString().charCodeAt(this.toString().length - 1);
    if (
      lastCharCode >= "가".charCodeAt(0) &&
      lastCharCode <= "힣".charCodeAt(0)
    ) {
      if ((lastCharCode - "가".charCodeAt(0)) % 28 == 0) return false;
      else return true;
    } else return false;
  }
});
Object.defineProperty(String.prototype, "이가", {
  value: function() {
    return this.toString().받침()
      ? this.toString() + "이"
      : this.toString() + "가";
  }
});

//이 아래 6가지 메소드는 스크립트 액티비티에서 사용하는 메소드들
function onCreate(savedInstanceState, activity) {}
function onStart(activity) {}
function onResume(activity) {}
function onPause(activity) {}
function onStop(activity) {}
function onDestroy(activity) {}
