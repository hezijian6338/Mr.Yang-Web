<template>
<div>
    <ul :class="'cap-goods-list__container cap-goods-list__container--'+data.classname+' cap-goods-list__container--'+data.parameterDictionary.showtype+'   '+(data.parameterDictionary.type=='6'?'nowrap':'')" >
        <li v-if="productlist.length==0" style="width:100%;height:150px;border:0px;">
            <div style="width:100%;height:150px;"></div>
        </li>
        <li v-for="(item,index) in productlist" :key="index" :class="'cap-goods-list__wrapper  '+(data.parameterDictionary.type=='3'?(index%3==0?'cap-goods-list__wrapper--hybrid-big ':'cap-goods-list__wrapper--hybrid-small '):'')">
            <router-link :class="'cap-goods-list__item cap-goods-list__item--'+data.classname+' '+data.parameterDictionary.showtype+' '+data.aclass" :to="'/product/'+item.goods_id">
                <div class="cap-goods-list__photo">
                    <img class="cap-goods-list__img lazy lazyload" v-lazy="item.imageURL+'?w='+((data.parameterDictionary.type=='1'||data.parameterDictionary.type=='3')?'750':'375')" />
                </div>
                <div :class="'cap-goods-list__info has-title has-price '+(data.parameterDictionary.showtype == 'card'?'has-btn':'')">
                    <h3 class="title">{{item.title}}</h3>
                    <p class="sale-info">
                        <span class="sale-price">¥ {{item.price}}</span>
                    </p>
                </div>
                <div v-if="data.parameterDictionary.showtype == 'card'" class="cap-goods-list__buy-btn-wrapper cap-goods-list__buy-btn-wrapper--4">
                    <button class="cap-goods-list__buy-btn-4 van-button van-button--default van-button--small">{{data.parameterDictionary.buttonvalue}}</button>
                </div>
            </router-link>
        </li>
    </ul>
    <div style="clear:both;"></div>
    </div>
</template>

<script>
import {getProduct} from "../../api/page.js";

export default {
    name:'product',
    data () {
       return {
           productlist: []
       }
     },
    props:{
        data:Object
    }, 
    created:function(){
        console.log("product -- pageSectionId: " + this.data.pageSectionId)
        var id=this.data.pageSectionId;
        var data=this.data;
        var classname = "big";
        var aclass = "";
        var type = this.data.parameterDictionary.type + ""
        console.log("Product -- data.type: " + type)
        switch (type) {
            case "1":
                aclass = "cap-goods-list__item--btn1 cap-goods-list__item--ratio-3-2 cap-goods-list__item--whitespace";
                break;
            case "2":
                classname = "small";
                aclass = "cap-goods-list__item--btn1 cap-goods-list__item--padding";
                break;
            case "3":
                classname = "hybrid";
                aclass = "cap-goods-list__item--big cap-goods-list__item--hybrid-big cap-goods-list__item--btn1 cap-goods-list__item--padding";
                break;
            case "4":
                classname = "list";
                aclass = "cap-goods-list__item--btn4 cap-goods-list__item--padding";
                break;
            case "5":
                classname = "three";
                aclass = "cap-goods-list__item--btn4 cap-goods-list__item--padding";
                break;
            case "6":
                classname = "three";
                break;
        }
        data.classname=classname;
        data.aclass=aclass;
        getProduct().then(response => {
            this.productlist=response.data.list;
        })
        console.log("Product -- End --- Product")
    }
}
</script>

<style>

</style>
