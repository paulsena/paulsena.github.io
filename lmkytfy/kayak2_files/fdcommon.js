jq.widget("ui.r9toptip",jq.ui.r9popover,{options:{at:"top",left:53,top:24},_destroyAll:function(){jq.ui.r9popover.get().r9toptip("destroy")},_onOverlayClick:function(){jq(".ui-dialog-content").r9toptip("close")},_position:function(a){isVisible=this.uiDialog.is(":visible");if(!isVisible){this.uiDialog.show()}this.uiDialog.css({left:this.options.left,top:this.options.top});if(!isVisible){this.uiDialog.hide()}}});R9.extend("fd",{searchHistorySignin:function(){var a=R9.globals.vertical;if(R9.Logging.Config["log"+a+"Form"]){var b=["fd",a,"bestfares/savehistory"].join("/");R9.Analytics.api.trackEvent(b,{},jq.noop,true)}AjaxReg.regtype="savehistory";AjaxReg.ui.register()}});R9.extend("fd",{FormLogging:{log:function(f,a,c,b){b=b||{};var e=b.prefixOverride||this.vslogPrefix||"unknownproduct",d=b.product||this.vsProduct||"fd";R9.Analytics.api.trackEvent([d,e,f].join("/"),{},this.complete(a,c),true)},complete:function(a,c){var e,d=false;function b(){(a||jq.noop).apply(c||this)}e=setTimeout(function(){d=true;b()},R9.Logging.Config.LINK_REQUEST_TIMEOUT);return function(){if(!d){clearTimeout(e);b()}}}}});R9.extend("fd",{Form:function(b){var a=this;a.loadSettings(b);a.bindEvents();a.onLoad()}});R9.extend("fd.Form",{disableSearchButton:function(){jq("#fdimgbutton").prop("disabled",true);jq("body").css("cursor","wait")},enableSearchButton:function(){jq("#fdimgbutton").prop("disabled",false);jq("body").css("cursor","default")}});R9.extend("fd.Form.prototype",{didUpdateHistory:false,isInlineSearch:false,createCmp2Events:true,beget:function(){function a(){}a.prototype=this;return new a()},bindEvents:function(){this.bindResearchFormEvents();this.bindLocalHistory();this.bindHistory();this.bindSubmit();this.bindAfterSubmitEvents();this.bindSelectTextOnFocus();this.bindMobileapp();this.bindCmp2Events();this.bindResize()},bindResize:function(){var b=false;var a=R9.CompareTo.getController(this.e);jq(window).on("resize",function(){if(jq(this).width()<768){b=true;jq("#compareToRow").hide();if(a){a.disableOpening(true)}}else{if(b){b=false;jq("#compareToRow").show();if(a){a.disableOpening(false)}}}})},bindCmp2Events:function(){if(this.createCmp2Events){new R9.CompareTo.Controller(R9.CompareTo.View.getViewFromForm(this.e),new R9.CompareTo.Model())}},bindHistory:function(){var a=this;jq("#fdrecent .mainLink").on("click",function(c){c.preventDefault();c.stopPropagation();var b=this;a.log("userhistory/searchagain",function(){if(jq(b).hasClass("mainLink")){window.location.href=b.href}},a,{prefixOverride:document.forms.searchform.name})});jq("#fdrecent .hasMore a").on("click",function(c){c.preventDefault();var b=this;a.log("userhistory/seeall",function(){window.location.href=b.href},a,{prefixOverride:document.forms.searchform.name})})},bindLocalHistory:function(){var a=this;this.didUpdateHistory=false;this.localHistory=new R9.Common.UserHistory({onSave:function(){if(!a.didUpdateHistory){a.updateLocalHistory(false)}}})},bindSubmit:function(){jq(this.e).off("submit.searchform").on("submit.searchform",jq.proxy(this.onSubmit,this))},bindAfterSubmitEvents:function(){if(typeof window.onpopstate!=="object"){return}var a=this;jq(window).on("popstate",function(){a.enableSearchButton()})},bindSelectTextOnFocus:function(){focusedElement=null;jq("input.selectTextOnFocus").on("focus",function(){if(focusedElement==jq(this)){return}focusedElement=jq(this);setTimeout(function(){focusedElement.select()},50)})},disableSearchButton:function(){R9.fd.Form.disableSearchButton();this.isSubmitted=true},enableSearchButton:function(){R9.fd.Form.enableSearchButton();this.isSubmitted=false},formatLocation:function(d,a,c,b){if(c==="US"){return d+", "+a}else{if(c==="CA"){return d+", "+a+" "+b}else{return d+", "+b}}},generateSearchUrl:function(){return generateSearchUrl(this.e,this.isInlineSearch)},getData:function(){return R9.utils.formToObject(this.e)},getTodayDate:function(){var a=new Date();a.setHours(0);a.setMinutes(0);a.setSeconds(0);a.setMilliseconds(0);return a},loadHistory:function(){return false},loadSettings:function(b){var a=this;a.e=b.e;a.error=null;a.history=b.history||[];a.isSubmitted=false;a.isFullResearchForm=b.isFullResearchForm||false;a.suppressKAYAKCompareToPopup=b.suppressKAYAKCompareToPopup||false},onLoad:function(){if(jq("#inlineSearchForm").length){R9.Common.Utils.defer(function(){jq('#searchform input[name="searchingagain"]').val("true");jq('#searchform input[name="src"]').val("modifysearch")})}R9.Common.Init.initEllipsisFields();R9.fd.Form.enableSearchButton()},updateLocalHistory:function(a){this.didUpdateHistory=true},onSubmit:function(){this.updateLocalHistory(true);jq(this.e).trigger("form-pre-submit");return true},setSourceForHistory:function(a){jq("input[name=src]").val(a?"recenthisory":"")},callbackRefreshCmp2:function(c){var b=jq(c).val();var a=jq(c).data("__last_blur_value__");if(typeof a=="undefined"){jq(c).data("__last_blur_value__",b)}if(!b||a!=b){compare2chk(null,{formName:this.e.name});jq(c).data("__last_blur_value__",b)}},getPreloadData:function(){return jq(this.e).serialize()},submitPreload:function(c){if(R9.globals.uiconfig["ui.submitpreload"]&&!this.loadingHistory){var b=this.getPreloadData();b=b.concat("&changed_field="+c);var a={type:"post",url:"/s/horizon/common/search/PreloadAction",data:b,beforeSend:function(d){d.setRequestHeader("X-CSRF",R9.globals.formtoken)}};jq.ajax(a)}},setPriorValue:function(a){jq(a.join(",")).each(function(){if(this.value){jq(this).data("__last_blur_value__",this.value)}})},showPromo:function(){var a=jq("#topMsgBox");if(!a.length){return}a.css({visibility:"visible",display:"block"})},bindResearchFormEvents:function(){if(!this.isFullResearchForm){return}},bindMobileapp:function(){var a=this;jq("#fdRailMobilePromo .fd-mobilelink").on("click",function(c){c.preventDefault();var b=this;a.log("marketing/mobileapp",function(){window.location.href=b.href},a,{prefixOverride:document.forms.searchform.name})})},navigateToResults:function(b){if(R9.config.getBoolean("ui.cmp2.code.refactor",false)){var a=new R9.CompareTo.Helper.SubmitNavigator();a.navigate(this.e,b)}else{if(BrowserConfig.getBoolean("swapper",false)){var c=new R9.CompareTo.Helper.Swapper();c.navigate(this.e,b)}else{if(R9App&&R9App.AppInstance){jq.cookie("nus","t",{path:"/"});R9App.AppInstance.navigate(b,{reload:true})}else{document.location.href=b}}}},fromCacheRefresh:function(){},dateIsValid:function(a){return a&&moment().isBefore(moment(a))},parseDateString:function(a,c){try{return moment(a,c||R9.Widgets.DaterangePicker.prototype.options.startInputFormat)}catch(b){return null}}});R9.extend("fd.Form.prototype",R9.fd.FormLogging);R9.extend("fd",{ODForm:function(a){R9.fd.Form.call(this,a)}});R9.fd.ODForm.prototype=R9.fd.Form.prototype.beget();R9.extend("fd.ODForm.prototype",{bindEvents:function(){R9.fd.Form.prototype.bindEvents.call(this);this.bindMultipleDestinations();this.bindMultipleOrigins();this.bindODdropdowns();this.bindPTCSelection()},bindODdropdowns:function(){jq("#departreturn,#departreturn2").dropdownGroup()},bindMultipleDestinations:function(){jq(this.e.newdestination).change(jq.proxy(this.changeMultipleDestinations,this))},bindMultipleOrigins:function(){jq(this.e.neworigin).change(jq.proxy(this.changeMultipleOrigins,this))},changeMultipleDestinations:function(){var b=this.e,a=b.newdestination.selectedIndex;b.destination.value=b.newdestination.options[a].value;b.destcode.value=""},changeMultipleOrigins:function(){var b=this.e,a=b.neworigin.selectedIndex;b.origin.value=b.neworigin.options[a].value;b.origincode.value=""},clearHelpText:function(a){if(a.value&&a.value.indexOf(" start")==0){a.className="searchbox";a.value=""}},adjustChildPTCAges:function(){var a=this;var b=parseInt(jq("#ptcChildren").val(),10);jq(".fieldInputChildAge, .childAgeWarning").hide();if(b==0){a.setInfantLapWarning(0);return}jq(".childAgeWarning").show();jq.each([1,2,3,4,5],function(c,d){if(d<=b){jq(".fieldInputChildAge"+d).show();(d==b)?jq(".fieldInputChildAge"+d).addClass("last"):jq(".fieldInputChildAge"+d).removeClass("last")}});a.setInfantLapWarning(b)},setInfantLapWarning:function(a){jq(".infantInLapWarning").hide();jq(".fieldInputChildAge").removeClass("infantInLap");if(a>0){jq.each([1,2,3,4,5],function(b,c){if(c<=a){var d=jq("#childAge"+c);if(d.val()=="1L"){jq(".infantInLapWarning").show();d.parents("div.fieldInputChildAge").addClass("infantInLap")}}})}},bindPTCSelection:function(){var a=this;if(jq("#ptcAndCabin").length==1){jq("#ptcAndCabin").dropdownGroup();jq("#cabin").on("change",function(){a.log("class/"+this.value)})}else{jq("#travelerSelectionFull").dropdownGroup();jq("#cabin").dropdown({change:function(b){a.log("class/"+b.value)}})}if(document.forms.flights){jq("#travelers,#ptcAdults,#mobiletravelers").on("change",function(){a.log("passengers/adults/"+this.value)});jq("#ptcSeniors").change(function(){a.log("passengers/seniors/"+this.value)});jq("#ptcChildren").change(function(){a.log("passengers/children/"+this.value);a.adjustChildPTCAges()});jq(".ageSelect").change(function(){a.setInfantLapWarning(parseInt(jq("#ptcChildren").val(),10));a.log("passengers/child/"+jq(this).children(".r9-dropdown-select").val())});a.adjustChildPTCAges()}jq("#prefer_nonstop").on("change",function(){a.log("prefernonstop")})},checkForPTCErrors:function(e){var b=null;var a=parseInt(e.adults,10)||0;var d=parseInt(e.seniors,10)||0;var f=parseInt(e.children,10)||0;if(a+d+f==0){b="Please add at least 1 passenger."}else{if(a+d==0){b='<h2>About unaccompanied minors</h2>KAYAK does not currently support searches for unaccompanied minors. We recommend that you check the minimum age requirements as well as what other fees apply for the airline you plan to book with, <b>before you book.</b><br /><br />Some airlines offer a mandatory unaccompanied minor service for a charge. Visit our airline fees page <a href="http://www.kayak.com/airline-fees">www.kayak.com/airline-fees</a>.<br /><br />Most airlines charge a full fare as well as require a charge for unaccompanied minors. Therefore, you may perform your search for an adult.'}else{if(f>0){for(var c=1;c<=f;c++){if(e["childAge"+c]==""){b=replaceArgs("Please enter an age for Child {0}.",c);break}}}}}return b}});function removesearch(a){jq.get("/s/sparkle",{action:"removesearch",itemid:a,formtoken:R9.globals.formtoken},function(){jq(".rts"+a).remove()})}function clearTxtField(b,c,a){jq("#"+a).val("");jq("#"+c).val("").focus();b.preventDefault()}function popupBlockerMsg(b){try{jq("select").hide()}catch(a){}toggleFaderPane(true,null);showTT(document.getElementById("popupTTIPPos"),document.getElementById("popupWarning").innerHTML,"TL");jq("#tooltipdivimageholder").empty().append("<img align='left' style='margin-right: 8px' src='/images/a-pop-up-ani.gif'>");window.focus();jq.get("/vs/fd/popupblockmsg?action=vs"+(typeof SearchID!="undefined"?"&searchid="+SearchID:""))}if(!window.compare2chk){function popupsearchsubmit(){R9.Analytics.api.trackEvent("toolbox/changesearch/searchagain");jq("#getratesbutton").prop("disabled",true);var c=generateSearchUrl(document.searchagain);if(c!=null){var b=jq("#seo");if(b.is("div")){var a=jq("#popupSearch");if(a.is("div")){destroyPopupSearch()}}R9.RP.ResultsExpired.cancel();R9App.AppInstance.navigate(c,{beforeNavigate:destroyPopupSearch});return false}return true}function compare2chk(e,d){if(R9.CompareTo.isBehaviorOfVertical(a())){d=d||{};var c=null;if(document.inlinesearchagain){c="inlinesearchagain"}if(d.formName){c=d.formName}var g=R9.CompareTo.View.getUniqueId(f(c));var b=R9.CompareTo.Controller.get(g);if(typeof g!=="undefined"&&typeof b!="undefined"){if(window.inlineFormCmp2EnabledWithFrontDoorPlacements){b.setShowOnFrontDoor()}b.refresh()}return true}function a(){if(window.SearchType&&!window.StartTab){if(SearchType.slice(-1)!="s"){StartTab=SearchType+"s"}else{StartTab=SearchType}}return StartTab}function f(h){if(!h){h=a()}return document[h]||document.searchagain}}function cmp2resetItems(){var c=new R9.CompareTo.Window.Opener();var a=0;var d=jq(".cmp2item:not(.compareToInputHidden) input");var b=(window.BrowserConfig)?BrowserConfig.getNumber("maxCheckedItems",5):5;jq.each(d,function(){var e=jq(this);var f=e.prop("defaultChecked");if(f==true){a++}if(e.prop("checked")){c.close(e.val());R9.Utils.WindowOpener.closeWindow(e.val())}if(a>b){e.prop("checked",false)}else{e.prop("checked",f)}})}function checkStudentCabin(a){if(a.value=="e"){toggleStudent(true)}else{toggleStudent(false)}}function toggleStudent(a){if(a){student("0")}else{jq("#student").val("0");jq("#student_link").hide();jq("#non_student_link").hide()}}function student(a){jq("#student").val(a);setMetaCookie("isStudent",a==1?"true":"false");if(a=="1"){jq("#student_link").hide();jq("#non_student_link").show()}else{jq("#non_student_link").hide();jq("#student_link").show()}compare2chk()}function compareChecked(a,b){b=b||jq.noop;setMetaCookie(a.value,a.checked?"true":"false",b)}}jq(".surveymonkey a").on("click",function(a){a.preventDefault();setMetaCookie("surveymonkeywindow",true);window.open(jq(this).prop("href"),"surveymonkeywindow","height=800,width=810,scrollbars=yes,resizable=yes,status=yes");if(jq(this).hasClass("removeAfterClick")){jq(this).closest(".surveymonkey").remove()}});jq("#fdSurveyContainer a").on("click",function(d){var b=jq(this),a=b.prop("href"),c=b.data("target");if(typeof c!=="undefined"&&c.length>0){d.preventDefault();window.open(a,c)}});jq("#mobileSwitch").click(function(a){a.stopPropagation()});function mobileLink(a){window.location=a}function switchFlightDepartReturn(){var g=jq("#searchform, #inlinesearchagain");var e=jq("#origin",g);var b=jq("#destination",g);var a=jq("#origincode",g);var c=jq("#destcode",g);var f=jq("#nearbyO-icon",g).hasClass("r9-checkbox-icon-checked");var h=jq("#nearbyD-icon",g).hasClass("r9-checkbox-icon-checked");var d=e.val();e.val(b.val());b.val(d);d=a.val();a.val(c.val()).trigger("change");c.val(d).trigger("change");if(f!==h){jq("#nearbyO",g).click();jq("#nearbyD",g).click()}compare2chk()}function showUsSanctionedCountriesPopup(){var a=jq("#sanctioned-countries-popup");var c=jq(".sanctionedCountriesReadMore");var b={hideTitle:true,width:360,minHeight:100,spinner:false,contentClass:"createAlertPadding",titleClass:"createAlertTitlePadding",isFixed:false,modal:false,modalOpacity:1,position:{my:"left top",at:"center top",of:c}};jq("#sanctioned-countries-popup").r9dialog(b).r9dialog("option","close",function(d){})};
