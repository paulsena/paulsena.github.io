 function kayakItForThem() {
//  if ($.getQueryString({ id: "fwd" })) redirect();
  fakeMouse = $("#fakemouse");
  inputField = $("#wherebox");
  searchButton = $("#fdimgbutton");
  searchString = "Boston, MA";

  $("body").css("cursor", "wait");
  fakeMouse.show();
  //instruct("play.step_1");

  fakeMouse.animate({
    top:  inputField.offset().top + 15,
    left: inputField.offset().left + 10
  }, 1500, 'swing', function(){
    inputField.focus();
    fakeMouse.animate({ top: "+=18px", left: "+=10px" }, 'fast');
    type(searchString, 0);
  });

  function type(string, index){
    var val = string.substr(0, index + 1);
    inputField.attr('value', val);
    if (index < string.length) {
      setTimeout(function(){ type(string, index + 1); }, Math.random() * 250);
    }
    else {
      clickSearch();
    }
  }

  function clickSearch() {
    fakeMouse.animate({
    top:  searchButton.offset().top + 15,
    left: searchButton.offset().left + 30
  }, 1500, 'swing', function(){
    window.location.href = "https://www.kayak.com/hotels/Boston,MA-c25588/2015-10-16/2015-10-18";
  });
  }

  function gentlyEncode(e) {
    return encodeURIComponent ? encodeURIComponent(e).replace(/%20(\D)?/g, "+$1").replace(/'/g, escape("'")) : escape(e).replace(/\+/g, "%2B").replace(/%20/g, "+")
  }

  function gentlyDecode(e) {
      return decodeURIComponent ? decodeURIComponent(e) : unescape(e)
  }
}
