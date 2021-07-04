/*json数据*/
var jsonList = [
  {
    provice: "北京市",
    city: [
      "东城区",
      "西城区",
      "朝阳区",
      "丰台区",
      "石景山区",
      "海淀区",
      "门头沟区",
      "房山区",
      "通州区",
      "顺义区",
      "昌平区",
      "大兴区",
      "怀柔区",
      "平谷区",
      "密云区",
      "延庆区",
    ],
  },
  {
    provice: "天津市",
    city: [
      "和平区",
      "河东区",
      "河西区",
      "南开区",
      "河北区",
      "红桥区",
      "东丽区",
      "西青区",
      "津南区",
      "北辰区",
      "武清区",
      "宝坻区",
      "滨海新区",
      "宁河区",
      "静海区",
      "蓟州区",
    ],
  },
  {
    provice: "河北省",
    city: [
      "石家庄市",
      "唐山市",
      "秦皇岛市",
      "邯郸市",
      "邢台市",
      "保定市",
      "张家口市",
      "承德市",
      "沧州市",
      "廊坊市",
      "衡水市",
    ],
  },
  {
    provice: "山西省",
    city: [
      "太原市",
      "大同市",
      "阳泉市",
      "长治市",
      "晋城市",
      "朔州市",
      "晋中市",
      "运城市",
      "忻州市",
      "临汾市",
      "吕梁市",
    ],
  },
  {
    provice: "广东省",
    city: [
      "广州市",
      "韶关市",
      "深圳市",
      "珠海市",
      "汕头市",
      "佛山市",
      "江门市",
      "湛江市",
      "茂名市",
      "肇庆市",
      "惠州市",
      "梅州市",
      "汕尾市",
      "河源市",
      "阳江市",
      "清远市",
      "东莞市",
      "中山市",
      "潮州市",
      "揭阳市",
      "云浮市",
    ],
  },
];

/*    资料添加*/
var provice = "";
var city = "";
function loadCityData() {
  for (var i = 0; i < jsonList.length; i++) {
    provice =
      "<option data-index=" +
      i +
      " value='" +
      jsonList[i].provice +
      "'>" +
      jsonList[i].provice +
      "</option>";
    $(".provinceTarget").append(provice);
  }
}

$(function () {
  $(".provinceTarget").change(function () {
    $(".cityTarget").empty();
    var opt = $(".provinceTarget option:selected").attr("data-index");
    //        console.log(opt);
    if (opt == "-1") {
      city = "<option data-index='-1' value='城市'>城市</option>";
      $(".cityTarget").append(city);
    } else {
      var length = jsonList[opt].city.length;
      for (var j = 0; j < length; j++) {
        city =
          "<option data-index=" +
          j +
          " value=" +
          jsonList[opt].city[j] +
          ">" +
          jsonList[opt].city[j] +
          "</option>";
        $(".cityTarget").append(city);
      }
    }
  });
});
//更新省份和城市
function updateLocationInfo(proviceName, cityName) {
  var pIndex = -1;
  for (var i = 0; i < jsonList.length; i++) {
    if (jsonList[i].provice.indexOf(proviceName) != -1) {
      pIndex = i;
      $(".provinceTarget").empty();
      for (var j = 0; j < jsonList.length; j++) {
        provice =
          "<option data-index=" +
          j +
          " value='" +
          jsonList[j].provice +
          "'>" +
          jsonList[j].provice +
          "</option>";
        if (j == pIndex) {
          provice =
            "<option data-index=" +
            j +
            " selected value='" +
            jsonList[j].provice +
            "'>" +
            jsonList[j].provice +
            "</option>";
        }
        $(".provinceTarget").append(provice);
      }
      $(".cityTarget").empty();
      var cLen = jsonList[pIndex].city.length;

      for (var w = 0; w < cLen; w++) {
        city =
          "<option data-index=" +
          w +
          " value=" +
          jsonList[pIndex].city[w] +
          ">" +
          jsonList[pIndex].city[w] +
          "</option>";
        if (jsonList[pIndex].city[w] == cityName) {
          city =
            "<option data-index=" +
            w +
            " selected value=" +
            jsonList[pIndex].city[w] +
            ">" +
            jsonList[pIndex].city[w] +
            "</option>";
        }
        $(".cityTarget").append(city);
      }
      break;
    }
  }
}
