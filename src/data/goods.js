export default {
    goods: {    "id": "1",
    "product_id": "11",
    "title": "matcha",
    "subtitle": "自制雪花酥,抹茶饼干,芝士饼干,下单再制作",
    "price": 59,
    "market_price": 99,
    "express": "免运费",
    "remain": 19,
    "thumb": [
      "http://192.168.126.148:8081/mongodb/img/origin_20190117150637.jpg",
      "http://192.168.126.148:8081/mongodb/img/IMG_8230_20190117152143.jpg",
      "http://192.168.126.148:8081/mongodb/img/IMG_8225_20190117152215.jpg"
    ],
    "info": "自制雪花酥,抹茶饼干,芝士饼干,下单再制作"
    },
    "goodsPromises": [
      {
        "id": "1",
        "name": "次日达",
        "info": "指定时间前下单，次日送达",
        "icon": "passed",
        "color": "red"
      },
      {
        "id": "2",
        "name": "自提",
        "info": "我们提供多种自提服务，包括自提点、自助提货柜、移动自提车等服务",
        "icon": "passed",
        "color": "red"
      },
      {
        "id": "3",
        "name": "闪电退款",
        "info": "签收7天内退货的，提供先退款后退货服务。",
        "icon": "passed",
        "color": "red"
      },
      {
        "id": "4",
        "name": "七天无理由退货（拆封后不支持）",
        "info": "七天无理由退货（拆封后不支持）",
        "icon": "passed",
        "color": "red"
      },
      {
        "id": "5",
        "name": "前海保税仓",
        "info": "本商品由前海保税仓发货",
        "icon": "passed",
        "color": "red"
      }
    ],
    "sku": {
      "id": "1",
      "tree": [
        {
          "id": "1",
          "k": "口味",
          "v": [
            {
              "id": "matcha",
              "name": "抹茶",
              "imgUrl": "http://192.168.126.148:8081/mongodb/img/matcha_20190117150220.jpg"
            },
            {
              "id": "origin",
              "name": "原味",
              "imgUrl": "http://192.168.126.148:8081/mongodb/img/origin_20190117150637.jpg"
            }
          ],
          "k_s": "s1"
        },
        {
          "id": "2",
          "k": "数量",
          "v": [
            {
              "id": "large",
              "name": "大包(12)",
              "imgUrl": null
            },
            {
              "id": "mini",
              "name": "迷你装(5)",
              "imgUrl": null
            }
          ],
          "k_s": "s2"
        }
      ],
      "list": [
        {
          "id": "10",
          "price": 5900,
          "s1": "origin",
          "s2": "large",
          "s3": "0",
          "stock_num": 10
        },
        {
          "id": "11",
          "price": 3000,
          "s1": "matcha",
          "s2": "mini",
          "s3": "0",
          "stock_num": 55
        },
        {
          "id": "12",
          "price": 5900,
          "s1": "matcha",
          "s2": "large",
          "s3": "0",
          "stock_num": 50
        },
        {
          "id": "13",
          "price": 3000,
          "s1": "origin",
          "s2": "mini",
          "s3": "0",
          "stock_num": 20
        }
      ],
      "collection_id": "1",
      "stock_num": 99,
      "price": "59",
      "none_sku": false,
      "hide_stock": false
    }
  
}