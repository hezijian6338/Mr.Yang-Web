<template>
  <div :style="'background-color:'+((page.backgroundColor==undefined||page.backgroundColor=='')?'#fff':page.backgroundColor)">
    <div :style="'height:'+topheight+'px'"></div>
    <div v-for="(item,index) in page.sections"
         :key="index">
      <imageAd v-if="item.code=='ImageAd'"
               :data="item.parameterDictionary"></imageAd>

      <imageText v-if="item.code=='ImageText'"
                 :data="item.parameterDictionary"></imageText>

      <pageLine v-if="item.code=='Line'"
                :data="item.parameterDictionary"></pageLine>

      <whitespace v-if="item.code=='Line'"
                  :data="item.parameterDictionary" />

      <pageText v-if="item.code=='Text'"
                :data="item.parameterDictionary"></pageText>

      <notice v-if="item.code=='Notice'"
              :data="item.parameterDictionary"></notice>

      <search v-if="item.code=='Search'"
              :data="item.parameterDictionary"
              v-on:settopheight="settopheight($event)"></search>

      <pageTitle v-if="item.code=='Title'"
                 :data="item.parameterDictionary"></pageTitle>

      <cube v-if="item.code=='Cube'"
            :data="item.parameterDictionary"></cube>

      <product v-if="item.code=='Product'"
               :data="item"></product>
    </div>

  </div>
</template>
<script>
import '../../assets/style/index.css';
import whitespace from '../../components/page/whitespace.vue';
import pageLine from '../../components/page/line.vue';
import pageText from '../../components/page/text.vue';
import notice from '../../components/page/notice.vue';
import search from '../../components/page/search.vue';
import pageTitle from '../../components/page/title.vue';
import cube from '../../components/page/cube.vue';
import imageAd from '../../components/page/imageAd.vue';
import imageText from '../../components/page/imageText.vue';
import product from '../../components/page/product.vue';
import { GetPage } from '../../api/page.js';

export default {
  name: 'page',
  components: {
    whitespace,
    pageLine,
    pageText,
    notice,
    search,
    pageTitle,
    cube,
    [imageAd.name]: imageAd,
    imageText,
    product
  },
  data: function () {
    return {
      topheight: 0,
      page: {},
    }
  },
  created: function () {
    GetPage().then(response => {
      this.page = response.data;
    });
  },
  methods: {
    settopheight: function (value) {
      this.topheight = value;
    }
  }
}
</script>
