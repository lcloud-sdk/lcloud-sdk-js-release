# 來疯直播平台 lclould-sdk-js  
> Javascript SDK  

* SDK  
* plugin  
* flash  

***


## 简介
一套用于web开发的sdk，基于來疯公共平台。提供视频上传（浏览器插件），播放（flash）以及一些工具。
  
## SDK
最新以及历史版本请访问[SDK release](https://github.com/lcloud-sdk/lcloud-sdk-js-release/releases)  
  
## 下载播放器以及插件
请访问[公共平台页面](#)  
或联系我们  


## liveIO
对外暴露接口的命名空间，如果使用seajs等模块加载工具 module.exports = liveio   

* liveIO._MODE [deploy|develop]
* liveIO.vsersion 当前sdk版本
* liveIO.util 工具包

### liveIO.util
* util.hasFlash 浏览器是否装有Flash插件
* util.browser 判断浏览器
  * browser.IE 是否是IE
  * browser.OLD_IE IE10以及以下
  * browser.NEW_IE IE11及以上
  * browser.FF FireFox
  * browser.Chrome Chrome

#### util.parseJSON(string)
字符串转换为json对象
#### util.stringifyJSON(object)
json对象转换为字符串
#### util.type(any)
判断 ````any```` 类型 用法参照jQuery.type
#### util.each(some, callback)
````some [Array|Object]````遍历some 用法参照jQuery.each
#### util.jsonp(url, data, callback)
提供基本的jsonp请求 
 
````javascript
	liveIO.util.jsonp('some/api', {foo : 'foo'}, function(d){
		console.log(d);
	});
````
#### util.version.compareVersion(version, otherVersion)
````version [String] //like '2.3.1.5'````提供x.x.x.x类型的版本号判断  

````javascript
	util.version.compareVersion('0.0.0.1', '0.0.0.1'); //0
	util.version.compareVersion('0.0.0.2', '0.0.0.1'); //1
	util.version.compareVersion('0.0.0.1', '0.0.0.2'); //-1
````  
#### Class util.BaseClass
提供基本的类继承

````javascript
	var subClass = liveIO.util.BaseClass.extend({
		constructor : subClass,
        _constructor : function(){
            //构造方法
            return this;
        },
        method : function(){
            return this;
        }
        ......
	});
````
#### Class util.Listener extend util.BaseClass
增加了事件队列

* util.Listener.on(eventName, callback);
* util.Listener.emit(eventName, parma ...);

## 播放器 

### liveIO.createPlayer(appId, replaceId, option)
> extend util.Listener  
 
获取一个player实例

* appId ````[String]```` 应用id
* replaceId ````[String]```` 为了方便定位，flash会替换以 replaceId 为id的元素
* option ````[Object]````
  * width ````[Number]```` 如果不传入宽，将设置为100%
  * height ````[Number]```` 如果不传入高，将设置为100%
  * src ````[String]```` flash路径
  * symbol ````[String]```` 唯一标识 用来统计
  * fullScreen ````[Bollean]```` 是否开启全屏功能

### events
* launchSuccess launch成功后表示所有flashAPI已经加载
* startLive	开始播放
* stopLive 停止播放
* destroy 销毁
* error
  * code ````[Number]```` 请参照错误码小节
  * desc ````[String]```` 错误描述


### player
#### player.launch()
初始化  
一些事件绑定可以在launch之前进行
#### player.startLive(streamId, token)
用streamId播放  

* streamId ````[String]````
* token ````[String]````

#### player.startLiveByAlias(alias, token)
用alias别名播放

* alias ````[String]````
* token ````[String]````


#### player.stopLive()
停止
#### player.setPlayerWH(width, height)
改变flash绘制窗口大小

* width ````[Number]````
* height ````[Number]````

#### player.mute(flag)
静音
#### player.getVolume()
返回音量
#### player.setVolume(volume)
设置音量
#### player.showCtrBar()
#### player.hideCtrBar()
显示隐藏控制条
#### player.destroy()
销毁播放器
### 错误码
* 1000 获取调度列表失败 io错误引发
* 1001 获取调度列表失败 安全沙箱问题
* 1002 获取调度列表的JSON格式错误
* 2000 获取播放地址失败 io错误引发
* 2001 获取播放地址失败 安全沙箱问题
* 2002 获取播放地址的JSON格式错误
* 3000 流不存在
* 5000 没有安装flash插件 通过LiveIO.util.hasFlash来判断

### 示例

````javascript
    //会在页面上替换id为player的元素
    var player = liveIO.createPlayer('appid', 'player', {
         width : 100,
         height : 100,
         src : 'http://static.youku.com/ddshow/0d791f3b/liveio/LFplayer.swf'
    });
    //进行事件绑定
    player.on('launchSuccess', function(){
        player.startLive('82732', '8asbsal8172m1n293n2b3h2');
    });
    player.on('error', function(code, desc){
        ....
    });
    //初始化播放器
    player.launch();
````


## 上传插件

### liveIO.createPlugin(appId, replaceId, option)
> extend util.Listener   
> 由于Chrome 45 版本后 彻底废弃了NPAPI 插件 暂时无法在Chrome 45 以后的版本中运行 

获取一个player实例

* appId ````[String]```` 应用id
* replaceId ````[String]```` 为了方便定位，插件会替换以 replaceId 为id的元素
* option ````[Object]````
  * width ````[Number]```` 如果不传入宽，将设置为100px
  * height ````[Number]```` 如果不传入高，将设置为100px

### events
* launchSuccess launch成功后表示所有flashAPI已经加载
  * videoData ````[Array]```` 视频设备列表
  * audioData ````[Array]```` 音频设备列表
* setDevices 设置好音视频设备后的回调
  * res ````[Object]```` 返回以下设置结果:
    * .volume 音量
    * .biterate 码率
    * .resolution 分辨率
* setVolume 设置设备音量成功回调
  * volume ````[Number]```` 返回设置结果
* reConnect 重新与流媒体建立连接
* startLive	上传启动成功
* startUpload 开始上传
* stopLive 关闭采集上传
* promptHint 插件提示信息
  * text ````[String]```` 插件传递信息
* reportStatus 插件上报上传状态
  * clientInfo ````[Object]```` 用户信息
  * dataInfo ````[Object]```` 插件信息 
* error
  * code ````[Number]```` 请参照错误码小节
  * desc ````[String]```` 错误描述
  
### plugin
#### plugin.getVersion()
返回插件版本号
#### plugin.launch()
初始化插件
#### setDevices(videoId, audioId)

* videoId ````[String]```` 视频设备ID
* audioId ````[String]```` 音频设备ID

> 从setDivce回调参数里面可以获取

#### plugin.setVolume(volume)
设置音量
#### plugin.startLive(streamId, token)
用streamId上传  

* streamId ````[String]````
* token ````[String]````

#### plugin.startLiveByAlias(alias, token)
用alias别名上传

* alias ````[String]````
* token ````[String]````

#### plugin.stopLive()
停止

#### plugin.startPreview() plugin.stopPreview()
打开关闭预览 
>在关闭预览时，如果在上传中，会停止上传  
>一般不会用到这两个方法，因为setDevices 会自动打开预览 stopLive也会关闭预览
  
### 错误码
* 5000 没有安装插件 通过 getVersion 来判断的
* 5001 初始化失败
* 5002 设置设备失败
* 1001 无效流ID
* 1002 无效token
* 1003 请求总控失败
* 1004 解析上传调度地址失败
* 1005 请求上传调度失败
* 1006 解析上传地址失败
* 1007 连接上传服务器失败

### 示例

````javascript
    //会在页面上替换id为plugin的元素
    var plugin = liveIO.createPlugin('appId', 'plugin', {
         width : 100,
         height : 100
    });
    //事件委托 在launch前进行
    plugin.on('launchSuccess', function(videoData, audioData){
        //判断version
        if(!checkVersion(plugin.getVersion())){
           alert('请下载最新插件');
           return false;
        }
        //判断设备齐全
        if(videoData.length > 0 && audioData.length > 0){
             plugin.setDevices(videoData[0]['id'], audioData[0]['id']);
        }else{
            alert('无法获取到音视频设备，快去买设备去');
        }
    });
    .....
    .....
    .....
    plugin.on('setDevices', function(res) {
        //获取streamId 以及 token 后就可以上传
    });
    plugin.on('error', function(code, desc){
        if(code == 5000){
           alert('请下载插件');
        }else{
          alert('哎呀，出错了[' + code +']' + desc);
        }
    });
    //初始化插件
    plugin.launch();
````










