<template>
  <div class="card stripcard">
    <header class="card-header">
      <p class="card-header-title">
        <span>{{title}}</span>
        <span style="margin-left:10%" v-if="totalPrice!=null">Total Price : {{totalPrice}}</span>
        <span style="margin-left:10%" v-if="cutPrice!=null">Cut Price : {{cutPrice}}</span>
      </p>
      <router-link :to="slug1+slug2" class="card-header-icon"  aria-label="more options">
        edit
      </router-link>
    </header>
  </div>
</template>

<script>
export default {
    props:{
        title:String,
        slug1:String,
        slug2:String,
        totalPrice: null,
        cutPrice:null

    }
}
</script>

<style scoped>
.stripcard {
  margin-top: 10px;
}
.card-header-title{
  color:#25d1b2
}
</style>
