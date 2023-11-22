var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var pal = [];
var palTemplates = {};
var palCharset = "!@#$%^&*";
var palTemMaps = [
  `!!!!!!@!!!!!!!!!!#!!!!!!!!!!$!!!!!!!!!!%!!!!!!!!!!^!!!!!!!!!!&!!!!!!!!!!*!!!!!!
!!!!!@@@!!!!!!!!###!!!!!!!!$$$!!!!!!!!%%%!!!!!!!!^^^!!!!!!!!&&&!!!!!!!!***!!!!!
!!!!@@@@@!!!!!!#####!!!!!!$$$$$!!!!!!%%%%%!!!!!!^^^^^!!!!!!&&&&&!!!!!!*****!!!!
!!!@@@@@@@!!!!#######!!!!$$$$$$$!!!!%%%%%%%!!!!^^^^^^^!!!!&&&&&&&!!!!*******!!!
!!@@@@@@@@@!!#########!!$$$$$$$$$!!%%%%%%%%%!!^^^^^^^^^!!&&&&&&&&&!!*********!!
!@@@@@@@@@@@###########$$$$$$$$$$$%%%%%%%%%%%^^^^^^^^^^^&&&&&&&&&&&***********!
!!@@@@@@@@@!!#########!!$$$$$$$$$!!%%%%%%%%%!!^^^^^^^^^!!&&&&&&&&&!!*********!!
!!!@@@@@@@!!!!#######!!!!$$$$$$$!!!!%%%%%%%!!!!^^^^^^^!!!!&&&&&&&!!!!*******!!!
!!!!@@@@@!!!!!!#####!!!!!!$$$$$!!!!!!%%%%%!!!!!!^^^^^!!!!!!&&&&&!!!!!!*****!!!!
!!!!!@@@!!!!!!!!###!!!!!!!!$$$!!!!!!!!%%%!!!!!!!!^^^!!!!!!!!&&&!!!!!!!!***!!!!!
!!!!!!@!!!!!!!!!!#!!!!!!!!!!$!!!!!!!!!!%!!!!!!!!!!^!!!!!!!!!!&!!!!!!!!!!*!!!!!!`
];
var Cx = 0, Cy = 0;
var vCx = 0, vCy = 2;
var Mx = {
  "value": 4,
  "freq": 0.05,
  "temp": 0,
  "time": 0,
  "offset": 0,
}
var My = {
  "value": 15,
  "freq": 0.2,
  "temp": 0,
  "time": 0,
  "offset": -15,
}
var scale = {
  "x": 3,
  "y": 2,
}
fetch("palTemplates.json")
  .then(data => data.text())
  .then((body) => {
    try {
      palTemplates = JSON.parse(body);
      pal = palTemplates[0].data;
      setInterval( update, 1000/10 );
    } catch (e) {
      logError(e);
    }
  })

function logError(e) {
  document.getElementById("loger").innerText += `${e}\n`;
}

function update() {
  Mx.temp = Mx.time;
  My.temp = My.time;
  for (let y = 0; y < c.height / scale.y; y++) {
    Mx.temp = Math.sin((Mx.time + y) * Mx.freq) * Mx.value + Mx.offset;
    My.temp = Math.sin((My.time + y) * My.freq) * My.value + My.offset;
    drawline(y);
  }
  // pal.unshift(pal.pop());
  Cx += vCx;
  Cy += vCy;
  Mx.time++;
  My.time++;
}
function drawline(y) {
  for (let x = 0; x<c.width / scale.x ;x++) {
    let width = palTemMaps[0].split("\n")[0].length;
    let height = palTemMaps[0].split("\n").length;
    let current = palTemMaps[0].split("\n")[rem(y + My.temp + Cy, height)][rem(x + Mx.temp + Cx, width)];
    ctx.fillStyle = pal[palCharset.indexOf(current)];
    drawPixel((x * scale.x) % c.width, (y * scale.y) % c.height);
  }
}
function drawPixel(x, y) {
  ctx.fillRect(Math.floor(x), Math.floor(y), scale.x, scale.y);
}

function rem(x, n) {
  return Math.round(x - Math.floor(x/n)*n) % n
}