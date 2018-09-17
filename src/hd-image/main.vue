<template>
	<b-col lg=6 class="one-project-container">
	<div class="project-image-container" v-on:click="displayHD(imagePath)">
		<div class="project-text">
			{{ shortText }}
		</div>
		<img :src="imagePath" />
	</div>
	</b-col>
</template>

<script>
var displayHD = function(url) {
	var frame = document.getElementById("hd-frame-image");
	frame.src = url;
	var container = document.getElementById("hd-frame");
	container.style.display = "table-cell";
};

export default {
  data () {
    return {	
    }
  },
  methods: {
  	displayHD
  },
  props: ["imagePath", "shortText"]
}
</script>

<style>
.project-image-container:hover .project-text {
	opacity: 1;
}

.project-text {
	opacity: 0;
	position: absolute;
	top: 50%;
	left: 50%;
	background: rgb(0, 0, 0, 0.3);
	z-index: 10;
	font-size: 2em;
	font-weight: bold;
	color: white;
	transform: translateX(-50%) translateY(-50%);
	transition: all 0.3s;
}
.one-project-container {
	display: inline-block;
	height: 200px;
	text-align: center;
	padding-bottom: 10px;
}
.project-image-container {
	height: 100%;
	cursor: pointer;
}

.one-project-container img {
	height: 100%;
	border: solid rgba(255,255,255,0.8) 3px;
}
</style>