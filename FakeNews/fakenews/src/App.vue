<template>
<div id="background">
    <div id="app">
      <DonaldTrump />
    </div>
</div>
</template>

<script>
import DonaldTrump from './components/DonaldTrump.vue'


export default {
  name: 'App',
  components: {
    DonaldTrump
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap');
#app {
  font-family: "Luckiest Guy";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;

  
}

#background{
  background-image: linear-gradient(rgb(80, 164, 233),rgb(35, 92, 139));
  min-height: 100%;
  min-width: 1024px;
	
  width: 100%;
  height: auto;
  position: fixed;
  top: 0px;
  left: 0px;
}

@media all and (max-width: 50em) {
  #background{
  background-image: linear-gradient(rgb(80, 164, 233),rgb(35, 92, 139));
  min-height: 100%;
  min-width: 110%;
	display: block;
  height: auto;
	padding-bottom: 10%;
  position: relative;
  top: -10px;
  left: -10px;
}
}


</style>
