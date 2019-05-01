module.exports = function DBManagerBuilder(fileName){
   fileName = fileName || "DB";
   const myDB = android.database.sqlite.SQLiteDatabase.openDatabase("/sdcard/kbot/"+fileName, null, android.database.sqlite.SQLiteDatabase.CREATE_IF_NECESSARY);
   const lock = new java.util.concurrent.locks.ReentrantLock();
   
   const FIELD_TYPE_NULL=0;
   const FIELD_TYPE_INTEGER=1;
   const FIELD_TYPE_FLOAT=2;
   const FIELD_TYPE_STRING=3;
   const FIELD_TYPE_BLOB=4;
   
   function makeBackup(src,dst) {
      const date=new Date();
      var is=new java.io.FileInputStream("/sdcard/kbot/DB");
      var os=new java.io.FileOutputStream("/sdcard/kbot/DB"+date.getFullYear()+"_"+(date.getMonth()+1)+"_"+date.getDate()+"_"+date.getHours()+"_"+date.getMinutes()+"_"+date.getSeconds());
      var len=0;
      var buf=java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE,1000)
      try{
         while((len=is.read(buf))!=-1){
            os.write(buf,0,len);
         }
      }catch(e){
         throw e;
      }finally{
         is.close();
         os.close();
      }
   }
   
   //Obj define
   const Obj=function(){};
   Object.defineProperty(Obj.prototype,"toString",{
      value:function(){
         const arr=new Array();
         for(var i in this)
            arr.push(this[i]);
         return arr.join(', ');
      }
   });
   Object.defineProperty(Obj.prototype,"get",{
      value:function(i){
         return this[Object.getOwnPropertyNames(this)[i]];
      }
   });
   function makeContentValues(values){
      const cv = new android.content.ContentValues();
      for(var i in values){
         cv.put(i,String(values[i]));
      }
      return cv;
   }
   function makeArgs(args){
      return (args) ? ((args instanceof Array) ? args : [args]) : null;
   }
   
   //execSQL
   function execSQL(sql,bindArgs){
      try{
         bindArgs = makeArgs(bindArgs);
         lock.lock();
         if(bindArgs==null) myDB.execSQL(sql);
         else myDB.execSQL(sql,bindArgs);
      }catch(e){
         e.message = e.message + "\nexecSQL("+sql+", ["+bindArgs+"]";
         throw e;
      }finally{
         lock.unlock();
      }
      return true;
   }
   execSQL.toString=()=>'DBManager.execSQL(string sql)\nDBManager.execSQL(string sql, string[] bindArgs)\n'
      +'sql을 실행합니다. insert, update, delete, create, alter의 수행에 사용하며 select는 rawQuery를 이용합니다.\n'
      +'sql 문자열에 ? 가 포함되어 있으면 해당 부분은 bindArgs의 값으로 대체됩니다.\n'
      +'수행에 성공할 경우 true를 리턴하며, 실패할 경우 에러 e를 throw합니다.';
   
   //rawQuery      
   function rawQueryForCursor(sql,selectionArgs){
      var res;
      try{
         lock.lock();
         selectionArgs = makeArgs(selectionArgs);
         res = myDB.rawQuery(sql,selectionArgs);
      }catch(e){
         e.message = e.message + "\nrawQuery("+sql+", ["+selectionArgs+"]";
         throw e;
      }finally{
         lock.unlock();
      }
      return res;
   }
   rawQueryForCursor.toString=()=>'DBManager.rawQuery(string sql)\nDBManager.rawQuery(string sql, string[] selectionArgs)\n'
      +'sql을 실행합니다. select의 수행에 사용하며 insert, update, delete, create, alter등은 execSQL을 이용합니다.\n'
      +'sql 문자열에 ? 가 포함되어 있으면 해당 부분은 selectionArgs의 값으로 대체됩니다.\n'
      +'수행에 성공할 경우 cursor를 리턴하며, 실패할 경우 에러 e를 throw합니다.';
   function rawQueryForObject(sql,selectionArgs){
      try{
         return cursorToObject(rawQueryForCursor(sql,selectionArgs));
      }catch(e){throw e;}
   }
   rawQueryForObject.toString=()=>'DBManager.rawQueryForObject(string sql)\nDBManager.rawQueryForObject(string sql, string[] selectionArgs)\n'
      +'sql을 실행합니다. select의 수행에 사용하며 insert, update, delete, create, alter등은 execSQL을 이용합니다.\n'
      +'sql 문자열에 ? 가 포함되어 있으면 해당 부분은 selectionArgs의 값으로 대체됩니다.\n'
      +'수행에 성공할 경우 object로 이루어진 array를 리턴하며, 실패할 경우 에러 e를 throw합니다.';
   function rawQueryForArray(sql,selectionArgs){
      try{
         return cursorToArray(rawQueryForCursor(sql,selectionArgs));
      }catch(e){throw e;}
   }
   rawQueryForArray.toString=()=>'DBManager.rawQueryForArray(string sql)\nDBManager.rawQueryForArray(string sql, string[] selectionArgs)\n'
      +'sql을 실행합니다. select의 수행에 사용하며 insert, update, delete, create, alter등은 execSQL을 이용합니다.\n'
      +'sql 문자열에 ? 가 포함되어 있으면 해당 부분은 selectionArgs의 값으로 대체됩니다.\n'
      +'수행에 성공할 경우 array로 이루어진 array를 리턴하며, 실패할 경우 에러 e를 throw합니다.';
   function rawQueryForString(sql,selectionArgs){
      try{
         return cursorToString(rawQueryForCursor(sql,selectionArgs));
      }catch(e){throw e;}
   }
   rawQueryForString.toString=()=>'DBManager.rawQueryForString(string sql)\nDBManager.rawQueryForString(string sql, string[] selectionArgs)\n'
      +'sql을 실행합니다. select의 수행에 사용하며 insert, update, delete, create, alter등은 execSQL을 이용합니다.\n'
      +'sql 문자열에 ? 가 포함되어 있으면 해당 부분은 selectionArgs의 값으로 대체됩니다.\n'
      +'수행에 성공할 경우 string을 리턴하며, 실패할 경우 에러 e를 throw합니다.';
   
   //insert
   function insert(table, values){
      var res;
      try{
         const cv=makeContentValues(values);
         lock.lock();
         res = myDB.insert(table, null, cv);
      }catch(e){
         e.message = e.message + "\ninsert("+table+", {"+Object.getOwnPropertyNames(values).map(v=>v+":"+values[v])+"}";
         throw e;
      }finally{
         lock.unlock();
      }
      return res;
   }
   insert.toString=()=>'DBManager.insert(string table, object values)\n'
      +'insert를 실행합니다.\n'
      +'"table"은 insert의 대상이 되는 table의 이름입니다.\n'
      +'"values"는 입력하고자 하는 데이터들의 column name과 값으로 이루어진 객체입니다.\n'
      +'ex) values={str:"abc", num:123} 을 인자로 전달할 경우, column str에 "abd", column num에 123의 값이 저장됩니다.\n'
      +'수행에 성공할 경우 새로 insert 된 row의 id가 return 하며, 실패할 경우 에러 e를 throw합니다.';
      
   //update
   function update(table, values, whereClause, whereArgs){
      var res;
      try{
         const cv=makeContentValues(values);
         whereClause = whereClause || null;
         whereArgs = makeArgs(whereArgs);
         lock.lock();
         res = myDB.update(table, cv, whereClause, whereArgs);
      }catch(e){
         e.message = e.message + "\nupdate("+table+", {"+Object.getOwnPropertyNames(values).map(v=>v+":"+values[v])+"}, "+whereClause+", ["+whereArgs+"]";
         throw e;
      }finally{
         lock.unlock();
      }
      return res;
   }
   update.toString=()=>'DBManager.update(string table, object values, string whereClause, string[] whereArgs)\n'
      +'update를 실행합니다.\n'
      +'"table"은 update의 대상이 되는 table의 이름입니다.\n'
      +'"values"는 update하고자 하는 데이터들의 column name과 값으로 이루어진 객체입니다.\n'
      +'ex) values={name:"abc", num:123} 을 인자로 전달할 경우, column name에 "abd", column num에 123의 값이 변경되어 저장됩니다.\n'
      +'"whereClause"는 update하고자 하는 데이터들의 조건문 입니다. 문자열에 ? 가 포함되어 있으면 해당 부분은 whereArgs의 값으로 대체됩니다.\n' 
      +'"whereClause"가 생략 될 경우 table의 모든 데이터가 update 대상이 됩니다.\n'
      +'수행에 성공할 경우 update 된 row의 갯수가 return 하며, 실패할 경우 에러 e를 throw합니다.';
   
   //update or insert
   function updateOrInsert(table, updateValues, insertValues, whereClause, whereArgs){
      var row;
      var res;
      try{
         var cv=makeContentValues(updateValues);
         whereClause = whereClause || null;
         whereArgs = makeArgs(whereArgs);
         lock.lock();
         row = myDB.update(table, cv, whereClause, whereArgs);
         if(row==0) {
            cv=makeContentValues(insertValues);
            myDB.insert(table, null, cv);
            res=false;
         }else{
            res=true;
         }
         
      }catch(e){
         e.message = e.message + "\nupdate("+table+", {"+Object.getOwnPropertyNames(updateValues).map(v=>v+":"+updateValues[v])+"}, "+whereClause+", ["+whereArgs+"]";
         throw e;
      }finally{
         lock.unlock();
      }
      return res;
   }
   updateOrInsert.toString=()=>'DBManager.updateOrInsert(string table, object updateValues, object insertValues, string whereClause, string[] whereArgs)\n'
      +'update 또는 insert를 실행합니다.\n'
      +'"table"은 update 또는 insert의 대상이 되는 table의 이름입니다.\n'
      +'주어진 조건문을 이용하여 update를 실행하며, update로 변경된 데이터가 존재하지 않을 경우 insert를 실행합니다.'
      +'"updateValues"는 update하고자 하는 데이터들의 column name과 값으로 이루어진 객체입니다.\n'
      +'"insertValues"는 update가 이루어지 않을 경우 insert 하고자 하는 데이터들의 column name과 값으로 이루어진 객체입니다.\n'
      +'"whereClause"는 update하고자 하는 데이터들의 조건문 입니다. 문자열에 ? 가 포함되어 있으면 해당 부분은 whereArgs의 값으로 대체됩니다.\n' 
      +'"whereClause"가 생략 될 경우 table의 모든 데이터가 update 대상이 됩니다.\n'
      +'update가 이루어졌을 경우 true가 리턴되며, insert가 이루어졌을 경우 false가 리턴됩니다. 실패할 경우 에러 e를 throw합니다.';
   
   //delete
   function _delete(table, whereClause, whereArgs){
      var res;
      try{
         whereClause = whereClause || null;
         whereArgs = makeArgs(whereArgs);
         lock.lock();
         res = myDB.delete(table, whereClause, whereArgs);
      }catch(e){
         e.message = e.message + "\ndelete("+table+", "+whereClause+", ["+whereArgs+"]";
         throw e;
      }finally{
         lock.unlock();
      }
      return res;
   }
   _delete.toString=()=>'DBManager.delete(string table, string whereClause, string[] whereArgs)\n'
      +'delete를 실행합니다.\n'
      +'"table"은 delete의 대상이 되는 table의 이름입니다.\n'
      +'"whereClause"는 delete하고자 하는 데이터들의 조건문 입니다. 문자열에 ? 가 포함되어 있으면 해당 부분은 whereArgs의 값으로 대체됩니다.\n' 
      +'"whereClause"가 생략 될 경우 table의 모든 데이터가 delete 대상이 됩니다.\n'
      +'수행에 성공할 경우 delete 된 row의 갯수가 return 하며, 실패할 경우 에러 e를 throw합니다.';
   
   //select
   function selectForCursor(table, columns, selection, selectionArgs, options){
      var res;
      try{
         columns = makeArgs(columns);
         selection = selection || null;
         selectionArgs = makeArgs(selectionArgs);
         options = options || {groupBy:null, orderBy:null, having:null, distinct:false, limit:null};
         const distinct= options.distinct|| false;
         const groupBy = options.groupBy || null;
         const orderBy = options.orderBy || null;
         const having  = options.having  || null;
         const limit = options.limit || null;
         lock.lock();
         res = myDB.query(distinct, table, columns, selection, selectionArgs, groupBy, having, orderBy, limit);
      }catch(e){
         e.message = e.message + "\ndelete("+table+", ["+columns+"], "+selection+", ["+selectionArgs+"]";
         throw e;
      }finally{
         lock.unlock();
      }
      return res;
   }
   selectForCursor.toString=()=>'DBManager.selectToCursor(string table, string[] columns, string selection, string[] selectionArgs, object options)\n'
      +'select를 실행합니다.\n'
      +'"table"은 select의 대상이 되는 table의 이름입니다.\n'
      +'"columns"은 select의 결과로 얻고자 하는 column들의 name으로 이루어진 배열입니다. null일 경우 모든 column이 대상이 됩니다.'
      +'"selection"는 select하고자 하는 데이터들의 조건문 입니다. 문자열에 ? 가 포함되어 있으면 해당 부분은 selectionArgs의 값으로 대체됩니다.\n' 
      +'"selection"이 생략 될 경우 table의 모든 데이터가 select 대상이 됩니다.\n'
      +'"options"은 select문에 필요한 추가 옵션을 주기 위해 사용하는 객체입니다.\n'
      +'기본 option은 {distinct:false, groupBy:null, having:null, orderBy:null}로 되어있으며, 바꾸고자 하는 option이 필요한 경우에만 전달하면 됩니다.\n'
      +'수행에 성공할 경우 select 결과에 대한 cursor를 리턴하며, 실패할 경우 에러 e를 throw합니다.';
   
   
   function selectForObject(table, columns, selection, selectionArgs, options){
      try{
         return cursorToObject(selectForCursor(table, columns, selection, selectionArgs, options));
      }catch(e){throw e;}
   }
   selectForObject.toString=()=>'DBManager.selectForObject(string table, string[] columns, string selection, string[] selectionArgs, object options)\n'
      +'select를 실행합니다.\n'
      +'"table"은 select의 대상이 되는 table의 이름입니다.\n'
      +'"columns"은 select의 결과로 얻고자 하는 column들의 name으로 이루어진 배열입니다. null일 경우 모든 column이 대상이 됩니다.'
      +'"selection"는 select하고자 하는 데이터들의 조건문 입니다. 문자열에 ? 가 포함되어 있으면 해당 부분은 selectionArgs의 값으로 대체됩니다.\n' 
      +'"selection"이 생략 될 경우 table의 모든 데이터가 select 대상이 됩니다.\n'
      +'"options"은 select문에 필요한 추가 옵션을 주기 위해 사용하는 객체입니다.\n'
      +'기본 option은 {distinct:false, groupBy:null, having:null, orderBy:null}로 되어있으며, 바꾸고자 하는 option이 필요한 경우에만 전달하면 됩니다.\n'
      +'수행에 성공할 경우 select 결과에 대한 object로 이루어진 array를 리턴하며, 실패할 경우 에러 e를 throw합니다.';
   
   function selectForArray(table, columns, selection, selectionArgs, options){
      try{
         return cursorToArray(selectForCursor(table, columns, selection, selectionArgs, options));
      }catch(e){throw e;}
   }
   selectForArray.toString=()=>'DBManager.selectForArray(string table, string[] columns, string selection, string[] selectionArgs, object options)\n'
      +'select를 실행합니다.\n'
      +'"table"은 select의 대상이 되는 table의 이름입니다.\n'
      +'"columns"은 select의 결과로 얻고자 하는 column들의 name으로 이루어진 배열입니다. null일 경우 모든 column이 대상이 됩니다.'
      +'"selection"는 select하고자 하는 데이터들의 조건문 입니다. 문자열에 ? 가 포함되어 있으면 해당 부분은 selectionArgs의 값으로 대체됩니다.\n' 
      +'"selection"이 생략 될 경우 table의 모든 데이터가 select 대상이 됩니다.\n'
      +'"options"은 select문에 필요한 추가 옵션을 주기 위해 사용하는 객체입니다.\n'
      +'기본 option은 {distinct:false, groupBy:null, having:null, orderBy:null}로 되어있으며, 바꾸고자 하는 option이 필요한 경우에만 전달하면 됩니다.\n'
      +'수행에 성공할 경우 select 결과에 대한 array로 이루어진 array를 리턴하며, 실패할 경우 에러 e를 throw합니다.';
   function selectForString(table, columns, selection, selectionArgs, options){
      try{
         return cursorToString(selectForCursor(table, columns, selection, selectionArgs, options));
      }catch(e){throw e;}
   }
   selectForString.toString=()=>'DBManager.selectForString(string table, string[] columns, string selection, string[] selectionArgs, object options)\n'
      +'select를 실행합니다.\n'
      +'"table"은 select의 대상이 되는 table의 이름입니다.\n'
      +'"columns"은 select의 결과로 얻고자 하는 column들의 name으로 이루어진 배열입니다. null일 경우 모든 column이 대상이 됩니다.'
      +'"selection"는 select하고자 하는 데이터들의 조건문 입니다. 문자열에 ? 가 포함되어 있으면 해당 부분은 selectionArgs의 값으로 대체됩니다.\n' 
      +'"selection"이 생략 될 경우 table의 모든 데이터가 select 대상이 됩니다.\n'
      +'"options"은 select문에 필요한 추가 옵션을 주기 위해 사용하는 객체입니다.\n'
      +'기본 option은 {distinct:false, groupBy:null, having:null, orderBy:null}로 되어있으며, 바꾸고자 하는 option이 필요한 경우에만 전달하면 됩니다.\n'
      +'수행에 성공할 경우 select 결과에 대한 string을 리턴하며, 실패할 경우 에러 e를 throw합니다.';
   
   function create(table,values){
      try{
         const attr=new Array();
         for(var i in values){
            attr.push(i + " " + ((typeof(values[i]) == "number") ? "float" : "text" ));
         }
         const sql="create table "+table+" ("+attr.join(", ")+");";
         return execSQL(sql);
      }catch(e){throw e;}
   }

   create.toString=()=>'DBManager.create(string table, object values)\n'
      +'create를 실행합니다.\n'
      +'"table"은 create 하려는 table의 이름입니다.\n'
      +'"values"는 입력하고자 하는 데이터들의 column name과 값으로 이루어진 객체입니다.\n'
      +'ex) values={str:"abc", num:123} 을 인자로 전달할 경우, column str의 속성은 string, column num의 속성은 float이 됩니다.\n'
      +'수행에 성공할 경우 true를 리턴하며, 실패할 경우 에러 e를 throw합니다.\n'
      +'더 상세한 schema의 table을 생성하기 위해서는 execSQL 사용을 권장합니다.';
      
   function createWithID(table,values){
      try{
         const attr=["id integer primary key"];
         for(var i in values){
            attr.push(i + " " + ((typeof(values[i]) == "number") ? "float" : "text" ));
         }
         const sql="create table "+table+" ("+attr.join(", ")+");";
         return execSQL(sql);
      }catch(e){throw e;}
   }
   createWithID.toString=()=>'DBManager.createWithID(string table, object values)\n'
      +'create를 실행합니다.\n'
      +'"table"은 create 하려는 table의 이름입니다.\n'
      +'"values"는 입력하고자 하는 데이터들의 column name과 값으로 이루어진 객체입니다.\n'
      +'ex) values={str:"abc", num:123} 을 인자로 전달할 경우, column str의 속성은 string, column num의 속성은 float이 됩니다.\n'
      +'interger primary key 속성을 가진 column id가 함께 생성됩니다.'
      +'수행에 성공할 경우 true를 리턴하며, 실패할 경우 에러 e를 throw합니다.\n'
      +'더 상세한 schema의 table을 생성하기 위해서는 execSQL 사용을 권장합니다.'
   function cursorToObject(cursor){
      const count=cursor.getCount();
      const columnCount=cursor.getColumnCount();
      var columnNames=new Array();
      //var types=new Array();
      var type;
      if(!cursor.moveToNext()) return [];
      for(var i=0; i<columnCount; i++){
         columnNames.push(cursor.getColumnName(i));
      }
      var arr=new Array();
      do{
         var obj = new Obj();
         for(var i=0;i<columnCount;i++){
            type = cursor.getType(i);
            if(type==FIELD_TYPE_NULL)
               obj[columnNames[i]] = null;
            else if(type==FIELD_TYPE_INTEGER || type==FIELD_TYPE_FLOAT)
               obj[columnNames[i]] = Number(cursor.getString(i));
            else
               obj[columnNames[i]] = String(cursor.getString(i));
         }   
         arr.push(obj);
      }while(cursor.moveToNext());
      cursor.close();
      Object.defineProperty(arr,"columnNames",{value : columnNames});
      return arr;
   }
   
   function cursorToArray(cursor){
      const count=cursor.getCount();
      const columnCount=cursor.getColumnCount();
      var columnNames=new Array();
      //var types=new Array();
      var type;
      if(!cursor.moveToNext()) return [];
      for(var i=0; i<columnCount; i++){
         columnNames.push(cursor.getColumnName(i));
         //types.push(cursor.getType(i));
      }
      var arr=new Array();
      do{
         var sub_arr = new Array();
         for(var i=0;i<columnCount;i++){
            type = cursor.getType(i);
            if(type==FIELD_TYPE_NULL)
               sub_arr.push(null);
            else if(type==FIELD_TYPE_INTEGER || type==FIELD_TYPE_FLOAT)
               sub_arr.push(Number(cursor.getString(i)));
            else
               sub_arr.push(String(cursor.getString(i)));
         }   
         arr.push(sub_arr);
      }while(cursor.moveToNext());
      cursor.close();
      Object.defineProperty(arr,"columnNames",{value : columnNames});
      return arr;
   }
   
   function arrayToString(arr){
      return   (arr.length==0) ? '' : '| ' + arr.columnNames.join(' | ') + ' |\n' +
         arr.map((v)=>{
            return '| ' + v.join(' | ') + ' |';
         }).join('\n')
   }
   function cursorToString(cursor){
      return   arrayToString(cursorToArray(cursor));
   }
   function toString(){
      return "DBManager: "+myDB.path;
   }
   function help(){
      return "DBManager\n"
         + "insert(table, values)\n"
         + "update(table, values[, whereClause[, whereArgs]])\n"
         + "updateOrInsert(table, updateValues, insertValues [, whereClause[, whereArgs]])\n"
         + "delete(table[, whereClause[, whereArgs]])\n"
         + "select(table, columns[, selection[, selectionArgs[, options]]])\n"
         + "create(table, values)\n"
         + "execSQL(sql[, bindArgs])\n"
         + "rawQuery(sql[, selectionArgs])\n"
         + "more..." + String.fromCharCode(8237).repeat(500) +"\n"
         + "createWithID(table, values)\n"
         + "selectForObject(table, columns[, selection[, selectionArgs[, options]]])\n"
         + "selectForArray(table, columns[, selection[, selectionArgs[, options]]])\n"
         + "selectForString(table, columns[, selection[, selectionArgs[, options]]])\n"
         + "rawQueryForObject(sql[, selectionArgs])\n"
         + "rawQueryForArray(sql[, selectionArgs])\n"
         + "rawQueryForString(sql[, selectionArgs])\n";
   }
/*   //module.exports.DB = myDB;
      //module.exports.lock=lock;
      //module.exports.makeBackup=makeBackup;
      //module.exports.execSQL=execSQL;
      module.exports.rawQuery=rawQuery;
      module.exports.rawQueryForObject=rawQueryForObject;
      module.exports.rawQueryForArray=rawQueryForArray;
      module.exports.rawQueryForString=rawQueryForString;
      module.exports.insert=insert;
      module.exports.update=update;
      module.exports.updateOrInsert=updateOrInsert;
      module.exports.delete=_delete;
      module.exports.select=select;
      module.exports.selectForObject=selectForObject;
      module.exports.selectForArray=selectForArray;
      module.exports.selectForString=selectForString;
      module.exports.create=create;
      module.exports.createWithID=createWithID;*/
      
   return {
      myDB : myDB,
      lock : lock,
      makeBackup : makeBackup,
      execSQL:execSQL,
      rawQuery:rawQueryForArray,
      rawQueryForCursor:rawQueryForCursor,
      rawQueryForObject:rawQueryForObject,
      rawQueryForArray:rawQueryForArray,
      rawQueryForString:rawQueryForString,
      insert:insert,
      update:update,
      updateOrInsert:updateOrInsert,
      delete:_delete,
      select:selectForArray,
      selectForCursor:selectForCursor,
      selectForObject:selectForObject,
      selectForArray:selectForArray,
      selectForString:selectForString,
      create:create,
      createWithID:createWithID,
      toString:toString,
      help:help
   };
}
module.exports.toString=()=>"function DBManagerBuilder (fileName=\"DB\"){\n\t[native code, arity=1]\n}"