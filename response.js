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



    cut = String.fromCharCode(8237).repeat(500)  
    r = { replier: replier, msg: msg, sender: sender, room: room};

    if(msg.indexOf("/버스")!=-1){
        광주버스(r);

        
    if (room == 'test' || room == '시립대 봇제작방' || room == '고딩' || room == '정인') {
        if(msg =="!로딩" ){
            reload(r);
            return;
        }
    }
    if(msg == "어흥"){
        r.replier.reply("애옹애옹");
    } else if(msg == "애옹"){
        r.replier.reply("어흐으응");
    }

    if (room == '고딩' || room == '정인') {
        고딩방(r);
    }
}
Flag=(function(){
    var list={};
    var Flag={};
    Flag.set=function(flag,room,value){
       if(list[flag]===undefined){ 
          list[flag]={};
          list[flag][room]=value;
       }else list[flag][room]=value;
    }
    Flag.get=function(flag,room){
       return (list[flag] && list[flag][room]) || 0;
    }
    return Flag;
 })();

function 고딩방(r) {
    if(r.msg == "송재형"){
        r.replier.reply("인간조무사");
    } else if(r.msg == "양대훈"){
        r.replier.reply("20cm & 휴지심") ;       
    } else if(r.msg == "고건훈"){
        r.replier.reply("유흥중입니다.");
    } else if(r.msg == "이명훈"){
        r.replier.reply("기아수저");
    } else if(r.msg == "박경관"){
        r.replier.reply("보험계리사");  
    } else if(r.msg == "천승현"){
        r.replier.reply("자발적 모쏠8000일");
    } else if(r.msg.indexOf("/버스")!=-1){
        광주버스(r);
        //notice(r);
    }
}

function 광주버스(r){
    busstopId = r.msg.split(" ")[1];
    busstopInfo = org.jsoup.Jsoup.connect("http://api.gwangju.go.kr/json/arriveInfo?ServiceKey=BknKnKlcOt5e3xllE%2Fboca5kw2Dzmqwm2lNf7XEmAporlHM7JPggxLbS8GgtoSO6%2FcLjBJKOgOMSH6Bmt4EUlw%3D%3D&serviceKey=&BUSSTOP_ID="+busstopId).get()

    r.replier.reply(busstopId+"번 정류장 버스 정보\n"+busstopInfo);

}

 function reload(r) {
    if(r.sender=='잠만보'|| r.sender=='정인' || r.sender=='승현'){
        reloadcheck = 1;
        var Timer = new Date();
        file = "storage/emulated/0/kbot/response.js";
        checksum = org.jsoup.Jsoup.connect("https://github.com/wagle2/sleepy/commits/master").get().select("div.repository-content>a").attr("href").split('commit/')[1];
        conn = new java.net.URL("https://raw.githubusercontent.com/wagle2/sleepy/"+checksum+"/response.js").openConnection();
        br = new java.io.BufferedReader(new java.io.InputStreamReader(conn.getInputStream()));
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
        r.replier.reply("파일저장 완료 / " + time + "s\n" + new Date() );
        Api.reload();
        var time = (new Date() - Timer) / 1000;
        reloadcheck = 0;
        r.replier.reply("reloading 완료 / " + time + "s\n" + new Date());
    }
 }
 
//이 아래 6가지 메소드는 스크립트 액티비티에서 사용하는 메소드들
function onCreate(savedInstanceState, activity) {}
function onStart(activity) {}
function onResume(activity) {}
function onPause(activity) {}
function onStop(activity) {}
function onDestroy(activity) {}
