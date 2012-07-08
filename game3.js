enchant();

window.onload = function() {
  var game = new Game(480,320);
  //game.preload('pipo-charachip001.png');
  game.onload = function() {
    sceneTitle = new SceneTitle();
    sceneField = new SceneField();
    game.pushScene(sceneTitle);
    /*//{{{
    var map = new Sprite(32,32);
    map.image = game.assets['pipo-charachip001.png'];
    map.x = 0;
    map.y = 0;
    map.frame = 9;
    game.rootScene.addChild(map);
    *///}}}
  };
  game.start();
};

SceneTitle = enchant.Class.create(enchant.Scene);//{{{
SceneTitle.prototype.initialize = function(){
  enchant.Scene.call(this);
  this.backgroundColor = "white";
  var title = new Label();
  title.text = "Title";
  title.color = "blue";
  title.x = 100;
  title.y = 100;
  title.addEventListener("touchend", function(){
    console.log("title label touched");
    enchant.Game.instance.replaceScene(sceneField);
  });
  this.addChild(title);
};//}}}

SceneField = enchant.Class.create(enchant.Scene);//{{{
SceneField.prototype.initialize = function(){
  enchant.Scene.call(this);
  var title = new Label();
  title.text = "Field";
  title.color = "green";
  title.x = 10;
  title.y = 10;
  title.addEventListener("touchend", function(){
    console.log("field label touched");
    //game.pushScene(game.rootScene);
  });
  this.addChild(title);
  var listBox1 = new ListBox(["test1", "test2"], 100, 100);
  listBox1.x = 20;
  listBox1.y = 30;
  this.addChild(listBox1);
  /*//{{{
  this.addEventListener("touchend", function(){
    console.log("field scene touched");
  });
  *///}}}
};//}}}

ListBox = enchant.Class.create(enchant.Group);
ListBox.prototype.initialize = function(list, width, height, onSeclected){
  enchant.Group.call(this);
  var frame = util.createFrame(width, height);
  var lab = new Label("");
  lab.x = 10;
  lab.y = 10;
  lab.color = "white";
  //lab.text = "test";
  //this.onSelected = onSelected;
  this.onChange = function(){};
  this.lab = lab;
  this.focus = false;
  this.addChild(frame);
  this.addChild(lab);
  this.updateText(list);
  lab.text = this.defaultText;
};
/*
ListBox.prototype.onUp = function(){//{{{
  if (this.focus || this.selected <= 0)
    return;
  this.selected -= 1;
  this.lab.text = this.selectedTexts[this.selected];
  this.onChange(this.selected);
};//}}}
ListBox.prototype.onDown= function(){//{{{
  if (this.focus || this.selected >= this.selectedTexts.length -1)
    return;
  this.selected += 1;
  this.lab.text = this.selectedTexts[this.selected];
  this.onChange(this.selected);
};//}}}
ListBox.prototype.onRight = function(){//{{{
  if (!this.focus)
    return;
  this.onSelected(this.selected);
};//}}}
ListBox.prototype.focus = {//{{{
  get: function(){
    return this._focus;
  },
  set: function(val){
    this._focus = val;
    if(val)
      this.lab.text = this.selectedTexts[this.selected];
    else
      this.lab.text = this.defaultText;
  },
};//}}}
*/
ListBox.prototype.updateText = function(list){//{{{
  var defaultText = list.map(function(e) { return "  "+ e }).join("<br/>");
  this.defaultText = defaultText;
  /*
  var selectedTexts = list.map(function(ee, i, arrr) {
    return list.map(function(e, j, arr) {
      return (i == j ? "→" : "　") + e;
    }).join(<"<br/>")
  });
  */
  var ret = "";
  for (var i = 0; i < list.length; i++) {
    for (var j = 0; j < list.length; j++) {
      if( i == j ){
        ret = ret + ("→" + list[j] + "<br/>")
      } else {
        ret = ret + ("  " + list[j] + "<br/>")
      }
    }
  };
  var selectedTexts = ret;
  this.selectedTexts = selectedTexts;
  this.selected = 0;
  this.focus = this.focus;
};//}}}
/*
ListBox.prototype.visible = {//{{{
  set: function(val){
    this.childNodes.forEach(function(e){ e.visible = val});
  }
};//}}}
*/

var util = {};
util.createFrame = function(width, height){//{{{
  var sur = new Surface(width, height);
  var ctx = sur.context;
  ctx.radius = 20;
  ctx.lineWidth = 4;
  ctx.strokeStyle = "white";
  ctx.rect(0, 0, width, height);
  ctx.stroke();
  var frame = new Sprite(width, height);
  frame.backgroundColor = "black";
  frame.image = sur;
  return frame;
};//}}}

