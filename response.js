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
  const forecast2 = forecast.list.map(v=>"[UTC]"+(/ (\d\d)/.exec(v.dt_txt)[1])+"시 "+Math.round(v.main.temp)+"℃ "+v.weather[0].main).join("\n")
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
      "--------------------\n" + forecast2.split("\n").slice(0,7).join("\n")
      
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
