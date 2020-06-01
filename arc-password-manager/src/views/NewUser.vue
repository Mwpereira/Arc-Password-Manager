<template>
	<div class="newUser">

		<h1 style="color:black; margin-top: 3rem;">Arc</h1>

        <span class="slideshow-container">

            <input class="close-btn" value="X" onclick="javascript:location.href='/home'" />
		
            <span class="images fade">
			<img src="../assets/padlock.png" style="width:100%" />
			<div class="text">Advanced libraries and alogirthms used to keep your accounts and data safe.</div>
            </span>

            <span class="images fade">
			<img src="../assets/antivirus.png" style="width:100%" />
			<div class="text">No external traffic exported from the software, with 100% encryption and security.</div>
            </span>

            <span class="images fade">
			<img src="../assets/salt.png" style="width:100%" />
			<div class="text">Choose your custom level of 'salt' to go with your encryption and make it extra secure for your insurance.</div>
            </span>
        
        </span>
		<br>

        <form @submit.prevent="plusSlides">
			<a class="prev" v-on:click="plusSlides(-1)">&#10094;</a>
			<a class="next" v-on:click="plusSlides(+1)">&#10095;</a>
		</form>

        <form @submit.prevent="currentSlide">
        <span class="dots-display">
		<span class="dot" v-on:click="currentSlide(1)"></span>
		<span class="dot" v-on:click="currentSlide(2)"></span>
		<span class="dot" v-on:click="currentSlide(3)"></span>   
        </span>
        </form> 

	</div>
</template>

<script>

export default {
	name: 'newUser',
	data: () => {
        return{
            n: 1,
        }
	},
	methods: {
        // Next/previous controls
        plusSlides(n) {
            this.showImages(slideIndex += n);
        },
        // Thumbnail image controls
        currentSlide(n) {
            this.showImages(slideIndex = n);
        },
		showImages(n) {
        var i;
        var slides = document.getElementsByClassName("images");
        var dots = document.getElementsByClassName("dot");
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex-1].style.display = "block";
        dots[slideIndex-1].className += " active";
        }
    },
    mounted (){
        this.showImages(slideIndex);
    }
};

var slideIndex = 1;

</script>

<style scoped>

div {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	height: 100%;
    overflow: hidden;
}

h1{
    padding: 3rem;
}

.close-btn {
	background-color: whitesmoke;
	position: absolute;
	color: black;
	font-weight: bold;
	text-align: center;
	border: none;
	border-radius: 10px;
	width: 1.5rem;
	height: 1.5rem;
	outline: none;
	font-size: 12px;
	cursor: pointer;
	right: 2rem;
    top: 1%;
}

.slideshow-container {
	margin: auto;
}

.images {
	display: none;
	width: 15rem;
	margin-top: -1rem;
}

.prev,
.next {
	cursor: pointer;
	position: absolute;
	width: auto;
	padding: 2rem;
	color: white;
	font-weight: bold;
	font-size: 18px;
	transition: 0.6s ease;
	border-radius: 0 3px 3px 0;
	user-select: none;
	background-color: #71c6ff;
    top: 45%;
}

.prev {
	left: 0;
}

.next {
	right: 0;
	border-radius: 3px 0 0 3px;
}

.prev:hover,
.next:hover {
	background-color: rgba(0, 0, 0, 0.8);
}

.text {
	color: black;
	font-size: 24px;
	margin-top: 2rem;
	margin-left: -5rem;
	width: 25rem;
	text-align: center;
}

.dots-display {
	display: flex;
	flex-direction: row;
}

.dot {
	cursor: pointer;
	height: 15px;
	width: 15px;
	margin: 0 5px;
	margin-bottom: 4rem;
	background-color: #bbb;
	border-radius: 50%;
	display: inline-block;
	transition: background-color 0.6s ease;
}

.active,
.dot:hover {
	background-color: #717171;
}

.fade {
	-webkit-animation-name: fade;
	-webkit-animation-duration: 1.2s;
	animation-name: fade;
	animation-duration: 1.2s;
}

@-webkit-keyframes fade {
	from {
		opacity: 0.4;
	}
	to {
		opacity: 1;
	}
}

@keyframes fade {
	from {
		opacity: 0.4;
	}
	to {
		opacity: 1;
	}
}

</style>
