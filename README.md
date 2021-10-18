# Sample Tini Game

A sample mini game on Tiki is developed using Tini App.

### To get started with the repo

First, ensure you have the [latest `Tini App Studio`](<https://tiniapp-media.tikicdn.com/tini-studio/prod/1.14.128/macosx/Tini App Studio-v1.14.128.dmg>).

```sh
$ git clone git@github.com:tikivn/tiniapp-game-examples.git
```

Then, open the `tiniapp-game-example` with Tini App Studio.

For any change, to trigger rebuild the app:
* For files in public folder: `Tools > Compile`
* For others: TiniApp studio will auto reload the code.

### Code Structure

Tini Game is a simple TiniApp with a page uses <game-view> component of Tini App Framework:

```
- src/                        
 |- pages/                    
  |- index/                   
   |  index.js                
   |  index.json              
   |  index.tcss              
   |  index.txml              
 |- public/                   
  |+ assets/                  
  |+ src/                     
 |  app.js                    
 |  app.json                  
 |  app.tcss                  
  .gitignore                  
  package.json                
  README.md                   
```

* **pages, app.js, app.json**: is framework structure a tiniapp, [more info](https://developers.tiki.vn/docs/framework/overview)
* **public**: is folder to keep h5 game entry file and related assets. The component <game-view>, will automatically load `index.html` file in this folder.

### Game View

Game View is a view container and is optimized to run H5 game on Tiki. For index.html file is loaded in game view you can access [Tiki's JSAPI](https://developers.tiki.vn/docs/api/overview) as below:

```js
<script>
  my.navigateTo({ url: 'pages/user-info/index' });
  my.postMessage('ping');
  my.getUserInfo({
    success: function (userInfo) {
      alert(JSON.stringify(userInfo));
    }
  })
  my.getSystemInfo({
    success: function (result) {
      alert('getSystemInfo' + JSON.stringify(result));
    }
  });
</script>
```

or you can postMessage to send message to tiniapp page and can access more JSAPI:

index.txml
```xml
<game-view id="game-view" onMessage="onMessage" />
```

index.js
```javascript
Page({
  onMessage(e) {
    console.log(e.detail.data); // it will log "ping" to console
    const webview = my.createWebViewContext('web-view1');
    webview.postMessage('pong');
  }
});
```

### Publish app

For publish the game to run on Tiki:
1. First you need create [developer account](https://developers.tiki.vn/docs/developer/introduce/register) and [a TiniApp](https://developers.tiki.vn/docs/developer/introduce/create)
2. Change `appIdentifier` to the App ID you create on above step.
3. Click `Upload` icon on the right conrner of TiniApp Studio or use menu `Tools > Upload App` to upload app to Tini App Developer Center.
4. Folow [this guide](https://developers.tiki.vn/docs/developer/introduce/release) for app oeprating.

### NOTES:

* For Game export from cocos it uses `cc.view.enableAutoFullScreen(true)` to trigger fullscreen on some browsers. You need to disable it to avoid strangle behaviours on Tiniapp.
