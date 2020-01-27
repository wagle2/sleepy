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
//=============
function setDB(key,value){
	if(D.selectForArray("mTable", null, "k like ?", key).length == 0){ // 해당하는 key에 value가 없는 경우
		D.insert("mTable",{k:key, v:value})
	}
	else{ // 해당하는 key에 value가 있는 경우
		D.update("mTable", {v:value}, "k=?", [key])
	}
}



function getDB(key){
	var arr = D.selectForArray("mTable", null, "k=?", [key]);
	if (arr.length > 0) {
		return arr[0][1];
	} else {
		return undefined;
	}
}

function getNum(key) {
	var value = getDB(key);
	return isNaN(value) ? 0 : Number(getDB(key));
}

clock = new java.lang.Thread(new java.lang.Runnable(){
	run:function(){
		switcher = 1
		var is_printed = false
		try{
			setDB("Thread_Num",getNum("Thread_Num")+1)
			Api.replyRoom("봇개발","clock 스레드실행")
			while(1){
				if(switcher == 0){
					break
				}
				/*
				try{ // clock_minute 꺼졌을시 재시동
					if(clock_minute.isAlive()==false && updateStart==0 ){
						clock_minute.start()
						Api.replyRoom("봇개발","clock_minute 스레드 재시동")
					}
				}
				catch(e){
					Api.replyRoom("봇개발","clock-1 error\n"+e + "\n" + e.stack + "\n"+e.rhinoException);
				}
				try{ // clock_3minute 꺼졌을시 재시동
					if(clock_3minute.isAlive()==false && updateStart==0 ){
						clock_3minute.start()
						Api.replyRoom("봇개발","clock_3minute 스레드 재시동")
					}
				}
				catch(e){
					Api.replyRoom("봇개발","clock-2 error\n"+e + "\n" + e.stack + "\n"+e.rhinoException);
				}
				*/
				java.lang.Thread.sleep(1000) //1sec
			}
		}catch(e){
			Api.replyRoom("봇개발","clock error\n"+e + "\n" + e.stack + "\n"+e.rhinoException);
		}
		finally{
			Api.replyRoom("봇개발","clock 스레드종료")
		}
	}
}, "kbot_thread_clock");

clock_minute = new java.lang.Thread(new java.lang.Runnable(){
	run:function(){
		switcher_minute = 1
		var is_printed = false
		try{
			Api.replyRoom("봇개발","clock_minute 스레드실행")
			while(1){
				if(switcher == 0){
					break
				}

				/*
				var date = new Date();
				try{
					if(date.getMinutes()==0){
						clearHourDB() // 시간
					}
				}
				catch(e){
					Api.replyRoom("봇개발","clock_minute-2 error\n"+e + "\n" + e.stack + "\n"+e.rhinoException+"\n\nMessage start\n"+e.message+"Message end");
				}
				try{
					if(date.getMinutes()==0&&date.getHours()==0){
						//Api.replyRoom("시갤톡방","지난 1일동안 톡방 전체 채팅량 : "+sumDB("시갤톡방","day")+"회")
						//Api.replyRoom("시갤톡방","지난 1일동안 최고의 TMI : "+getDB("DB시갤톡방_"+searchMaxDB("시갤톡방","day").split("||")[0]).split("||")[1]+" ("+searchMaxDB("시갤톡방","day").split("||")[1]+"회)")
						clearDayDB() // 일DB
					}
				}
				catch(e){
					Api.replyRoom("봇개발","clock_minute-3 error\n"+e + "\n" + e.stack + "\n"+e.rhinoException+"\n\nMessage start\n"+e.message+"Message end");
				}
				*/
				/*
				try{
					if((date.getHours()==16&&date.getDay()!=6&&date.getDay()!=0&&date.getMinutes()>50)||(date.getHours()==17&&date.getMinutes()<40)){
						dream_status = "selfStudy";
					}
					else if((date.getHours()>8&&date.getDay()!=6&&date.getDay()!=0&&date.getHours()<16)||(date.getHours()==16&&date.getMinutes()<50)){
						dream_status = "Study";
					}
					else{
						dream_status = "normal";
					}
				}
				catch(e){
					Api.replyRoom("봇개발","clock_minute-4 error\n"+e + "\n" + e.stack + "\n"+e.rhinoException+"\n\nMessage start\n"+e.message+"Message end");
				}
				*/


				//===============================================================================================

				/*
				try{ // clock 꺼졌을시 재시동
					if(clock.isAlive()==false && updateStart==0 ){
						clock.run()
					}
				}
				catch(e){
					Api.replyRoom("봇개발","clock_minute-1 error\n"+e + "\n" + e.stack + "\n"+e.rhinoException+"\n\nMessage start\n"+e.message+"Message end");
				}
				*/

				//===============================================================================================
				/*
				try{
					java.lang.Thread.sleep(600000) //1sec
					UOS_Time_DB_update("2019","A10","U")
					//Api.replyRoom("봇개발","UOSP3작동")
				}catch(e){
					Api.replyRoom("봇개발","2019 prasing error\n"+e + "\n" + e.stack + "\n" + e.rhinoException + "\n" + e.lineNumber);
					java.lang.Thread.sleep(15000) //1sec
				}
				*/


				/*
				try{
					java.lang.Thread.sleep(5000) //1sec
					sugang()
					//Api.replyRoom("봇개발","UOSP1작동")
				}catch(e){
					Api.replyRoom("봇개발","sugang error\n"+e + "\n" + e.stack + "\n" + e.rhinoException + "\n" + e.lineNumber);
					java.lang.Thread.sleep(15000) //1sec
				}
				*/



				//java.lang.Thread.sleep(60000) //1sec
			}
		}catch(e){
			Api.replyRoom("봇개발","clock_minute error\n"+e + "\n" + e.stack + "\n"+e.rhinoException+"\n\nMessage start\n"+e.message+"Message end");
		}

		finally{
			Api.replyRoom("봇개발","clock_minute 스레드종료")
		}
	}
}, "kbot_thread_clock_minute");

clock_3minute = new java.lang.Thread(new java.lang.Runnable(){
	run:function(){
		switcher_3minute = 1
		try{
			setDB("Thread_Num",getNum("Thread_Num")+1)
			Api.replyRoom("봇개발","clock_3minute 스레드실행")
			while(1){
				if(switcher == 0){
					break
				}
				try{
					java.lang.Thread.sleep(30000) //1sec
					UOSP1()
					//Api.replyRoom("봇개발","UOSP1작동\n"+make_time())
				}catch(e){
					Api.replyRoom("봇개발","UOSP1 error\n"+e + "\n" + e.stack + "\n" + e.rhinoException + "\n" + e.lineNumber);
					java.lang.Thread.sleep(15000) //1sec
				}
				try{
					java.lang.Thread.sleep(30000) //1sec
					UOSP2() // 전전컴공지
					//Api.replyRoom("봇개발","UOSP2작동\n"+make_time())
				}catch(e){
					Api.replyRoom("봇개발","UOSP2 error\n"+e + "\n" + e.stack + "\n" + e.rhinoException + "\n" + e.lineNumber);
					java.lang.Thread.sleep(15000) //1sec
				}
				try{
					java.lang.Thread.sleep(30000) //1sec
					UOSP3()
					//Api.replyRoom("봇개발","UOSP3작동\n"+make_time())

				}catch(e){
					Api.replyRoom("봇개발","UOSP3 error\n"+e + "\n" + e.stack + "\n" + e.rhinoException + "\n" + e.lineNumber);
					java.lang.Thread.sleep(15000) //1sec
				}
				try{
					java.lang.Thread.sleep(30000) //1sec
					UOSP4()
					//Api.replyRoom("봇개발","UOSP4작동\n"+make_time())

				}catch(e){
					Api.replyRoom("봇개발","UOSP4 error\n"+e + "\n" + e.stack + "\n" + e.rhinoException + "\n" + e.lineNumber);
					java.lang.Thread.sleep(15000) //1sec
				}
				try{
					java.lang.Thread.sleep(30000) //1sec
					UOSP5()
					//Api.replyRoom("봇개발","UOSP4작동\n"+make_time())

				}catch(e){
					Api.replyRoom("봇개발","UOSP5 error\n"+e + "\n" + e.stack + "\n" + e.rhinoException + "\n" + e.lineNumber);
					java.lang.Thread.sleep(15000) //1sec
				}
				try{
					java.lang.Thread.sleep(30000) //1sec
					UOSPKY()
					//Api.replyRoom("봇개발","UOSP4작동\n"+make_time())

				}catch(e){
					Api.replyRoom("봇개발","UOSPKY error\n"+e + "\n" + e.stack + "\n" + e.rhinoException + "\n" + e.lineNumber);
					java.lang.Thread.sleep(15000) //1sec
				}
				/*
                                try{
                                    java.lang.Thread.sleep(45000) //1sec
                                    UOS_Time_DB_update("2019","A10","U")
                                    //Api.replyRoom("봇개발","UOSP3작동")
                                }catch(e){
                                    Api.replyRoom("봇개발","2019 prasing error\n"+e + "\n" + e.stack + "\n" + e.rhinoException + "\n" + e.lineNumber);
                                    java.lang.Thread.sleep(15000) //1sec
                                }
                                try{
                                    java.lang.Thread.sleep(45000) //1sec
                                    UOS_Time_DB_update("2019","A10")
                                    //Api.replyRoom("봇개발","UOSP3작동")
                                }catch(e){
                                    Api.replyRoom("봇개발","2019 prasing error\n"+e + "\n" + e.stack + "\n" + e.rhinoException + "\n" + e.lineNumber);
                                    java.lang.Thread.sleep(15000) //1sec
                                }
                */
				/*
				try{
					java.lang.Thread.sleep(45000) //1sec
					//Api.replyRoom("봇개발","DCP작동시작")
					DCP()
					//Api.replyRoom("봇개발","DCP작동완료")
				}catch(e){
					Api.replyRoom("봇개발","DCP error\n"+e + "\n" + e.stack + "\n" + e.rhinoException + "\n" + e.lineNumber);
					java.lang.Thread.sleep(45000) //1sec
				}
				*/

				//try{
				//java.lang.Thread.sleep(45000) //1sec
				//parsingSG()
				//}
				//catch(e){
				//Api.replyRoom("봇개발","parsingSG error\n"+e + "\n" + e.stack);
				//}
			}
		}catch(e){
			Api.replyRoom("봇개발","clock_3minute error\n"+e + "\n" + e.stack + "\n"+e.rhinoException);
			java.lang.Thread.sleep(5000) //1sec
		}
		finally{
			Api.replyRoom("봇개발","clock_3minute 스레드종료")
		}
	}
}, "kbot_thread_clock_3minute");

DCPT = new java.lang.Thread(new java.lang.Runnable(){
	run:function(){
		try{
			Api.replyRoom("봇개발","DCPT 스레드실행")
			while(1){
				if(switcher == 0){
					break
				}
				try{
					java.lang.Thread.sleep(100000) //1sec
					//Api.replyRoom("봇개발","DCP작동시작")
					DCP()
					//Api.replyRoom("봇개발","DCP작동완료")
				}catch(e){
					Api.replyRoom("봇개발","DCP error\n"+e + "\n" + e.stack + "\n" + e.rhinoException + "\n" + e.lineNumber);
					java.lang.Thread.sleep(100000) //1sec

				}
			}
		}catch(e){
			Api.replyRoom("봇개발","DCPT error\n"+e + "\n" + e.stack + "\n"+e.rhinoException);
			java.lang.Thread.sleep(5000) //1sec
		}
		finally{
			Api.replyRoom("봇개발","DCPT 스레드종료")
		}
	}
}, "DCPT");



function response(room, msg, sender, isGroupChat, replier, imageDB) {
  clock.start();
  clock_minute.start();
  clock_3minute.start();
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
    },
    intervalReply: function(tag, msg, interval) {
      var lastTime = getNum("__intervalReply__" + tag);
      var currentTime = new Date().valueOf();
      if (lastTime == 0 || currentTime - lastTime >= interval * 1000) {
        this.reply(msg);
        setDB("__intervalReply__" + tag, currentTime);
        return true;
      } else {
        return false;
      }
    },
    replyRoom: function(room, str) {
      var replier;
      if ((replier = ObjKeep.get("replier." + room)) != null) {
        ObjKeep.get("replier." + room).reply(
          new String(str).encoding().rmspace()
        );
        return true;
      } else return false;
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

  var q = new java.util.concurrent.LinkedBlockingQueue();
  AnswerSet.put(q, q); //대기 큐에 추가
  var thr = new java.lang.Thread(
    new java.lang.Runnable(function() {
      try {
        while (true) {
          var tmp = q.take(); //메세지 큐 소비
          Api.replyRoom(room, tmp);
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

function setTimeout(callback,args,time){
	new java.lang.Thread(new java.lang.Runnable(function(){
		java.lang.Thread.sleep(time)
		callback.apply(null,args)
	})).start()
}

function delayReply(room,msg,time) {
	java.lang.Thread.sleep(time)
	Api.replyRoom(room,msg)
}


//이 아래 6가지 메소드는 스크립트 액티비티에서 사용하는 메소드들
function onCreate(savedInstanceState, activity) {}
function onStart(activity) {}
function onResume(activity) {}
function onPause(activity) {}
function onStop(activity) {}
function onDestroy(activity) {}
