<template>
  <div class="table">
    <div class="header">
      <div class="left">
        <slot name="headerLeft"></slot>
      </div>
      <div class="right">
        <slot name="headerRight"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableHeader'
}
</script>

<style scoped>
.table {
  width: 100%;
  height: 100%;
  padding-left: 10px;
  padding-right: 10px;
}
.header {
  width: 100%;
  height: 8vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
}
.left {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.left > * {
  margin-right: 10px;
}
.right > * {
  margin-left: 10px;
}
</style>
