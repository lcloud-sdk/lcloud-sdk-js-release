(function(global,undefined){if(global.LiveIO){return false}var liveIO={version:"1.0.4"};var util=liveIO.util={};var toString=util.toString;var CONST={NaN:Number.NaN};liveIO._MODE="deploy";var _MIME_M3U8="application/vnd.apple.mpegurl";var _MIME_PLUGIN="application/youku-live_launcher";var _STEAM_URL="http://lapi.xiu.youku.com/v1/get_playlist";var _SWF_VERSION="10.0.0",_SWF_INSTALL="expressInstall.swf",_SWF_PARAM={allowFullScreen:true,allowScriptAccess:"always",wmode:"opaque",bgcolor:"#000000",allowFullScreenInteractive:"true"},_SWF_CALL_BACK_NAMESPACE_PREFIX="XMPlayer";var PLUGIN_CLASS_ID="CLSID:EC7EC8A8-D529-465A-BFD8-5D26C7244BE7",PLUGIN_MIME_TYPE=_MIME_PLUGIN,PLUGIN_INTERFACE_NAME="XMPlugin";var PLUGIN_PROTOCOL=liveIO.PLUGIN_PROTOCOL={DEFAULT:0,RTP:1,RTMP:2};(function(util){var class2type=function(arr){var res={},i=0,length=arr.length;for(;i<length;i++){res["[object "+arr[i]+"]"]=arr[i].toLowerCase()}return res}("Boolean Number String Function Array Date RegExp Object Error".split(" "));util.type=function(obj){if(obj==null){return obj+""}return typeof obj==="object"||typeof obj==="function"?class2type[toString.call(obj)]||"object":typeof obj};util.each=function(obj,callback){var res,i=0,length=obj.length,isArray=util.type(obj)=="array";if(isArray){for(;i<length;i++){res=callback.call(obj[i],i,obj[i]);if(res===false){break}}}else{for(i in obj){res=callback.call(obj[i],i,obj[i]);if(res===false){break}}}return obj}})(util);(function(util,global){if(global.JSON&&global.JSON.parse&&global.JSON.stringify){util.parseJSON=global.JSON.parse;util.stringifyJSON=global.JSON.stringify}else{function f(n){return n<10?"0"+n:n}function date(d,key){return isFinite(d.valueOf())?d.getUTCFullYear()+"-"+f(d.getUTCMonth()+1)+"-"+f(d.getUTCDate())+"T"+f(d.getUTCHours())+":"+f(d.getUTCMinutes())+":"+f(d.getUTCSeconds())+"Z":null}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value instanceof Date){value=date(key)}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value){case"string":return quote(value);case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value){return"null"}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";gap=mind;return v}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==="string"){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";gap=mind;return v}}util.stringifyJSON=function(value,replacer,space){var i;gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" "}}else if(typeof space==="string"){indent=space}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":value})};util.parseJSON=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}})(util,global);(function(util){util.version={_match:function(version){return/^\d+\.\d+\.\d+\.\d+$/.test(version)},_getVersionArray:function(version){if(!this._match(version)){return false}var arr=version.split("."),resArr=[];util.each(arr,function(){resArr.push(parseInt(this))});return resArr},compareVersion:function(version,otherVersion){if(!this._match(version)||!this._match(otherVersion)){return false}var res,ownVersion=this._getVersionArray(version),newVersion=this._getVersionArray(otherVersion);if(version===otherVersion){res=0}else{util.each(ownVersion,function(e){if(this<newVersion[e]){res=-1;return false}else if(this>newVersion[e]){res=1;return false}})}return res}}})(util);(function(util){var swfobject=function(){var UNDEF="undefined",OBJECT="object",SHOCKWAVE_FLASH="Shockwave Flash",SHOCKWAVE_FLASH_AX="ShockwaveFlash.ShockwaveFlash",FLASH_MIME_TYPE="application/x-shockwave-flash",EXPRESS_INSTALL_ID="SWFObjectExprInst",ON_READY_STATE_CHANGE="onreadystatechange",win=window,doc=document,nav=navigator,plugin=false,domLoadFnArr=[main],regObjArr=[],objIdArr=[],listenersArr=[],storedAltContent,storedAltContentId,storedCallbackFn,storedCallbackObj,isDomLoaded=false,isExpressInstallActive=false,dynamicStylesheet,dynamicStylesheetMedia,autoHideShow=true,ua=function(){var w3cdom=typeof doc.getElementById!=UNDEF&&typeof doc.getElementsByTagName!=UNDEF&&typeof doc.createElement!=UNDEF,u=nav.userAgent.toLowerCase(),p=nav.platform.toLowerCase(),windows=p?/win/.test(p):/win/.test(u),mac=p?/mac/.test(p):/mac/.test(u),webkit=/webkit/.test(u)?parseFloat(u.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,ie=!+"\x0B1",playerVersion=[0,0,0],d=null,hasFlash=false;if(typeof nav.plugins!=UNDEF&&typeof nav.plugins[SHOCKWAVE_FLASH]==OBJECT){hasFlash=true;d=nav.plugins[SHOCKWAVE_FLASH].description;if(d&&!(typeof nav.mimeTypes!=UNDEF&&nav.mimeTypes[FLASH_MIME_TYPE]&&!nav.mimeTypes[FLASH_MIME_TYPE].enabledPlugin)){plugin=true;ie=false;d=d.replace(/^.*\s+(\S+\s+\S+$)/,"$1");playerVersion[0]=parseInt(d.replace(/^(.*)\..*$/,"$1"),10);playerVersion[1]=parseInt(d.replace(/^.*\.(.*)\s.*$/,"$1"),10);playerVersion[2]=/[a-zA-Z]/.test(d)?parseInt(d.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else if(typeof win.ActiveXObject!=UNDEF){try{var a=new ActiveXObject(SHOCKWAVE_FLASH_AX);if(a){hasFlash=true;d=a.GetVariable("$version");if(d){ie=true;d=d.split(" ")[1].split(",");playerVersion=[parseInt(d[0],10),parseInt(d[1],10),parseInt(d[2],10)]}}}catch(e){}}return{w3:w3cdom,pv:playerVersion,wk:webkit,ie:ie,win:windows,mac:mac,hasFlash:hasFlash}}(),onDomLoad=function(){if(!ua.w3){return}if(typeof doc.readyState!=UNDEF&&doc.readyState=="complete"||typeof doc.readyState==UNDEF&&(doc.getElementsByTagName("body")[0]||doc.body)){callDomLoadFunctions()}if(!isDomLoaded){if(typeof doc.addEventListener!=UNDEF){doc.addEventListener("DOMContentLoaded",callDomLoadFunctions,false)}if(ua.ie&&ua.win){doc.attachEvent(ON_READY_STATE_CHANGE,function(){if(doc.readyState=="complete"){doc.detachEvent(ON_READY_STATE_CHANGE,arguments.callee);callDomLoadFunctions()}});if(win==top){(function(){if(isDomLoaded){return}try{doc.documentElement.doScroll("left")}catch(e){setTimeout(arguments.callee,0);return}callDomLoadFunctions()})()}}if(ua.wk){(function(){if(isDomLoaded){return}if(!/loaded|complete/.test(doc.readyState)){setTimeout(arguments.callee,0);return}callDomLoadFunctions()})()}addLoadEvent(callDomLoadFunctions)}}();function callDomLoadFunctions(){if(isDomLoaded){return}try{var t=doc.getElementsByTagName("body")[0].appendChild(createElement("span"));t.parentNode.removeChild(t)}catch(e){return}isDomLoaded=true;var dl=domLoadFnArr.length;for(var i=0;i<dl;i++){domLoadFnArr[i]()}}function addDomLoadEvent(fn){if(isDomLoaded){fn()}else{domLoadFnArr[domLoadFnArr.length]=fn}}function addLoadEvent(fn){if(typeof win.addEventListener!=UNDEF){win.addEventListener("load",fn,false)}else if(typeof doc.addEventListener!=UNDEF){doc.addEventListener("load",fn,false)}else if(typeof win.attachEvent!=UNDEF){addListener(win,"onload",fn)}else if(typeof win.onload=="function"){var fnOld=win.onload;win.onload=function(){fnOld();fn()}}else{win.onload=fn}}function main(){if(plugin){testPlayerVersion()}else{matchVersions()}}function testPlayerVersion(){var b=doc.getElementsByTagName("body")[0];var o=createElement(OBJECT);o.setAttribute("type",FLASH_MIME_TYPE);var t=b.appendChild(o);if(t){var counter=0;(function(){if(typeof t.GetVariable!=UNDEF){var d=t.GetVariable("$version");if(d){d=d.split(" ")[1].split(",");ua.pv=[parseInt(d[0],10),parseInt(d[1],10),parseInt(d[2],10)]}}else if(counter<10){counter++;setTimeout(arguments.callee,10);return}b.removeChild(o);t=null;matchVersions()})()}else{matchVersions()}}function matchVersions(){var rl=regObjArr.length;if(rl>0){for(var i=0;i<rl;i++){var id=regObjArr[i].id;var cb=regObjArr[i].callbackFn;var cbObj={success:false,id:id};if(ua.pv[0]>0){var obj=getElementById(id);if(obj){if(hasPlayerVersion(regObjArr[i].swfVersion)&&!(ua.wk&&ua.wk<312)){setVisibility(id,true);if(cb){cbObj.success=true;cbObj.ref=getObjectById(id);cb(cbObj)}}else if(regObjArr[i].expressInstall&&canExpressInstall()){var att={};att.data=regObjArr[i].expressInstall;att.width=obj.getAttribute("width")||"0";att.height=obj.getAttribute("height")||"0";if(obj.getAttribute("class")){att.styleclass=obj.getAttribute("class")}if(obj.getAttribute("align")){att.align=obj.getAttribute("align")}var par={};var p=obj.getElementsByTagName("param");var pl=p.length;for(var j=0;j<pl;j++){if(p[j].getAttribute("name").toLowerCase()!="movie"){par[p[j].getAttribute("name")]=p[j].getAttribute("value")}}showExpressInstall(att,par,id,cb)}else{displayAltContent(obj);if(cb){cb(cbObj)}}}}else{setVisibility(id,true);if(cb){var o=getObjectById(id);if(o&&typeof o.SetVariable!=UNDEF){cbObj.success=true;cbObj.ref=o}cb(cbObj)}}}}}function getObjectById(objectIdStr){var r=null;var o=getElementById(objectIdStr);if(o&&o.nodeName=="OBJECT"){if(typeof o.SetVariable!=UNDEF){r=o}else{var n=o.getElementsByTagName(OBJECT)[0];if(n){r=n}}}return r}function canExpressInstall(){return!isExpressInstallActive&&hasPlayerVersion("6.0.65")&&(ua.win||ua.mac)&&!(ua.wk&&ua.wk<312)}function showExpressInstall(att,par,replaceElemIdStr,callbackFn){isExpressInstallActive=true;storedCallbackFn=callbackFn||null;storedCallbackObj={success:false,id:replaceElemIdStr};var obj=getElementById(replaceElemIdStr);if(obj){if(obj.nodeName=="OBJECT"){storedAltContent=abstractAltContent(obj);storedAltContentId=null}else{storedAltContent=obj;storedAltContentId=replaceElemIdStr}att.id=EXPRESS_INSTALL_ID;if(typeof att.width==UNDEF||!/%$/.test(att.width)&&parseInt(att.width,10)<310){att.width="310"}if(typeof att.height==UNDEF||!/%$/.test(att.height)&&parseInt(att.height,10)<137){att.height="137"}doc.title=doc.title.slice(0,47)+" - Flash Player Installation";var pt=ua.ie&&ua.win?"ActiveX":"PlugIn",fv="MMredirectURL="+encodeURI(window.location).toString().replace(/&/g,"%26")+"&MMplayerType="+pt+"&MMdoctitle="+doc.title;if(typeof par.flashvars!=UNDEF){par.flashvars+="&"+fv}else{par.flashvars=fv}if(ua.ie&&ua.win&&obj.readyState!=4){var newObj=createElement("div");replaceElemIdStr+="SWFObjectNew";newObj.setAttribute("id",replaceElemIdStr);obj.parentNode.insertBefore(newObj,obj);obj.style.display="none";(function(){if(obj.readyState==4){obj.parentNode.removeChild(obj)}else{setTimeout(arguments.callee,10)}})()}createSWF(att,par,replaceElemIdStr)}}function displayAltContent(obj){if(ua.ie&&ua.win&&obj.readyState!=4){var el=createElement("div");obj.parentNode.insertBefore(el,obj);el.parentNode.replaceChild(abstractAltContent(obj),el);obj.style.display="none";(function(){if(obj.readyState==4){obj.parentNode.removeChild(obj)}else{setTimeout(arguments.callee,10)}})()}else{obj.parentNode.replaceChild(abstractAltContent(obj),obj)}}function abstractAltContent(obj){var ac=createElement("div");if(ua.win&&ua.ie){ac.innerHTML=obj.innerHTML}else{var nestedObj=obj.getElementsByTagName(OBJECT)[0];if(nestedObj){var c=nestedObj.childNodes;if(c){var cl=c.length;for(var i=0;i<cl;i++){if(!(c[i].nodeType==1&&c[i].nodeName=="PARAM")&&!(c[i].nodeType==8)){ac.appendChild(c[i].cloneNode(true))}}}}}return ac}function createSWF(attObj,parObj,id){var r,el=getElementById(id);if(ua.wk&&ua.wk<312){return r}if(el){if(typeof attObj.id==UNDEF){attObj.id=id}if(ua.ie&&ua.win){var att="";for(var i in attObj){if(attObj[i]!=Object.prototype[i]){if(i.toLowerCase()=="data"){parObj.movie=attObj[i]}else if(i.toLowerCase()=="styleclass"){att+=' class="'+attObj[i]+'"'}else if(i.toLowerCase()!="classid"){att+=" "+i+'="'+attObj[i]+'"'}}}var par="";for(var j in parObj){if(parObj[j]!=Object.prototype[j]){par+='<param name="'+j+'" value="'+parObj[j]+'" />'}}el.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+att+">"+par+"</object>";objIdArr[objIdArr.length]=attObj.id;r=getElementById(attObj.id)}else{var o=createElement(OBJECT);o.setAttribute("type",FLASH_MIME_TYPE);for(var m in attObj){if(attObj[m]!=Object.prototype[m]){if(m.toLowerCase()=="styleclass"){o.setAttribute("class",attObj[m])}else if(m.toLowerCase()!="classid"){o.setAttribute(m,attObj[m])}}}for(var n in parObj){if(parObj[n]!=Object.prototype[n]&&n.toLowerCase()!="movie"){createObjParam(o,n,parObj[n])}}el.parentNode.replaceChild(o,el);r=o}}return r}function createObjParam(el,pName,pValue){var p=createElement("param");p.setAttribute("name",pName);p.setAttribute("value",pValue);el.appendChild(p)}function removeSWF(id){var obj=getElementById(id);if(obj&&obj.nodeName=="OBJECT"){if(ua.ie&&ua.win){obj.style.display="none";(function(){if(obj.readyState==4){removeObjectInIE(id)}else{setTimeout(arguments.callee,10)}})()}else{obj.parentNode.removeChild(obj)}}}function removeObjectInIE(id){var obj=getElementById(id);if(obj){for(var i in obj){if(typeof obj[i]=="function"){obj[i]=null}}obj.parentNode.removeChild(obj)}}function getElementById(id){var el=null;try{el=doc.getElementById(id)}catch(e){}return el}function createElement(el){return doc.createElement(el)}function addListener(target,eventType,fn){target.attachEvent(eventType,fn);listenersArr[listenersArr.length]=[target,eventType,fn]}function hasPlayerVersion(rv){var pv=ua.pv,v=rv.split(".");v[0]=parseInt(v[0],10);v[1]=parseInt(v[1],10)||0;v[2]=parseInt(v[2],10)||0;return pv[0]>v[0]||pv[0]==v[0]&&pv[1]>v[1]||pv[0]==v[0]&&pv[1]==v[1]&&pv[2]>=v[2]?true:false}function createCSS(sel,decl,media,newStyle){if(ua.ie&&ua.mac){return}var h=doc.getElementsByTagName("head")[0];if(!h){return}var m=media&&typeof media=="string"?media:"screen";if(newStyle){dynamicStylesheet=null;dynamicStylesheetMedia=null}if(!dynamicStylesheet||dynamicStylesheetMedia!=m){var s=createElement("style");s.setAttribute("type","text/css");s.setAttribute("media",m);dynamicStylesheet=h.appendChild(s);if(ua.ie&&ua.win&&typeof doc.styleSheets!=UNDEF&&doc.styleSheets.length>0){dynamicStylesheet=doc.styleSheets[doc.styleSheets.length-1]}dynamicStylesheetMedia=m}if(ua.ie&&ua.win){if(dynamicStylesheet&&typeof dynamicStylesheet.addRule==OBJECT){dynamicStylesheet.addRule(sel,decl)}}else{if(dynamicStylesheet&&typeof doc.createTextNode!=UNDEF){dynamicStylesheet.appendChild(doc.createTextNode(sel+" {"+decl+"}"))}}}function setVisibility(id,isVisible){if(!autoHideShow){return}var v=isVisible?"visible":"hidden";if(isDomLoaded&&getElementById(id)){getElementById(id).style.visibility=v}else{createCSS("#"+id,"visibility:"+v)}}function urlEncodeIfNecessary(s){var regex=/[\\\"<>\.;]/;var hasBadChars=regex.exec(s)!=null;return hasBadChars&&typeof encodeURIComponent!=UNDEF?encodeURIComponent(s):s}var cleanup=function(){if(ua.ie&&ua.win){window.attachEvent("onunload",function(){var ll=listenersArr.length;for(var i=0;i<ll;i++){listenersArr[i][0].detachEvent(listenersArr[i][1],listenersArr[i][2])}var il=objIdArr.length;for(var j=0;j<il;j++){removeSWF(objIdArr[j])}for(var k in ua){ua[k]=null}ua=null;for(var l in swfobject){swfobject[l]=null}swfobject=null})}}();return{registerObject:function(objectIdStr,swfVersionStr,xiSwfUrlStr,callbackFn){if(ua.w3&&objectIdStr&&swfVersionStr){var regObj={};regObj.id=objectIdStr;regObj.swfVersion=swfVersionStr;regObj.expressInstall=xiSwfUrlStr;regObj.callbackFn=callbackFn;regObjArr[regObjArr.length]=regObj;setVisibility(objectIdStr,false)}else if(callbackFn){callbackFn({success:false,id:objectIdStr})}},getObjectById:function(objectIdStr){if(ua.w3){return getObjectById(objectIdStr)}},embedSWF:function(swfUrlStr,replaceElemIdStr,widthStr,heightStr,swfVersionStr,xiSwfUrlStr,flashvarsObj,parObj,attObj,callbackFn){var callbackObj={success:false,id:replaceElemIdStr};if(ua.w3&&!(ua.wk&&ua.wk<312)&&swfUrlStr&&replaceElemIdStr&&widthStr&&heightStr&&swfVersionStr){setVisibility(replaceElemIdStr,false);addDomLoadEvent(function(){widthStr+="";heightStr+="";var att={};if(attObj&&typeof attObj===OBJECT){for(var i in attObj){att[i]=attObj[i]}}att.data=swfUrlStr;att.width=widthStr;att.height=heightStr;var par={};if(parObj&&typeof parObj===OBJECT){for(var j in parObj){par[j]=parObj[j]}}if(flashvarsObj&&typeof flashvarsObj===OBJECT){for(var k in flashvarsObj){if(typeof par.flashvars!=UNDEF){par.flashvars+="&"+k+"="+flashvarsObj[k]}else{par.flashvars=k+"="+flashvarsObj[k]}}}if(hasPlayerVersion(swfVersionStr)){var obj=createSWF(att,par,replaceElemIdStr);if(att.id==replaceElemIdStr){setVisibility(replaceElemIdStr,true)}callbackObj.success=true;callbackObj.ref=obj}else if(xiSwfUrlStr&&canExpressInstall()){att.data=xiSwfUrlStr;showExpressInstall(att,par,replaceElemIdStr,callbackFn);return}else{setVisibility(replaceElemIdStr,true)}if(callbackFn){callbackFn(callbackObj)}})}else if(callbackFn){callbackFn(callbackObj)}},switchOffAutoHideShow:function(){autoHideShow=false},ua:ua,getFlashPlayerVersion:function(){return{major:ua.pv[0],minor:ua.pv[1],release:ua.pv[2]}},hasFlashPlayerVersion:hasPlayerVersion,createSWF:function(attObj,parObj,replaceElemIdStr){if(ua.w3){return createSWF(attObj,parObj,replaceElemIdStr)}else{return undefined}},showExpressInstall:function(att,par,replaceElemIdStr,callbackFn){if(ua.w3&&canExpressInstall()){showExpressInstall(att,par,replaceElemIdStr,callbackFn)}},removeSWF:function(objElemIdStr){if(ua.w3){removeSWF(objElemIdStr)}},createCSS:function(selStr,declStr,mediaStr,newStyleBoolean){if(ua.w3){createCSS(selStr,declStr,mediaStr,newStyleBoolean)}},addDomLoadEvent:addDomLoadEvent,addLoadEvent:addLoadEvent,getQueryParamValue:function(param){var q=doc.location.search||doc.location.hash;if(q){if(/\?/.test(q)){q=q.split("?")[1]}if(param==null){return urlEncodeIfNecessary(q)}var pairs=q.split("&");for(var i=0;i<pairs.length;i++){if(pairs[i].substring(0,pairs[i].indexOf("="))==param){return urlEncodeIfNecessary(pairs[i].substring(pairs[i].indexOf("=")+1))}}}return""},expressInstallCallback:function(){if(isExpressInstallActive){var obj=getElementById(EXPRESS_INSTALL_ID);if(obj&&storedAltContent){obj.parentNode.replaceChild(storedAltContent,obj);if(storedAltContentId){setVisibility(storedAltContentId,true);if(ua.ie&&ua.win){storedAltContent.style.display="block"}}if(storedCallbackFn){storedCallbackFn(storedCallbackObj)}}isExpressInstallActive=false}}}}();util.swf=swfobject;util.hasFlash=swfobject.ua.hasFlash})(util);(function(util){var Browser={OLD_IE:window.ActiveXObject?true:false,NEW_IE:!window.ActiveXObject&&"ActiveXObject"in window,FF:window.navigator.userAgent.indexOf("Firefox")>=0,Chrome:window.navigator.userAgent.indexOf("Chrome")>=0,Ipad:!!(window.navigator.userAgent.indexOf("iPhone")>-1||window.navigator.userAgent.indexOf("iPad")>-1)};Browser.IE=Browser.OLD_IE||Browser.NEW_IE;Browser.MOBILE_OS=function(ua){if(ua.match(/(iPhone|iPod|iPad);?/i)){return"ios"}else if(ua.match(/Android/i)){return"android"}else{return""}}(window.navigator.userAgent);util.browser=Browser})(util);(function(util){var SCRIPT_MIME_TYPE="text/javascript";function getScript(url,callback){var script=document.createElement("script"),head=document.getElementsByTagName("head")[0];script.src=url;script.setAttribute("async","async");script.setAttribute("type",SCRIPT_MIME_TYPE);if(script.readyState){script.onreadystatechange=function(){if(script.readyState=="loaded"||script.readyState=="complete"){script.onreadystatechange=null;callback&&callback.call(script,script)}}}else{script.onload=function(){callback&&callback.call(script,script)}}head.appendChild(script);return script}function getRandomFunctionName(){return"_liveIOCallback"+(new Date).getTime()+parseInt(Math.random()*1e3)}function jsonp(url,data,callback){var script=null;var name=getRandomFunctionName();var param="callback="+name+"&_="+(new Date).getTime();if(!callback){if(util.type(data)=="function"){callback=data;data=null}else{callback=function(){}}}if(data){for(var k in data){param+="&"+k+"="+encodeURIComponent(data[k])}}window[name]=function(d){callback.call(d,d);script&&script.parentNode.removeChild(script);delete window[name]};if(/\?/g.test(url)){url+="&"+param}else{url+="?"+param}script=getScript(url)}util.jsonp=jsonp})(util);(function(util){var Base=function(){return this._constructor()};Base.prototype={constructor:Base,_constructor:function(){return this},init:function(){return this}};Base.extend=function(prop){var _super=this.prototype,methodName;var subClass=function(){return this._constructor.apply(this,arguments)};var _midClass=function(){};_midClass.prototype=_super;subClass.prototype=new _midClass;for(methodName in prop){subClass.prototype[methodName]=prop[methodName]}subClass.constructor=subClass;subClass._super=_super;subClass.extend=Base.extend;return subClass};util.BaseClass=Base;var Listener=Base.extend({_constructor:function(){this._EVENT_METHODS={};this._ERROR_FORMAT="[LIVE.IO.LISTENER]ERROR:[%s]";this._DLOG_FORMAT="[LIVE.IO.LISTENER]LOG:%s";this._OPEN_DEBUGG=liveIO._MODE=="develop";return this},on:function(methodName,callback){var _this=this;if(!this._EVENT_METHODS[methodName]){this._EVENT_METHODS[methodName]=[]}this._EVENT_METHODS[methodName].push(callback);return this},off:function(methodName,callback){var methods=this._EVENT_METHODS[methodName],res=[];if(methods){if(callback){util.each(methods,function(e,cb){if(cb!==callback){res.push(cb)}})}this._EVENT_METHODS[methodName]=res}},emit:function(methodName){var args=arguments,_this=this,methods=this._EVENT_METHODS[methodName];if(methods){Array.prototype.splice.call(args,0,1);util.each(methods,function(e){this.apply(_this,args)})}},_dLog:function(desc,info){if(this._OPEN_DEBUGG){window.console&&console.log(this._DLOG_FORMAT,desc,info||" ")}},_error:function(code,desc){if(this._OPEN_DEBUGG){window.console&&console.log(this._ERROR_FORMAT,code,desc)}this.emit("error",code,desc)}});util.Listener=Listener})(util);(function(liveIO,util){function addEvent(elem,type,eventHandle){if(elem.addEventListener){elem.addEventListener(type,eventHandle,false)}else if(elem.attachEvent){elem.attachEvent("on"+type,function(){eventHandle.call(this,window.event)})}}var LOADING_START_EVENTS=["loadstart","progress","suspend","abort","loadedmetadata","loadeddata","waiting","canplay","canplaythrough","seeking","seeked","ended","ratechange","durationchange","canplaythrough","error","stalled"];var LOADING_END_EVENTS=["playing","pause","timeupdate"];var Html5Player=util.Listener.extend({_constructor:function(appId,replaceId,option){Html5Player._super._constructor.call(this);this._ERROR_FORMAT="[LIVE.IO.PLAYER-H5]ERROR:[%s]";this._DLOG_FORMAT="[LIVE.IO.PLAYER-H5]LOG:%s";this._replaceId=replaceId;this._APP_ID=appId;this._player=null;this._controlBar=true;this._playerOption={width:option.width,height:option.height};return this},init:function(){return this},_replaceVideo:function(cb){var elem=document.getElementById(this._replaceId),className=elem.className,w=this._playerOption.width,h=this._playerOption.height,player=document.createElement("video");if(!player.canPlayType(_MIME_M3U8)){this._error(5e3,"当前浏览器不支持m3u8 MIME:application/vnd.apple.mpegurl");player=null}else{player.setAttribute("width",w);player.setAttribute("height",h);if(this._controlBar){player.setAttribute("controls","controls")}player.className=className;elem.parentNode.replaceChild(player,elem);player.setAttribute("id",this._replaceId);this._player=player;cb.call(this)}return this},_bindVideoEvent:function(){var p=this._player,_this=this;addEvent(p,"play",function(){_this.emit("startLive");_this._dLog("开始播放")});addEvent(p,"pause",function(){_this.emit("stopLive");_this._dLog("停止")});addEvent(p,"canplay",function(){_this.emit("canplay");_this._dLog("缓冲完毕开始播放")});util.each(LOADING_START_EVENTS,function(e){addEvent(p,LOADING_START_EVENTS[e],function(){_this.emit("loadingStart")})});util.each(LOADING_END_EVENTS,function(e){addEvent(p,LOADING_END_EVENTS[e],function(){_this.emit("loadingEnd")})});return this},launch:function(){var _this=this;this._replaceVideo(function(){_this._bindVideoEvent();_this.emit("launchSuccess");_this._dLog("初始化成功")});return this},startLive:function(streamId,token){var p=this._player,_this=this;util.jsonp(_STEAM_URL,{app_id:this._APP_ID,player_type:"h5",stream_id:streamId,token:token},function(d){if(d.error_code==0){_this._dLog("流地址请求成功",d.url_list[0].url);p.setAttribute("src",d.url_list[0].url);p.play()}else{_this._error(2002,"获取播放地址失败server_error_code"+d.error_code)}});return this},startLiveByAlias:function(alias,token){var p=this._player,_this=this;util.jsonp(_STEAM_URL,{app_id:this._APP_ID,player_type:"h5",alias:alias,token:token},function(d){if(d.error_code==0){_this._dLog("流地址请求成功",d.url_list[0].url);p.setAttribute("src",d.url_list[0].url);p.play()}else{_this._error(2002,"获取播放地址失败server_error_code"+d.error_code)}});return this},stopLive:function(){this._player.pause();return this},changeVideoSize:function(width,height){var p=this._player;if(p){p.setAttribute("width",width);p.setAttribute("height",height);this._playerOption.width=width;this._playerOption.height=height}return this}});liveIO.createHtml5Player=function(appId,replaceId,option){return new Html5Player(appId,replaceId,option||{}).init()}})(liveIO,liveIO.util);(function(liveIO,util){var Player=util.Listener.extend({_constructor:function(appId,replaceId,option){Player._super._constructor.call(this);this._ERROR_FORMAT="[LIVE.IO.PLAYER]ERROR:[%s]";this._DLOG_FORMAT="[LIVE.IO.PLAYER]LOG:%s";this._replaceId=replaceId;this._APP_ID=appId;this._flashOption={width:option.width||"100%",height:option.height||"100%",src:option.src,roomId:option.symbol,allowFullScreen:option.fullScreen==undefined?1:option.fullScreen?1:0,ex:{},callbackNamespace:option.callbackNamespace||_SWF_CALL_BACK_NAMESPACE_PREFIX+(new Date).getTime()};this.setTitleList(option.titleList||["高清","标清","流畅"]);this.setDefaultQuality(option.defaultQuality||3);this.setPToPStatus(option.p2p||0);this._player=null;this._flashParams=option.flashParams||{};this._playerHasInit=false;return this},init:function(){this._initPluginInterface();return this},_initPluginInterface:function(){var interFace={},_this=this,width=_this._flashOption.width,height=_this._flashOption.height;interFace.playerLoadCompleted=function(){_this._dLog("初始化成功");if(width=="100%"){width=_this._player.clientWidth}if(height=="100%"){height=_this._player.clientHeight}_this._player["init"]({appId:_this._APP_ID,width:width,height:height,roomId:_this._flashOption.roomId,userAgent:window.navigator.userAgent,sdkVersion:liveIO.version,allowFullscreen:_this._flashOption.allowFullScreen,ex:_this._flashOption.ex,debug:_this._OPEN_DEBUGG?1:0});_this._playerHasInit=true;_this.emit("launchSuccess")};interFace.stopLive=function(){_this._dLog("停止");_this.emit("stopLive")};interFace.liveStatus=function(code,desc){switch(code){case"1111":_this._dLog(desc);break;case"2222":_this._dLog(desc);break;case"3333":_this._dLog(desc);_this.emit("startLive");break;default:_this._error(code,desc)}};window[this._flashOption.callbackNamespace]=interFace;return this},_replaceFlash:function(){var _this=this,o=this._flashOption;util.swf.embedSWF(o.src,this._replaceId,o.width,o.height,_SWF_VERSION,_SWF_INSTALL,{callbackNamespace:_this._flashOption.callbackNamespace},_SWF_PARAM,{name:this._replaceId,allowFullScreenInteractive:"true"},function(){_this._player=document.getElementById(_this._replaceId)});return this},setTitleList:function(titleList){if(titleList&&titleList.length>0){this._flashOption.titleList=titleList;this._flashOption.enableNum=titleList.length;if(this._flashOption.defaultQuality>this._flashOption.enableNum){this._flashOption.defaultQuality=this._flashOption.enableNum}}return this},setDefaultQuality:function(defaultQuality){if(defaultQuality<=this._flashOption.enableNum){this._flashOption.defaultQuality=defaultQuality}return this},setPToPStatus:function(flag){this._flashOption.p2p=flag;return this},launch:function(){this._replaceFlash();if(!util.hasFlash){this._error(5e3,"没有安装Flash插件")}return this},startLive:function(streamId,token,titleList,defaultQuality,p2pFlag){if(titleList){this.setTitleList(titleList)}if(defaultQuality){this.setDefaultQuality(defaultQuality)}if(p2pFlag!=undefined){this.setPToPStatus(p2pFlag)}this._dLog("流ID播放，streamId:"+streamId+",token:"+token);this._player["startLive"]({streamId:streamId+"",token:token,titleList:this._flashOption.titleList,enableNum:this._flashOption.enableNum,defaultQuality:this._flashOption.defaultQuality,p2p:this._flashOption.p2p});return this},startLiveByAlias:function(alias,token,titleList,defaultQuality,p2pFlag){if(titleList){this.setTitleList(titleList)}if(defaultQuality){this.setDefaultQuality(defaultQuality)}if(p2pFlag!=undefined){this.setPToPStatus(p2pFlag)}this._dLog("别名播放，Alias:"+alias+",token:"+token);this._player["startLive"]({alias:alias+"",token:token,titleList:this._flashOption.titleList,enableNum:this._flashOption.enableNum,defaultQuality:this._flashOption.defaultQuality,p2p:this._flashOption.p2p});return this},stopLive:function(type){this._player["stopLive"](type);return this},changeVideoSize:function(width,height){if(this._player){this._dLog("改变OBJECT元素大小["+width+"]["+height+"]");this._player.width=width;this._player.height=height;if(width=="100%"){width=this._player.clientWidth}if(height=="100%"){height=this._player.clientHeight}this._flashOption.width=width;this._flashOption.height=height;this.setPlayerWH(width,height)}return this},setPlayerWH:function(width,height){try{this._dLog("改变Flash绘制窗口大小["+width+"]["+height+"]");this._player["exSetPlayerWH"]({width:width,height:height})}catch(e){this._dLog("改变Flash绘制窗口大小失败",e)}return this},mute:function(flag){flag=flag?1:0;try{this._player["exMute"](flag)}catch(e){this._dLog("静音失败",e)}return this},getVolume:function(){var volume=0;try{volume=this._player["getVolume"]()}catch(e){volume=CONST.NaN;this._dLog("获取音量失败",e)}return volume},setVolume:function(volume){try{this._dLog("设置音量:"+volume);this._player["exVolumeChange"](volume)}catch(e){this._dLog("设置音量失败",e)}return this},showCtrBar:function(){this._dLog("showCtrBar");this._player["exShowCtrBar"](1);return this},hideCtrBar:function(){this._dLog("hideCtrBar");this._player["exShowCtrBar"](0);return this},destroy:function(){this._player&&this._player.parentNode.removeChild(this._player);delete window[this._flashOption.callbackNamespace];this._player=null;this.emit("destroy");this._dLog("destroyed")}});liveIO.createPlayer=function(appId,replaceId,option){return new Player(appId,replaceId,option||{}).init()}})(liveIO,liveIO.util);(function(liveIO,util){function AttachIE11Event(obj,_strEventId,_functionCallback){
var paramsFromToStringRegex=/\(\)|\([^\)]+\)/;var params=_functionCallback.toString().match(paramsFromToStringRegex)[0];var functionName="window."+PLUGIN_INTERFACE_NAME+"."+_strEventId;var handler;try{handler=document.createElement("script");handler.setAttribute("for",obj.id)}catch(ex){handler=document.createElement('<script for="'+obj.id+'">')}handler.event=_strEventId+params;handler.appendChild(document.createTextNode(functionName+params+";"));document.body.appendChild(handler)}var Plugin=util.Listener.extend({_constructor:function(appId,replaceId,option){Plugin._super._constructor.call(this);this._ERROR_FORMAT="[LIVE.IO.PLUGIN]ERROR:[%s]";this._DLOG_FORMAT="[LIVE.IO.PLUGIN]LOG:%s";this._APP_ID=appId;this._replaceId=replaceId;this._pluginOption={width:option.width||100,height:option.height||100};this._plugin=null;this._onLive=false;return this},init:function(){this._plugin=this._createPluginObject();this._initPluginInterface();return this},_createPluginObject:function(){var elem=document.getElementById(this._replaceId),className=elem.className,w=this._pluginOption.width,h=this._pluginOption.height,plugin;if(util.browser.OLD_IE){elem.outerHTML='<object id="'+this._replaceId+'" width="'+w+'" height="'+h+'"></object>';plugin=document.getElementById(this._replaceId);var ieGoDie=plugin.clientHeight;plugin.setAttribute("classid",PLUGIN_CLASS_ID)}else{if(util.browser.NEW_IE){plugin=document.createElement("object");plugin.setAttribute("classid",PLUGIN_CLASS_ID)}else{plugin=document.createElement("embed");plugin.setAttribute("type",PLUGIN_MIME_TYPE)}plugin.setAttribute("id",this._replaceId);plugin.setAttribute("width",w);plugin.setAttribute("height",h);elem.parentNode.replaceChild(plugin,elem)}plugin.className=className;return plugin},_initPluginInterface:function(){var _this=this,plugin=this._plugin;var interFace={ReceiveDevices:function(videoData,audioData){if(util.type(videoData)==="string"){videoData=util.parseJSON(videoData)}if(util.type(audioData)==="string"){audioData=util.parseJSON(audioData)}_this._dLog("获取设备列表成功");_this._dLog("视频列表：",videoData);_this._dLog("音频列表：",audioData);_this.emit("launchSuccess",videoData,audioData)},OnSetDeviceResult:function(code,desc,res){if(code==0){_this._error(5002,desc)}else{res=_this._ParamToJSON(res);res.volume=parseFloat(res.volume)+"";_this._dLog("设置设备成功");_this._dLog("码率"+res.biterate);_this._dLog("设备音量"+res.volume);_this._dLog("分辨率"+res.resolution);_this.emit("setDevices",res)}},ReceiveVolume:function(value){_this._dLog("设置设备音量成功"+value);_this.emit("setVolume",value)},UploadSuccessDone:function(){if(_this._onLive){_this.emit("reConnect");_this._dLog("重新与流媒体建立连接")}else{_this.emit("startLive");_this._dLog("上传启动成功");_this._onLive=true}_this.emit("startUpload");_this._dLog("开始上传")},NotifyError:function(code,desc){if(code==0){_this._onLive=false}_this._error(code,desc)},PromptHint:function(text){_this.emit("promptHint",text)},ReportStatus:function(clientInfo,dataInfo){_this.emit("reportStatus",clientInfo,dataInfo)},StopDone:function(){_this._onLive=false;_this.emit("stopLive");_this._dLog("采集上传已关闭")}};if(util.browser.IE){if(util.browser.NEW_IE){window[PLUGIN_INTERFACE_NAME]=interFace;util.each(interFace,function(name,fun){AttachIE11Event(plugin,name,fun)})}else{util.each(interFace,function(name,fun){if(plugin.attachEvent){plugin.attachEvent(name,fun)}else{plugin.addEventListener(name,fun,false)}})}}else{window[PLUGIN_INTERFACE_NAME]=interFace}},_ParamToJSON:function(urlParam){var res={};if(!urlParam){return null}urlParam=urlParam.split("&");util.each(urlParam,function(){var arr=this.split("=");res[arr[0]]=arr[1]});return res},getVersion:function(){try{return this._plugin.GetVersion()}catch(e){return null}},launch:function(){var error=0,max=2;while(error<=max){try{this._plugin.Launch(this._APP_ID,"0","{auto_sorted : false}");break}catch(e){if(error==max){this._error(5e3,"没有安装插件或者插件初始化失败")}error+=1}}return this},setDevices:function(videoId,audioId,ext){ext={effective:false};ext=util.stringifyJSON(ext);this._dLog("设置音视频设备,视频ID["+videoId+"],音频ID["+audioId+"]");this._plugin.SetDevice(parseInt(videoId),parseInt(audioId),ext);return this},setVolume:function(volume){this._dLog("设置设备音量["+volume+"]");this._plugin.SetVolume(volume);return this},startLive:function(streamId,uploadToken){this._dLog("启动上传");var param=util.stringifyJSON({stream_id:streamId,up_token:uploadToken,app_id:this._APP_ID});this._plugin.StartLive(param);return this},startPreview:function(){this._plugin.StartPreview(1);this._dLog("打开预览");return this},stopPreview:function(){this._plugin.StartPreview(0);this._dLog("关闭预览");return this},startLiveByAlias:function(alias,uploadToken){this._dLog("启动上传");var param=util.stringifyJSON({alias:alias,up_token:uploadToken,app_id:this._APP_ID});this._plugin.StartLiveByAlias(param);return this},stopLive:function(){this._plugin.StopLive();return this},setGain:function(value){this._plugin.SetGain(value);return this},setEqualizerMode:function(value){this._plugin.SetEqualizerMode(value);return this}});liveIO.createPlugin=function(appId,replaceId,option){return new Plugin(appId,replaceId,option||{}).init()}})(liveIO,liveIO.util);if(global.define&&global.seajs&&global.seajs.use){global.define(function(r,e,m){m.exports=liveIO})}else{global.liveIO=liveIO}})(window,undefined);