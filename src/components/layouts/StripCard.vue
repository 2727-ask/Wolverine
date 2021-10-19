<template>
  <div class="card stripcard">
    <header class="card-header">
      <p class="card-header-title">
        {{doctorName}}
      </p>
      <router-link :to="/updatedoctor/+slug" class="card-header-icon"  aria-label="more options">
        edit
      </router-link>
    </header>
  </div>
</template>

<script>
export default {
    props:{
        doctorName:String,
        slug:String
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
