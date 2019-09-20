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
  r = { replier: replier, msg: msg, sender: sender, room: room };

  
  if (1) {
      if(1){
        saveChats(r);
      }
    if (msg == "^로딩") {
      reload(r);
      return;
    }
  }
  if(msg =="/채팅분석") {
    const messages = D.selectForArray("Chats","chat").join(",");
    const messages2 = messages.replace(/#/g,"")
    r.replier.reply(messages2);
    }
  if (msg == "어흥") {
    r.replier.reply("애옹애옹");
  } else if (msg == "애옹") {
    r.replier.reply("어흐으응");
  }
  if (r.msg.indexOf("/한일") != -1) {
    한일(r.msg.substring(4));
  }
  if (msg[0] === "^" && room === "시립대 봇제작방") {
    try {
        replier.reply(String(eval(msg.substring(1))).trim().encoding());
    } catch (e) {
      replier.reply(e);
    }
  }
}

function replaceAll(str, searchStr, replaceStr) {
    return str.split(searchStr).join(replaceStr);
  }

function saveChats(r){
    if(r.room == "시립대 단톡방"){
        D.insert("Chats",{room:r.room,date:new Date(),user:r.sender,chat:r.msg});
    }
}

function 번역다운(txt) {
  return org.jsoup.Jsoup.connect(
    "http://wagle.dlinkddns.com:5000/text/"+encodeURI(txt)
  )
    .get()
    .text()
}

function 한일(txt) {
  const text = txt;
  r.replier.reply(
    한일1(text) +
      "\n\n" +
      일한1(한일1(text)) +
      "\n\n" +
      한일1(일한1(한일1(text))) + "\n" + 번역다운(한일1(text))
  );
}

function 한일1(txt) {
  const apiURL = "https://openapi.naver.com/v1/papago/n2mt";
  const text = txt;
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

function 일한1(txt) {
  const apiURL = "https://openapi.naver.com/v1/papago/n2mt";
  const text = txt;
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

String.prototype.encoding=function () {
    return this.replace(/\\u([\da-fA-F]{4})/g, (m, p1) => String.fromCharCode(parseInt(p1, 16)));
}

//이 아래 6가지 메소드는 스크립트 액티비티에서 사용하는 메소드들
function onCreate(savedInstanceState, activity) {}
function onStart(activity) {}
function onResume(activity) {}
function onPause(activity) {}
function onStop(activity) {}
function onDestroy(activity) {}
