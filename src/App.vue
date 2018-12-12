<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      filter: true
    };
  },
  methods: {
    moveSession(filter) {

      console.log(filter);
      if (filter) {
    
        this.filter = !filter;
        setTimeout(() => {
   
          sessionStorage.removeItem("hsjr_username");
        }, 100);
      }
    },

  },

  mounted() {}
};
</script>

<style>
@import "../static/css/main.css";
</style>
