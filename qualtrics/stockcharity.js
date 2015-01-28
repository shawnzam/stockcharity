// global object
var Wharton = {};

// namespace for this project
Wharton.Stockcharity = {};

Wharton.Stockcharity.Config = {
  base_url: "https://stockcharity-mktgit.rhcloud.com"
};

Wharton.Stockcharity.setupiFrame = function(src, width, height) {
  var iframe = document.createElement('IFRAME');
  iframe.setAttribute("src", src);
  iframe.style.width = width;
  iframe.style.height = height;
  iframe.style.border = "0";
  iframe.style.overflow = "hidden";
  return iframe
}

Wharton.Stockcharity.showChoices = function(viewtype, item, sid, uid, cid,  that) {
  that.disableNextButton();
  that.hideNextButton();
  var sid = sid || '';
  var uid = uid || '';
  var cid = cid || '';
  var src_url = Wharton.Stockcharity.Config.base_url + "/"+ viewtype + "?itemtype=" + item + "&uid=" + uid + "&sid=" + sid + "&cid=" + cid;
  var iframe = Wharton.Stockcharity.setupiFrame(src_url, "500px", "700px");
  that.getQuestionContainer().appendChild(iframe);
  var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
  var eventer = window[eventMethod];
  var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
  eventer(messageEvent, function(e) {
    console.log(e);
    if (e.data['status'] == 'ok' && e.origin == Wharton.Stockcharity.Config.base_url) {
      that.enableNextButton();
      that.showNextButton();
      that.clickNextButton();
    }
  }, false);
}
