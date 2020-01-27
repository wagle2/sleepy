var T = require("ThreadManager.js");
var I = require("Interactive.js");
var D = require("DBManager.js")("DB");
var K = require("KBManager.js");
var H = require("Hangul.js");
한글공백 = String.fromCharCode(12644);
숫자공백 = String.fromCharCode(8199);
투명공백 = String.fromCharCode(8237);
Minigame = require("Minigame.js");
AnswerSet = new java.util.concurrent.ConcurrentHashMap();

omokRoom = [];
tajaRoom = [];
//============================================================================================================================

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
    m: msg,
    msg: msg,
    s: sender,
    sender: sender,
    r: room,
    room: room,
    g: isGroupChat,
    i: imageDB,
    imageDB: imageDB,
    reply: function(str) {
      this.replier.reply(new String(str).encoding().rmspace());
    }
  };

  if (msg == "^로딩") {
    reload(r);
    return;
  }
  if (msg == "!타자대결") {
    tajaRoom.push(room);
    var taja = new Minigame.Taja(room);
    taja.start();
  }
}
function monitor(room, sender, checkFunc, extractFunc, time) {
  var returner = "";
  Api.replyRoom(room, "ㅇㅇㅇ.\n3");
  var q = new java.util.concurrent.LinkedBlockingQueue();
  AnswerSet.put(q, q); //대기 큐에 추가
  var thr = new java.lang.Thread(
    new java.lang.Runnable(function() {
      try {
        while (true) {
          var tmp = q.take(); //메세지 큐 소비
          if (
            (room == "" || tmp.room == room) &&
            (sender == "" || tmp.s == sender) &&
            checkFunc(tmp)
          ) {
            //조건충족시
            //Api.replyRoom(room,"감지")
            AnswerSet.remove(q); //대기큐에서 삭제
            returner = extractFunc(tmp);
            return;
          }
        }
      } catch (e) {
        //Api.replyRoom(room,"timeout");
        AnswerSet.remove(q); //대기큐에서 삭제
        returner = -1;
      }
    })
  );
  thr.start();
  new java.lang.Thread(
    new java.lang.Runnable(function() {
      java.lang.Thread.sleep(time * 1000);
      thr.interrupt();
    })
  ).start();
  thr.join();
  return returner;
}

function reload(r) {
  if (r.sender == "정인") {
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

function readFile(file) {
  var filedir = new java.io.File("/sdcard/kbot/" + file);
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
}

//이 아래 6가지 메소드는 스크립트 액티비티에서 사용하는 메소드들
function onCreate(savedInstanceState, activity) {}
function onStart(activity) {}
function onResume(activity) {}
function onPause(activity) {}
function onStop(activity) {}
function onDestroy(activity) {}
