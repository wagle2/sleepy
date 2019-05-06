var T = require("ThreadManager.js");
var I = require("Interactive.js");
var D = require("DBManager.js");
var K = require("KBManager.js");

한글공백 = String.fromCharCode(12644);
숫자공백 = String.fromCharCode(8199);
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


        cut = String.fromCharCode(8237).repeat(500)  
        var r = { replier: replier, msg: msg, sender: sender, room: room};



        try {
            bis = 광주버스정류장불러오기(r);
            bisLength = bis.length;
            if (room == 'test' || room == '시립대 봇제작방' || room == '고딩' || room == '정인'|| room == '카톡봇 개발') {
                if(msg =="!로딩" ){
                    reload(r);
                    return;
                }else if (msg.indexOf("*") == 0) {
                    replier.reply(eval(msg.substring(1)));
                    return;	
                }
            } 
        }catch (e) {
                replier.reply( e + "\n" + e.stack);
        }
        if(msg == "어흥"){
            r.replier.reply("애옹애옹");
        } else if(msg == "애옹"){
            r.replier.reply("어흐으응");
        }

        if (room == '고딩' || room == '정인' || room == '시립대 봇제작방' || room == '카톡봇 개발'|| room == '시립대 단톡방') {
            고딩방(r);
        }

}
cmd = function (ss) {
    var p = java.lang.Runtime.getRuntime().exec('su -c ""'+ss+'""');
    p.waitFor();
    var r = p.getInputStream() || p.getErrorStream();
    return isread(r);
}


isread=function (is) {
        var br = new java.io.BufferedReader(new java.io.InputStreamReader(is));
        var readStr = "";
        var str = null;
        while (((str = br.readLine()) != null)) {
            readStr += str + "\n";
        }
        br.close();
        return readStr.trim();


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
    } else if(r.msg.indexOf("#버스")!=-1){
        광주버스(r);
    } else if(r.msg.indexOf("!정류장다운로드")!=-1){
        광주버스정류장받아오기(r);
    } else if(r.msg.indexOf("@날씨")!=-1){
        weather.func(r);
    } else if(r.msg.indexOf("#날씨")!=-1){
        weather_test.func(r);
    }
}


function 광주버스(r){
    I.register("busSelect"+r.sender,r.room,r.sender,function(input){
        info = 광주버스정류장이름찾기(r);
            var busstopInfo = new Object();
            /* 
             *   busstopInfo.Id = "";
             *   busstopInfo.Name0 = "";
             *   busstopInfo.NEXT_BUSSTOP0 = "";
             *   busstopInfo.Name1 = "";
             *   busstopInfo.NEXT_BUSSTOP1 = "";
             *   busstopInfo.length = 0;
             */

        //r.replier.reply(info.length);
        if (info.length == 1){
            r.msg = " "+ info.Name0;
            //r.replier.reply(info.Id+" "+info.NEXT_BUSSTOP0);
            버스현재위치(r,info.Id,info.NEXT_BUSSTOP0);
        } else if(info.length == 2){
            r.replier.reply("조회하실 방향을 선택해주세요.");
            msg=input.getMsg();
            if(msg == "1"){
                r.msg = " "+ info.Name0;
                버스현재위치(r,info.Id,info.NEXT_BUSSTOP0);
            } else if(msg == "2"){
                r.msg = " "+ info.Name1;
                버스현재위치(r,info.Id,info.NEXT_BUSSTOP1);
            } else{
                r.replier("제대로 입력해주세요.");
            }
        }
    })
}

function 광주버스정류장불러오기(r){
    bis = File.JSONread("/sdcard/test.json")
    return bis
}
function 버스현재위치(r,busStopName,next_busStopName){
    busstopId = r.msg.split(" ")[1];
    busstopInfo = org.jsoup.Jsoup.connect("http://api.gwangju.go.kr/json/arriveInfo?ServiceKey=BknKnKlcOt5e3xllE%2Fboca5kw2Dzmqwm2lNf7XEmAporlHM7JPggxLbS8GgtoSO6%2FcLjBJKOgOMSH6Bmt4EUlw%3D%3D&serviceKey=&BUSSTOP_ID="+busstopId).get()
    busstopInfoJson = JSON.parse(busstopInfo.select("body").text());
    result=busStopName +
    　　"⇒"+next_busStopName+"\n------------------------------------\n"
    busNum = busstopInfoJson.BUSSTOP_LIST.length;
    for(i=0;i<busNum;i++){
        result += (busstopInfoJson.BUSSTOP_LIST[i].LINE_NAME.toString() + "  ("+ busstopInfoJson.BUSSTOP_LIST[i].REMAIN_MIN.toString() + "분) (" + busstopInfoJson.BUSSTOP_LIST[i].BUSSTOP_NAME.toString()  + ")\n")
    }
    r.replier.reply(result.trim());
    //trim은 문자의 양끝 공백 제거
}


function 광주버스정류장받아오기(r){
    var url = "http://api.gwangju.go.kr/json/stationInfo?ServiceKey=BknKnKlcOt5e3xllE%2Fboca5kw2Dzmqwm2lNf7XEmAporlHM7JPggxLbS8GgtoSO6%2FcLjBJKOgOMSH6Bmt4EUlw%3D%3D&serviceKey="
    var busstopName = org.jsoup.Jsoup.connect(url).get()
    var bis = JSON.parse(busstopName.select("body").text()).STATION_LIST;
    File.save("/sdcard/test.json",JSON.stringify(bis));
    r.replier.reply("버스정류장 로딩완료!")
    //STATION_NUM,BUSSTOP_NAME,ARS_ID,NEXT_BUSSTOP,BUSSTOP_ID,LONGITUDE,NAME_E,LATITUDE
}

function 광주버스정류장이름찾기(r){
    var busstopInfo = new Object();
    busstopInfo.Id = "";
    busstopInfo.Name0 = "";
    busstopInfo.NEXT_BUSSTOP0 = "";
    busstopInfo.Name1 = "";
    busstopInfo.NEXT_BUSSTOP1 = "";
    busstopInfo.length = 0;

    try{
        busstopInfo.Id = r.msg.split(" ")[1];
        if(busstopInfo.Id=="일사"){busstopInfo.Id = "일곡사거리"};
        if(busstopInfo.Id=="북경"){busstopInfo.Id = "북부경찰서"};
        if(busstopInfo.Id=="삼호"){busstopInfo.Id = "일곡삼호아파트"};
        if(busstopInfo.Id=="삼익"){busstopInfo.Id = "매곡삼익아파트"};
        if(busstopInfo.Id=="김머중"||busstopInfo.Id=="김대중"||busstopInfo.Id=="머중이"){busstopInfo.Id = "김대중컨벤션센터"};

        busstopInfo.length = bis.filter(v=>v.BUSSTOP_NAME==busstopInfo.Id).length;
        
        if (busstopInfo.length == 1){
            busstopInfo.Name0 = bis.filter(v=>v.BUSSTOP_NAME==busstopInfo.Id)[0].BUSSTOP_ID;
            busstopInfo.NEXT_BUSSTOP0 = bis.filter(v=>v.BUSSTOP_NAME==busstopInfo.Id)[0].NEXT_BUSSTOP;
        }else if(busstopInfo.length ==2){
            busstopInfo.Name0 = bis.filter(v=>v.BUSSTOP_NAME==busstopInfo.Id)[0].BUSSTOP_ID;
            busstopInfo.NEXT_BUSSTOP0 = bis.filter(v=>v.BUSSTOP_NAME==busstopInfo.Id)[0].NEXT_BUSSTOP;
            busstopInfo.Name1 = bis.filter(v=>v.BUSSTOP_NAME==busstopInfo.Id)[1].BUSSTOP_ID;
            busstopInfo.NEXT_BUSSTOP1 = bis.filter(v=>v.BUSSTOP_NAME==busstopInfo.Id)[1].NEXT_BUSSTOP;
        }

        //include를 사용해도 됨  v.includes("석산") 이런식으로
  
        if(busstopInfo.length == 1){
            test="          [버스정보알림]\n------------------------------------\n"
            r.replier.reply("["+busstopInfo.Id+"]\n[1] "+ busstopInfo.NEXT_BUSSTOP0 +"방향 : " + busstopInfo.Name0);
            return busstopInfo;
        }else if(busstopInfo.length == 2){
            r.replier.reply("["+busstopInfo.Id+"]\n[1] "+ busstopInfo.NEXT_BUSSTOP0 +"방향 : " + busstopInfo.Name0 + "\n[2] " + busstopInfo.NEXT_BUSSTOP1 +"방향 : " + busstopInfo.Name1);
            return busstopInfo;
        }
        else{
            r.replier.reply("정류장명을 다시 확인해주세요zzZ");
            return busstopInfo;
        }
    } catch (e) {
        r.replier.reply("정류장명을 다시 확인해주세요zzZ\n"+e);
    }
        //r.replier.reply("["+busstopId+"]\n"+ next_busstopName0 +"방향 : " + busstopName0);
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
 
 File = {

    JSONread : function(path){
        return JSON.parse(this.read(path));
        },

    read: function (path) {
        //read file data from path and return it (str)
        var filedir = new java.io.File(path);
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
    },

    save: function (path, str) {
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

weather_test = {

    baseUrl : "",
    baseSoup : "",
    resultStr : "",

    func : function(r){ // 구동부
        if(r.msg.length == 3){
            r.replier.reply("#날씨 기능 사용법");
        } else {
            var area = r.msg.substr(4,r.msg.length);
            baseUrl = "https://m.search.naver.com/search.naver?query=" + area + " 날씨";
            baseSoup = org.jsoup.Jsoup.connect(baseUrl).get();
            r.replier.reply(this.parse(baseSoup));
        }
    },

    isWeather : function(){ // 날씨 파트가 존재하는지 확인하는 함수
        doc = baseSoup.select("#ct > section.sc.cs_weather_main._cs_weather_main > div.api_more_wrap > a").text();
        return (doc.length() > 0 ? true : false); 
    },

    parse : function(baseSoup){ // 파싱
        if(this.isWeather()==false){ return "날씨 검색 실패" } // 날씨 파트가 존재하지 않으면
        else {  // 날씨 파트가 존재하면
            var weatherUrl = baseSoup.select("#ct > section.sc.cs_weather_main._cs_weather_main > div.api_more_wrap > a").attr("href")
            var weatherSoup = org.jsoup.Jsoup.connect(weatherUrl).get();
            var location = weatherSoup.select("#content > div > div > div.section_top > div.section_location > a.title._cnLnbLinktoMap > strong").text();
            var nowWeather = (String(weatherSoup.select("div > div:nth-child(1) > div > div.card.card_now > div.weather_set_summary")).split("<br>")[0].split('<div class="weather_set_summary">')[1].split("</div>")[0]).trim().replace(" ","").extensionRight(한글공백,5);
            var nowTemp = weatherSoup.select("div > div:nth-child(1) > div > div.card.card_now > div.weather_set > div.set.set_text > strong > em").text();
            var nowTime = weatherSoup.select("div > div:nth-child(1) > div > div.card.card_now > span").text()
            var todayLowTemp = weatherSoup.select("div > div:nth-child(1) > div > div.card.card_now > div.weather_set > div.set.set_text > div > span.day_low > em").text()
            var todayHighTemp = weatherSoup.select("div > div:nth-child(1) > div > div.card.card_now > div.weather_set > div.set.set_text > div > span.day_high > em").text()
            

            var times = weatherSoup.select("div > div > div.card.card_graph > div.graph_content > div > div > table > tbody > tr:nth-child(7)").text().split(" ")
            var todaysWeather = (String(weatherSoup.select("div > div > div.card.card_graph > div.graph_content > div > div > table > tbody > tr:nth-child(2) div")).split("\n"));
            var todaysTemp = weatherSoup.select("div > div > div.card.card_graph > div._cnWtrHourlyChartData > div:nth-child(1)").text().split(",")
            var todaysRain = weatherSoup.select("div > div > div.card.card_graph > div._cnWtrHourlyChartData > div:nth-child(2)").text().split(",")
            var todaysWind = weatherSoup.select("div > div > div.card.card_graph > div._cnWtrHourlyChartData > div:nth-child(3)").text().split(",")
            var todaysReh = weatherSoup.select("div > div > div.card.card_graph > div._cnWtrHourlyChartData > div:nth-child(4)").text().split(",")

            this.resultStr = "";
            this.resultStr += "(해)" + location + "\n　→ " 
                            + nowTime + "\n------------------------------------\n"
                            + "날씨　　　기온 습도 최저 최고\n" ;
            for (i in times){
                this.resultStr += times[i]+ "　"
                                + todaysWeather[3*i+1] + "　"
                                + todaysTemp[i]+ "　"
                                + todaysRain[i]+ "　"
                                + todaysWind[i] + "　"
                                + todaysReh[i]+"\n" 
            }
            return this.resultStr;
        }
    },
}

weather = {
    func : function (r){
        if(r.msg.length==3){
            r.replier.reply("@날씨 기능 사용법")
        } else{
            var inputString = r.msg.split(" ")[1];
            if (inputString=="쿠팡머"||inputString=="쿠팡대"||inputString=="시립머"||inputString=="시립대"||inputString=="서울시립대"){inputString=1123056000}
            else if (inputString=="전남머"||inputString=="전남대"||inputString=="용봉동"||inputString=="전머"||inputString=="용봉"){inputString=2917059000}
            else if (inputString=="일곡동"||inputString=="일곡"||inputString=="일곡지구"){inputString=2917066900}
            else if (inputString=="상무지구"||inputString=="상무"||inputString=="머창"){inputString=2914074500}
            else if (inputString=="조선대학교"||inputString=="조선대"||inputString=="조대"||inputString=="조머"){inputString=2911063000}
            else{
                r.replier.reply("날씨 리스트에 존재하지 않는 지역입니다.");
                return;
            }
            r.replier.reply(this.parse(inputString));
        }
        
    },

    parse : function (areaCode){
        var baseLink = "http://www.kma.go.kr/wid/queryDFSRSS.jsp?zone=" + areaCode;
        var baseParse = org.jsoup.Jsoup.connect(baseLink).get();
        var area = String(baseParse.select("category").text());
        var time = String(baseParse.select("pubData").text()).replace(/[()]/g, '');
        var baseTodayWeather = baseParse.select('data').toArray()//.filter(v=>v.select("day").text() == "0" )
        //오늘인것들만 추출
        var str = '시　　날씨　기온 강수 습도 풍량\n';
        for(var i in baseTodayWeather){
            var repeatStr = baseTodayWeather[i];
            str += String(repeatStr.select("hour").text()).extension("0",2) + "　";
            str += String(repeatStr.select("wfKor").text()).replace(/\s/g,"").extensionRight(한글공백,5);
            str += String(repeatStr.select("temp").text()).slice(0,-2).extension("0",2)+ "　";
            str += String(repeatStr.select("pop").text()).extensionRight(" ",2) + "　";
            str += String(repeatStr.select("reh").text()) + "　";
            str += repeatStr.select("ws").text().substring(0,3)+"\n";
        }
        str = str.trim()
        return str;
    }
}

String.prototype.extension=function(char,length){
	const addLength = (length-this.toString().length >= 0) ? length-this.toString().length : 0; 
	return char.repeat(addLength)+this.toString();
}
String.prototype.extensionRight=function(char,length){
	const addLength = (length-this.toString().length >= 0) ? length-this.toString().length : 0; 
	return this.toString()+char.repeat(addLength);
}

Object.defineProperty(String.prototype,"encoding",{
    value:function(){
          return this.replace(/\\u([\da-fA-F]{4})/g,(m,p1)=>String.fromCharCode(parseInt(p1,16)));
    }
 });


//이 아래 6가지 메소드는 스크립트 액티비티에서 사용하는 메소드들
function onCreate(savedInstanceState, activity) {}
function onStart(activity) {}
function onResume(activity) {}
function onPause(activity) {}
function onStop(activity) {}
function onDestroy(activity) {}
