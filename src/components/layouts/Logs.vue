<template>
  <article :class="{type}">
    <div class="message-header">
      <p>Danger</p>
      <button class="delete" aria-label="delete"></button>
    </div>
    <div class="message-body">
      <strong>{{message}}</strong>
    </div>
  </article>
</template>

<script>
export default{
    props:{
        type:String,
        message:String
    }
}
</script>
