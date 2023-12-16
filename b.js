let sgenp = function () {
  function rawToHex(raw) {
    var hex = "";
    var hexChars = "0123456789abcdef";
    for (var i = 0; i < raw.length; i++) {
      var c = raw.charCodeAt(i);
      hex += hexChars.charAt(c >>> 4 & 15) + hexChars.charAt(c & 15);
    }
    return hex;
  }
  function binaryToRaw(bin) {
    var raw = "";
    for (var i = 0, il = bin.length * 32; i < il; i += 8) {
      raw += String.fromCharCode(bin[i >> 5] >>> 24 - i % 32 & 255);
    }
    return raw;
  }
  function sha1Binary(bin, len) {
    bin[len >> 5] |= 128 << 24 - len % 32;
    bin[(len + 64 >> 9 << 4) + 15] = len;
    var w = new Array(80);
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    var e = -1009589776;
    for (var i = 0, il = bin.length; i < il; i += 16) {
      var _a = a;
      var _b = b;
      var _c = c;
      var _d = d;
      var _e = e;
      for (var j = 0; j < 80; j++) {
        if (j < 16) {
          w[j] = bin[i + j];
        } else {
          w[j] = (w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16]) << 1 | (w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16]) >>> 31;
        }
        var t = _add(_add(a << 5 | a >>> 27, _ft(j, b, c, d)), _add(_add(e, w[j]), _kt(j)));
        e = d;
        d = c;
        c = b << 30 | b >>> 2;
        b = a;
        a = t;
      }
      a = _add(a, _a);
      b = _add(b, _b);
      c = _add(c, _c);
      d = _add(d, _d);
      e = _add(e, _e);
    }
    return [a, b, c, d, e];
  }
  function _add(x, y) {
    var lsw = (x & 65535) + (y & 65535);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return msw << 16 | lsw & 65535;
  }
  function _ft(t, b, c, d) {
    if (t < 20) {
      return b & c | ~b & d;
    } else if (t < 40) {
      return b ^ c ^ d;
    } else if (t < 60) {
      return b & c | b & d | c & d;
    } else {
      return b ^ c ^ d;
    }
  }
  function _kt(t) {
    if (t < 20) {
      return 1518500249;
    } else if (t < 40) {
      return 1859775393;
    } else if (t < 60) {
      return -1894007588;
    } else {
      return -899497514;
    }
  }
  function rawToBinary(raw) {
    var binary = new Array(raw.length >> 2);
    for (var i = 0, il = binary.length; i < il; i++) {
      binary[i] = 0;
    }
    for (i = 0, il = raw.length * 8; i < il; i += 8) {
      binary[i >> 5] |= (raw.charCodeAt(i / 8) & 255) << 24 - i % 32;
    }
    return binary;
  }
  function stringToRaw(string) {
    var raw = "", x, y;
    var i = -1;
    var il = string.length;
    while (++i < il) {
      x = string.charCodeAt(i);
      y = i + 1 < il ? string.charCodeAt(i + 1) : 0;
      if (55296 <= x && x <= 56319 && 56320 <= y && y <= 57343) {
        x = 65536 + ((x & 1023) << 10) + (y & 1023);
        ++i;
      }
      if (x <= 127) {
        raw += String.fromCharCode(x);
      } else if (x <= 2047) {
        raw += String.fromCharCode(192 | x >>> 6 & 31, 128 | x & 63);
      } else if (x <= 65535) {
        raw += String.fromCharCode(224 | x >>> 12 & 15, 128 | x >>> 6 & 63, 128 | x & 63);
      } else if (x <= 2097151) {
        raw += String.fromCharCode(240 | x >>> 18 & 7, 128 | x >>> 12 & 63, 128 | x >>> 6 & 63, 128 | x & 63);
      }
    }
    return raw;
  }
  function hmacRaw(key, data) {
    var binaryKey = rawToBinary(key);
    if (binaryKey.length > 16) {
      binaryKey = sha1Binary(binaryKey, key.length * 8);
    }
    var ipad = new Array(16);
    var opad = new Array(16);
    for (var i = 0; i < 16; i++) {
      ipad[i] = binaryKey[i] ^ 909522486;
      opad[i] = binaryKey[i] ^ 1549556828;
    }
    var hash = sha1Binary(ipad.concat(rawToBinary(data)), 512 + data.length * 8);
    return binaryToRaw(sha1Binary(opad.concat(hash), 672));
  }
  var tests = {hmac: {fbdb1d1b18aa6c08324b7d64b71fb76370690e1d: ["", ""], de7c9b85b8b78aa6bc8a7a36f70a90701c9db4d9: ["key", "The quick brown fox jumps over the lazy dog"]}, sha1: {da39a3ee5e6b4b0d3255bfef95601890afd80709: "", "2fd4e1c67a2d28fced849ee1bb76e7391b93eb12": "The quick brown fox jumps over the lazy dog"}};
  return {sha1: function (s) {
    return rawToHex(binaryToRaw(sha1Binary(rawToBinary(stringToRaw(s)), stringToRaw(s).length * 8)));
  }, sha1Hex: function (value) {
    return rawToHex(binaryToRaw(sha1Binary(rawToBinary(this.hexToString(value)), this.hexToString(value).length * 8)));
  }, hmac: function (k, d) {
    return rawToHex(hmacRaw(stringToRaw(k), stringToRaw(d)));
  }, hexToString: function (hex) {
    var str = "";
    for (var i = 0, il = hex.length; i < il; i += 2) {
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str;
  }, test: function () {
    var success = true;
    for (var expectedOutput in tests.sha1) {
      if (tests.sha1.hasOwnProperty(expectedOutput)) {
        var input = tests.sha1[expectedOutput];
        var output = this.sha1(input).toLowerCase();
        if (output !== expectedOutput) {
          console.error("sha1(" + input + ") was " + output + " (expected: " + expectedOutput + ")");
          success = false;
        }
      }
    }
    for (var expectedOutput in tests.hmac) {
      if (tests.hmac.hasOwnProperty(expectedOutput)) {
        var input = tests.hmac[expectedOutput];
        var output = this.hmac(input[0], input[1]).toLowerCase();
        if (output !== expectedOutput) {
          console.error("hmac(" + input[0] + ", " + input[1] + ") was " + output + " (expected: " + expectedOutput + ")");
          success = false;
        }
      }
    }
    return success;
  }};
}();
let ds = ["5b9772c00a4f92de12c77aa3a64b960fc911ae61", "334389048b872a533002b34d73f8c29fd09efc50", "1830c04b73eb32c19866ed96b69ace2aa7023c85"];
let utm_medium = "notification";
function sg_fire_actions() {
  utm_medium = "notification-invalid";
  jQuery(document).ready(function (e) {
    let menu = jQuery(".toplevel_page_salesgen a");
    menu.each(function () {
      if (jQuery(this).attr("href").indexOf("upsell") > 0) {
        jQuery("body").append('<div class="notice" style="z-index:9999;width:100%;margin:0!important;position: fixed; right: 0; left:0; bottom:0; background-color: #2482fa; padding: 4px 20px;color:#fafafa;"><h3 style="line-height: 1.1em;color:#FFEB3B;display:block;z-index:999;padding:0;margin:0;">You are using invalid Upsell Blast license.</h3><p>License cá»§a báº¡n Ä‘Ã£ háº¿t háº¡n vui lÃ²ng gia háº¡n hoáº·c sá»­ dá»¥ng license má»›i Ä‘á»ƒ cÃ¡c tÃ­nh nÄƒng hoáº¡t Ä‘á»™ng trá»Ÿ láº¡i. LÆ°u Ã½, náº¿u báº¡n Ä‘Ã£ kÃ­ch hoáº¡t license mÃ  váº«n nhÃ¬n tháº¥y thÃ´ng bÃ¡o nÃ y, vui lÃ²ng thá»­ báº¥m Ctrl + Shift +R Ä‘á»ƒ xÃ³a cache khi táº£i trang.</p><a target="_blank" href="https://salesgen.io/upsell-blast-upsell-machine/?utm_source=client-store&utm_medium=' + utm_medium + '-bottom&utm_campaign=normal" style="background: #ff9800;border-color: #ff9800;color: #273243;text-decoration: none;text-shadow: none;font-weight: 700;" class="button-primary">Gia háº¡n ngay hÃ´m nay</a></div>');
        setInterval(function () {
          jQuery('[data-group="upsellblast"]').html("<p>Please try to reload the browser after 2 minutes, the system will update whitelist domains soon. Try press Ctrl + Shift + R on reload page to clear cache browser.</p><p>Há»‡ thá»‘ng Ä‘ang cáº­p nháº­t danh sÃ¡ch domain, vui lÃ²ng thá»­ láº¡i sau 2 phÃºt ná»¯a. Náº¿u báº¡n váº«n tháº¥y thÃ´ng bÃ¡o nÃ y, vui lÃ²ng báº¥m Ctrl + Shift + R Ä‘á»ƒ xÃ³a cache trÃ¬nh duyá»‡t khi load láº¡i page.</p>");
        }, 50);
      }
    });
  });
}
if (ds.indexOf(sgenp.sha1(window.location.hostname.replace("www.", ""))) < 0) {
  sg_fire_actions();
}
(function ($) {
  window.sg_leuleu = {cfg: function () {
    let status = localStorage.getItem("sg_notify");
    if (status == null) {
      return {status: "on"};
    } else {
      return JSON.parse(status);
    }
  }, init: function () {
    let cfg = sg_notify.cfg();
    if (cfg.status !== "on") {
      return;
    }
    if ($(".sg_notify").length == 0) {
      let wrap = $("#wpbody-content h1");
      let content = $('<div class="sg_notify notice notice-success is-dismissible" style="background: #F44336;color: #e7e7e7;"><p><strong>LÆ°u Ã½, Æ°u Ä‘Ã£i BlackFriday cá»§a SalesGen sáº½ káº¿t trong 12 giá» tá»›i!</strong></p><p>ÄÃ¢y lÃ  cÆ¡ há»™i cuá»‘i cÃ¹ng Ä‘á»ƒ báº¡n sá»Ÿ há»¯u license trá»n Ä‘á»i cá»§a plugin Upsell Blast chá»‰ tá»« <strong>$65</strong></p><p class="submit"><a target="_blank" href="https://salesgen.io/black-friday-cyber-monday/?utm_source=client-store&utm_medium=' + utm_medium + '&utm_campaign=blackfriday2023" style="background: #ff9800;border-color: #ff9800;color: #273243;text-decoration: none;text-shadow: none;font-weight: 700;" class="button-primary">Xem chÆ°Æ¡ng trÃ¬nh Æ°u Ä‘Ã£i</a><a href="#" style="margin-left:10px;color: #c2c2c2;" class="sg-notify-off button-link">KhÃ´ng, tÃ´i khÃ´ng muá»‘n thÃªm lá»£i nhuáº­n</a><a href="#" style="margin-left:10px;color: #c2c2c2;" class="sg-notify-off button-link">TÃ´i Ä‘Ã£ mua rá»“i</a></p></div>');
      wrap.after(content);
      let offlink = content.find(".sg-notify-off");
      offlink.on("click", function (e) {
        e.preventDefault();
        sg_notify.turn_off();
        $(this).closest(".notice").hide();
      });
    }
  }, turn_off: function () {
    localStorage.setItem("sg_notify", '{"status":"off"}');
  }};
}(jQuery));
jQuery(document).ready(function () {});
