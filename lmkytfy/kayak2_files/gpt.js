window.googletag = window.googletag || {};
window.googletag.cmd = window.googletag.cmd || [];
(function() {
    var gads = document.createElement("script");
    gads.async = true;
    gads.type = "text/javascript";
    var useSSL = "https:" == document.location.protocol;
    gads.src = (useSSL ? "https:" : "http:") + "//www.googletagservices.com/tag/js/gpt.js";
    var headNode = document.getElementsByTagName("head")[0];
    headNode.appendChild(gads);
})();

