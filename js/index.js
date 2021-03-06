window.onload = function () {
  var arrow = document.querySelector("#header .arrow");
  var upNodes = document.querySelectorAll("#header .headerMain .nav ul li .up");
  var liNodes = document.querySelectorAll("#header .headerMain .nav ul li");
  var hour = document.getElementById("h");
  var minute = document.getElementById("m");
  var second = document.getElementById("s");
  var calendar = document.getElementById("calendar");
  var lastMonth = document.getElementById("btn01");
  var nextMonth = document.getElementById("btn02");
  var Login = document.querySelector("#header .headerMain .nav li .Login");
  var audio = document.querySelector("#header .headerMain .music #audio");
  var pause = document.querySelector("#header .headerMain .music li .pause");
  var play = document.querySelector("#header .headerMain .music li .play");
  var lastmusic = document.querySelector(
    "#header .headerMain .music li #lastmusic"
  );
  var nextmusic = document.querySelector(
    "#header .headerMain .music li #nextmusic"
  );
  var musicname = document.querySelector(
    "#header .headerMain .music  #musicname"
  );
  var toggle = document.querySelector("#header .headerMain .music #toggle");
  var content = document.getElementById("content");
  var header = document.getElementById("header");
  var contentLi = document.querySelectorAll("#content .list>li");
  var contentList = document.querySelector("#content .list");
  var menuBarLi = document.querySelectorAll("#content .menuBar>li");
  var gameUl = document.querySelectorAll(
    "#content .list .game .game1>.item>ul"
  );
  var game2048 = document.querySelector(
    "#content .list .game .game1 .game2048"
  );
  var gameplane = document.querySelector(
    "#content .list .game .game1 .gameplane"
  );
  var homeLi1 = document.querySelectorAll("#content .list .home .homeList>li");
  var homeLi2 = document.querySelectorAll("#content .list .home .homeIcon>li");
  var maskLine = document.querySelector("#mask .maskLine");
  var maskTop = document.querySelector("#mask .maskTop");
  var maskBottom = document.querySelector("#mask .maskBottom");
  var mask = document.getElementById("mask");
  var now = 0;
  var timer = null;
  timer = null;
  var preIndex = 0;
  //??????
  /*ie??????chrome*/
  document.onmousewheel = function (event) {
    clearInterval(timer);
    timer = setTimeout(function () {
      fun(event);
    }, 100);
  };
  /*firefox*/
  if (document.addEventListener) {
    document.addEventListener("DOMMouseScroll", function (event) {
      clearInterval(timer);
      timer = setTimeout(function () {
        fun(event);
      }, 100);
    });
  }
  function fun(event) {
    event = event || window.event;
    var flag = "";
    if (event.wheelDelta) {
      /*ie/chrome*/
      if (event.wheelDelta > 0) {
        //???
        flag = "up";
      } else {
        flag = "down";
      }
    } else if (event.detail) {
      /*firefox*/
      if (event.detail < 0) {
        flag = "up";
      } else {
        flag = "down";
      }
    }
    preIndex = now;
    if ((preIndex == 0 && flag == "up") || (preIndex == 4 && flag == "down")) {
      return;
    }
    switch (flag) {
      case "up":
        /*????????????????????????*/
        if (now > 0) {
          now--;
        }
        move(now);
        break;
      case "down":
        /*????????????????????????*/
        if (now < liNodes.length - 1) {
          now++;
        }
        move(now);
        break;
    }
    /*??????????????????*/
    event.preventDefault && event.preventDefault;
    return false;
  }
  //??????????????????
  function move(now) {
    /*???????????? ?????? ?????????*/
    /*1.up??????*/
    for (var i = 0; i < upNodes.length; i++) {
      upNodes[i].style.width = "";
    }
    upNodes[now].style.width = "100%";
    /*???????????????*/
    arrow.style.left =
      liNodes[now].getBoundingClientRect().left +
      liNodes[now].offsetWidth / 2 -
      arrow.offsetWidth / 2 +
      "px";
    /*????????????*/
    /*?????????????????????*????????????-header??????*/

    contentList.style.top =
      -now * (document.documentElement.clientHeight - header.offsetHeight) +
      "px";

    //???????????? ?????????
    for (var i = 0; i < menuBarLi.length; i++) {
      menuBarLi[i].className = "";
    }
    menuBarLi[now].className = "active";
  }
  //????????????
  function contentBind() {
    content.style.height =
      document.documentElement.clientHeight - header.offsetHeight + "px";
    for (var i = 0; i < contentLi.length; i++) {
      contentLi[i].style.height =
        document.documentElement.clientHeight - header.offsetHeight + "px";
    }
  }
  //   ???????????????????????????
  window.onresize = function () {
    //          ??????????????????????????????
    contentBind();
    //           ???????????????????????????
    arrow.style.left =
      liNodes[now].getBoundingClientRect().left +
      liNodes[now].offsetWidth / 2 -
      arrow.offsetWidth / 2 +
      "px";
  };
  //????????????
  function headerBind() {
    upNodes[0].style.width = "100%";
    arrow.style.left =
      liNodes[0].getBoundingClientRect().left +
      liNodes[0].offsetWidth / 2 -
      arrow.offsetWidth / 2 +
      "px";
    for (var i = 0; i < liNodes.length; i++) {
      liNodes[i].index = i;
      liNodes[i].onclick = function () {
        if (this.index == 5) {
          calendar.style.height = "250px";
          calendar.style.display = "block";
          for (var i = 0; i < upNodes.length; i++) {
            upNodes[i].style.width = "";
          }
          upNodes[this.index].style.width = "100%";
          //            ???????????????
          arrow.style.left =
            liNodes[this.index].getBoundingClientRect().left +
            liNodes[this.index].offsetWidth / 2 -
            arrow.offsetWidth / 2 +
            "px";
        } else if (this.index == 6) {
          calendar.style.height = "0px";
          calendar.style.display = "none";
          for (var i = 0; i < upNodes.length; i++) {
            upNodes[i].style.width = "";
          }
          upNodes[this.index].style.width = "100%";
          //            ???????????????
          arrow.style.left =
            liNodes[this.index].getBoundingClientRect().left +
            liNodes[this.index].offsetWidth / 2 -
            arrow.offsetWidth / 2 +
            "px";
        } else {
          calendar.style.height = "0px";
          calendar.style.display = "none";
          preIndex = now;
          now = this.index;
          if (preIndex == now) {
            return;
          }
          move(now);
        }
      };
    }
    //???????????????
    for (var i = 0; i < menuBarLi.length; i++) {
      menuBarLi[i].index = i;
      menuBarLi[i].onclick = function () {
        //                        ??????????????? ????????????
        preIndex = now;
        now = this.index;
        if (preIndex == now) {
          return;
        }
        move(now);
      };
    }
  }
  function picBoom() {
    for (var i = 0; i < gameUl.length; i++) {
      changeImg(gameUl[i]);
    }
    //            ????????????
    function changeImg(ul) {
      //                li???????????????ul?????????
      var w = ul.offsetWidth / 2;
      var h = ul.offsetHeight / 2;
      //                ??????ul?????????data-src??????
      var imgSrc = ul.dataset.src; //img/about1.jpg
      //                ??????li
      for (var i = 0; i < 4; i++) {
        //                    ??????li??????
        var liNode = document.createElement("li");
        //                    ??????img
        var imgNode = new Image();

        liNode.style.width = w + "px";
        liNode.style.height = h + "px";
        //                    ????????????
        imgNode.src = imgSrc;
        imgNode.style.top = -Math.floor(i / 2) * h + "px";
        imgNode.style.left = -(i % 2) * w + "px";
        ul.appendChild(liNode);
        liNode.appendChild(imgNode);
      }
      var imgNodes = ul.querySelectorAll("img");
      //                ????????????????????????
      ul.onmouseenter = function () {
        imgNodes[0].style.top = h + "px";
        imgNodes[1].style.left = -2 * w + "px";
        imgNodes[2].style.left = w + "px";
        imgNodes[3].style.top = -2 * h + "px";
      };
      ul.onmouseleave = function () {
        imgNodes[0].style.top = 0 + "px";
        imgNodes[1].style.left = -w + "px";
        imgNodes[2].style.left = 0 + "px";
        imgNodes[3].style.top = -h + "px";
      };
    }
  }
  // ??????
  function getCurrentTime() {
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    if (h < 10) {
      h = "0" + h;
    }
    if (m < 10) {
      m = "0" + m;
    }
    if (s < 10) {
      s = "0" + s;
    }
    hour.innerHTML = h;
    minute.innerHTML = m;
    second.innerHTML = s;
  }
  //??????
  function Calendar() {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    var allday = 0;
    // ?????????????????????????????????
    function count() {
      if (month != 2) {
        if (month == 4 || month == 6 || month == 9 || month == 11) {
          allday = 30;
        } else {
          allday = 31;
        }
      } else {
        if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
          allday = 29;
        } else {
          allday = 28;
        }
      }
    }
    function showMonth() {
      var year_month = year + "???" + month + "???";
      document.getElementById("month").innerHTML = year_month;
    }
    function showDate() {
      showMonth();
      count();
      var firstdate = new Date(year, month - 1, 1);
      var xiqi = firstdate.getDate();
      var daterow = document.getElementById("day");
      daterow.innerHTML = "";
      if (xiqi != 0) {
        for (var i = 0; i < xiqi; i++) {
          var dayElement = document.createElement("div");
          dayElement.className = "everyday";
          daterow.appendChild(dayElement);
        }
      }
      for (var j = 1; j <= allday; j++) {
        var dayElement = document.createElement("div");
        dayElement.className = "everyday";
        dayElement.innerHTML = j + "";
        if (j == day) {
          dayElement.style.color = "red";
        }
        daterow.appendChild(dayElement);
      }
    }
    // ???????????????
    lastMonth.onclick = function () {
      if (month > 1) {
        month -= 1;
      } else {
        month = 12;
        year -= 1;
      }
      showDate();
    };
    // ???????????????
    nextMonth.onclick = function () {
      if (month < 12) {
        month += 1;
      } else {
        month = 1;
        year += 1;
      }
      showDate();
    };
    showDate();
  }
  //??????????????????
  function openNew() {
    Login.onclick = function () {
      window.open("./childhtml/Login.html", "Login", "width=650,height=400");
    };
    game2048.onclick = function () {
      window.open(
        "./childhtml/game2048.html",
        "game2048",
        "width=650px,height=700px"
      );
    };
    gameplane.onclick = function () {
      window.open("./childhtml/gameplane.html");
    };
  }
  //???????????????
  function musicplay() {
    play.style.visibility = "visible";
    pause.style.visibility = "hidden";

    var list = new Array(
      "./music/????????????.mp3",
      "./music/?????????.mp3",
      "./music/???.mp3"
    );
    var titleList = new Array("????????????", "?????????", "???");
    var i = 0;
    toggle.onclick = function () {
      musicname.innerHTML = titleList[i];
      if (audio.paused) {
        audio.play();
        pause.style.visibility = "visible";
        play.style.visibility = "hidden";
      } else {
        audio.pause();
        play.style.visibility = "visible";
        pause.style.visibility = "hidden";
      }
    };
    lastmusic.onclick = function () {
      if (i == 0) {
        i = list.length - 1;
      } else {
        i--;
      }
      audio.pause();
      audio.src = list[i];
      musicname.innerHTML = titleList[i];
      audio.play();
      pause.style.visibility = "visible";
      play.style.visibility = "hidden";
    };
    nextmusic.onclick = function () {
      if (i == 2) {
        i == 0;
      } else {
        i++;
      }
      audio.pause();
      audio.src = list[i];
      musicname.innerHTML = titleList[i];
      audio.play();
      pause.style.visibility = "visible";
      play.style.visibility = "hidden";
    };
  }
  //????????????
  (function(){
    var btn03=document.getElementById("btn03");
    $("btn03").click(function(e){
      // return false;
      e.preventDefault()
    })
    
    btn03.onclick=function check1() {
      
      var q4 = checkBox("q4");
      if (q4 == false) {
        alert("????????????????????????????????????");
        return false;
      }
      var q5 = checkBox("q5");
      if (q5 == false) {
        alert("????????????????????????????????????");
        return false;
      }

      alert("????????????");
    }
    function checkBox(name) {
      var j = 0;
      var checkbox = document.getElementsByName(name);
      for (var i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked) {
          j++;
          break;
        }
      }
      if (j == 0) return false;
      return true;
    }
}());
  // ??????
  (function () {
    /**
     * 1.????????????
     *     -???????????????????????????????????????????????????
     */
    //1.#checkedAllBtn
    //???id???checkedAllBtn???????????????????????????????????????
    var checkedAllBtn = document.getElementById("checkedAllBtn");
    checkedAllBtn.onclick = function () {
      //???????????????items
      var items = document.getElementsByName("items");
      var checkedAllBox = document.getElementById("checkedAllBox");
      //??????items
      for (var i = 0; i < items.length; i++) {
        //?????????????????????????????????
        //??????????????????checked??????????????????????????????????????????????????????
        items[i].checked = true;
      }
      checkedAllBox.checked = true;
    };
    /**
     * 2.???????????????
     */
    //2.#checkedNoBtn
    var checkedNoBtn = document.getElementById("checkedNoBtn");
    checkedNoBtn.onclick = function () {
      var items = document.getElementsByName("items");
      var checkedAllBox = document.getElementById("checkedAllBox");
      for (var i = 0; i < items.length; i++) {
        items[i].checked = false;
      }
      checkedAllBox.checked = false;
    };
    /**
     * 3.????????????
     */
    //3.#checkedRevBtn
    var checkedRevBtn = document.getElementById("checkedRevBtn");
    checkedRevBtn.onclick = function () {
      var items = document.getElementsByName("items");
      checkedAllBox.checked = true;
      for (var i = 0; i < items.length; i++) {
        //??????
        items[i].checked = !items[i].checked;
      }
      for (j = 0; j < items.length; j++) {
        if (!items[j].checked) {
          checkedAllBox.checked = false;
          break;
        }
      }
    };
    /**
     * 4.????????????
     *     -???????????????????????????????????????????????????value???????????????
     */
    //4.#sendBtn
    var sendBtn = document.getElementById("sendBtn");
    sendBtn.onclick = function () {
      var items = document.getElementsByName("items");
      for (i = 0; i < items.length; i++) {
        if (items[i].checked == true) {
          alert(items[i].value);
        }
      }
    };
    /**
     * ??????/?????????
     */
    //5.#checkedAllBox
    var checkedAllBox = document.getElementById("checkedAllBox");
    checkedAllBox.onclick = function () {
      var items = document.getElementsByName("items");
      if (checkedAllBox.checked == true) {
        for (var i = 0; i < items.length; i++) {
          items[i].checked = true;
        }
      } else {
        for (var i = 0; i < items.length; i++) {
          items[i].checked = false;
        }
      }
    };
    //6.items
    var checkedAllBox = document.getElementById("checkedAllBox");
    var items = document.getElementsByName("items");
    for (i = 0; i < items.length; i++) {
      items[i].onclick = function () {
        checkedAllBox.checked = true;
        for (var j = 0; j < items.length; j++) {
          if (!items[j].checked) {
            checkedAllBox.checked = false;
            break;
          }
        }
      };
    }
  })();
  // ??????????????????
  (function () {
    var addEmpButton = document.getElementById("addEmpButton");
    function del() {
      var tr = this.parentNode.parentNode;
      var name = tr.getElementsByTagName("td")[0].innerHTML;
      var bool = confirm("??????????????????");
      if (bool == true) {
        //??????tr
        tr.parentNode.removeChild(tr);
      }
      return false;

    }

    //????????????????????????
    var form2=document.getElementById("form2");
    var allA = form2.getElementsByTagName("a");
    //???????????????????????????????????????????????????
    for (var i = 0; i < allA.length; i++) {
      allA[i].onclick = del;
    }
    //?????????????????????????????????????????????
  
    addEmpButton.onclick = function (event) {
      //??????????????????
      var name = document.getElementById("empName");
      var email = document.getElementById("email");
      var salary = document.getElementById("salary");
      var tr = document.createElement("tr");
      var nameTd = document.createElement("td");
      var eamilTd = document.createElement("td");
      var salaryTd = document.createElement("td");
      var aTd = document.createElement("td");
      var a1 = document.createElement("a");
      var nameText = document.createTextNode(name.value);
      var emailText = document.createTextNode(email.value);
      var salaryText = document.createTextNode(salary.value);
      var delText = document.createTextNode("Delete");

      nameTd.appendChild(nameText);
      eamilTd.appendChild(emailText);
      salaryTd.appendChild(salaryText);
      a1.appendChild(delText);
      aTd.appendChild(a1);
      tr.appendChild(nameTd);
      tr.appendChild(eamilTd);
      tr.appendChild(salaryTd);
      tr.appendChild(aTd);

      a1.href = "javascript:;";
      a1.onclick = del;

      var employeeTable = document.getElementById("employeeTable");
      var tbody = employeeTable.getElementsByTagName("tbody")[0];
      tbody.appendChild(tr);
    };
  })();
  //????????????
  (function () {
    var goright = document.getElementById("input01");
    var allright = document.getElementById("input02");
    var goleft = document.getElementById("input03");
    var allleft = document.getElementById("input04");
    goright.onclick = function goRight() {
      var select1 = document.getElementById("select1");
      var ops = select1.getElementsByTagName("option");
      for (var i = 0; i < ops.length; i++) {
        var op = ops[i];
        if (op.selected == true) {
          var select2 = document.getElementById("select2");
          select2.appendChild(op);
          i--;
        }
      }
    };

    allright.onclick = function allGoRight() {
      var select1 = document.getElementById("select1");
      var ops = select1.getElementsByTagName("option");
      for (var i = 0; i < ops.length; i++) {
        var op = ops[i];
        var select2 = document.getElementById("select2");
        select2.appendChild(op);
        i--;
      }
    };

    goleft.onclick = function goLeft() {
      var select2 = document.getElementById("select2");
      var ops = select2.getElementsByTagName("option");
      for (var i = 0; i < ops.length; i++) {
        var op = ops[i];
        if (op.selected == true) {
          var select1 = document.getElementById("select1");
          select1.appendChild(op);
          i--;
        }
      }
    };

    allleft.onclick = function allGoLeft() {
      var select2 = document.getElementById("select2");
      var ops = select2.getElementsByTagName("option");
      for (var i = 0; i < ops.length; i++) {
        var op = ops[i];
        var select1 = document.getElementById("select1");
        select1.appendChild(op);
        i--;
      }
    };
  })();
  // ????????????
  function home3d() {
    //            ??????????????????????????????
    var oldIndex = 0;
    var autoIndex = 0;
    var homeTimer = null;
    for (var i = 0; i < homeLi2.length; i++) {
      homeLi2[i].index = i;
      homeLi2[i].onclick = function () {
        clearInterval(homeTimer);
        //                  ????????????????????????active  ?????????????????????????????????active
        for (var j = 0; j < homeLi2.length; j++) {
          homeLi2[j].className = "";
        }
        homeLi2[this.index].className = "active";
        //                    ?????????????????? ??? ??????????????????   ????????????????????????  ?????????????????????

        if (oldIndex < this.index) {
          //                    ??????????????????????????????leftHide  ??????????????? rightShow
          homeLi1[oldIndex].className = "leftHide";
          homeLi1[this.index].className = "rightShow";
        } else if (oldIndex > this.index) {
          //                    ??????????????????????????????leftShow ???????????????rightHide
          homeLi1[oldIndex].className = "rightHide";
          homeLi1[this.index].className = "leftShow";
        }
        //                    ???????????????
        oldIndex = this.index;
        autoIndex = this.index;
        auto();
      };
    }
    function auto() {
      homeTimer = setInterval(function () {
        autoIndex++;
        //                  0123     homeLi2.length = 4;
        //                  1234
        if (autoIndex == homeLi2.length) {
          autoIndex = 0;
        }
        //                 ?????????????????????????????????
        homeLi1[oldIndex].className = "leftHide";
        homeLi1[autoIndex].className = "rightShow";
        //                  ???????????????
        for (var i = 0; i < homeLi2.length; i++) {
          homeLi2[i].className = "";
        }
        homeLi2[autoIndex].className = "active";
        //                  ????????????
        oldIndex = autoIndex;
      }, 3000);
    }
    auto();
  }
  //????????????
  function loading() {
    var imgFlag = 0;
    var arr = [
      "bg1.jpg",
      "bg2.jpg",
      "bg3.jpg",
      "bg4.jpg",
      "bg5.jpg",
      "bird.png",
      "game1.jpg",
      "game2.jpg",
      "game3.jpg",
      "game4.jpg",
      "linking1.jpg",
      "linking2.jpg",
      "linking3.jpg",
      "linking4.jpg",
    ];
    for (var i = 0; i < arr.length; i++) {
      var imgNode = new Image();
      imgNode.src = "img/" + arr[i];
      imgNode.onload = function () {
        imgFlag++;
        maskLine.style.width = (imgFlag / arr.length) * 100 + "%";
        maskLine.style.width = (imgFlag / arr.length) * 100 + "%";
      };
    }
    maskLine.addEventListener("transitionend", function () {
      maskTop.style.height = "0";
      maskBottom.style.height = "0";
      maskLine.style.display = "none";
    });
    maskTop.addEventListener("transitionend", function () {
      home3d();
      mask.remove();
    });
  }
  loading();
  contentBind();
  headerBind();
  setInterval(function () {
    getCurrentTime();
  }, 1000);
  openNew();
  Calendar();
  musicplay();
  picBoom();
  loadCityData();
};
