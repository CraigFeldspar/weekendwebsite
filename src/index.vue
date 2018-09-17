<template>
<b-container fluid class="main"> 
	<transition name="fade" mode="out-in">
		<component :is="currentView"></component>
	</transition>
	<div id="hd-frame" v-on:click="closeFrame()">
		<img id="hd-frame-image" src="" />
	</div>
</b-container>
</template>

<script>
import Header from "./header/main.vue";
import Landing from "./landing/main.vue";

var closeFrame = function() {
	var elt = document.getElementById("hd-frame");
	elt.style.display = "none";
}

export default {
  data () {
    return {
    	currentView: "landing"
    }
  },
  methods : {
  	closeFrame
  },
  components: {
  	"header-bar" : Header,
  	"landing" : Landing,
  }
}
</script>

<style>
.fade-transition {
  transition: opacity 0.1s ease;
}

.fade-enter, .fade-leave {
  opacity: 0;
}
#hd-frame img {
	height: 90%;
}
#hd-frame {
	line-height: 100vh;
	vertical-align: middle;
	text-align: center;
	display: none;
	position: fixed;
	z-index: 20;
	width: 100vw;
	height: 100vh;
	top: 0px;
	left: 0px;
	background: rgba(0, 0, 0, 0.3);
}

.main {
	min-height: 100vh;
}

.content {
	height: calc(100vh - 160px);
}

body {
	background-image: url(./background.jpg);
	background-repeat: no-repeat;
	background-size: 100%;
}
</style>