var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var pal = [];
var palCharset = "!@#$%^&*()_+QWERTYUIOP{}ASDFGHJKL:";
var palTemMap
var Cx = 0, Cy = 0;
var vCx, vCy, Mx, My, scale, palf, palc, palssa;
var t = 0; // regular time (ignore this)
var bckTemplates = {};
if (location.href== "https://motherbggenerator.dateplays.repl.co/") location.href= "https://ebgg.dateplays.repl.co/"
function load() {
  fetch("bckTemplates.js")
    .then(data => data.text())
    .then((body) => {
      try {
        eval(body);
        let send = ` <label for="selectorica">select template: </label><select name="selectorica" id="selectorica" value="tester">`
        var tems = Object.keys(bckTemplates.tem).sort();
        for (i in tems) {
          if (bckTemplates.tem[tems[i]].hidden) continue;
          send += `<option value="${tems[i]}">${tems[i]}</option>`;
          console.log(`loaded option ${tems[i]} successfully`);
        }
        send += `</select>`;
        document.getElementById("selector").innerHTML = send;
        document.getElementById("selector").setAttribute("oninput", `bckTemplates.loader(document.getElementById("selectorica").value)`);
        bckTemplates.loader(tems[0]);
      } catch (e) {
        logError(e);
      }
    })
}; load();
setInterval( function (){
  try {
    update()
  } catch (e) {
    ctx.fillStyle = "#000000";
    ctx.fillText(e, 5, 5);
  }
}, 1000/24 );
function logError(e) {
  document.getElementById("loger").innerText += `${e}\n`;
}

function update() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, c.width, c.height);
  let width = palTemMap.split("\n")[0].length;
  let height = palTemMap.split("\n").length;
  let content = palTemMap.split("\n");
  for (let y = 0; y < c.height / scale.y; y++) {
    Mx.temp = Math.sin((Mx.time + y) * Mx.freq) * Mx.value;
    My.temp = Math.sin((My.time + y) * My.freq) * My.value;
    drawline(y, width, height, content, "");
  }
  if (palc && t % palf == 0) {
    let temp = pal.splice(0, palssa);
    if (!palcreverse) {
      pal.unshift(pal.pop());
    } else {
      pal.push(pal.shift());
    }
    pal.unshift(temp);
    pal = pal.flat();
  }
  Cx += vCx;
  Cy += vCy;
  Mx.time++;
  My.time++;
  t++;
}
function drawline(y, width, height, content) {
  for (let x = 0; x<c.width / scale.x ;x++) {
    let current = content[rem(y + My.temp + Cy + My.offset, height)][rem(x + Mx.temp*(interl(y, Mx.interl)) + Cx + Mx.offset, width)];
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

function interl(y, int) {
  if (!int) return 1;
  return (y%2==0)*2-1;
} 

let bm = {}
bm.square= function () {
  let send = [];
  let map = `00000000000
01111111110
01222222210
01233333210
01234443210
01234543210
01234443210
01233333210
01222222210
01111111110
00000000000`;
  map = map.split("\n");
  for (i in "!@#$%^&*()_+QWERTYU") {
    for (j in map) {
      for (k in map[j]) {
        send[j] += palCharset[~~map[j][k] + ~~i];
      }
    }
  }
  return send.join("\n")
}
