<template>
	<div class="addform">
        <h1>hello friend</h1>
	</div>
</template>

<script>
export default {
	name: 'AddForm',
	props: ['mode'],
	data: () => {
        return {
            p: "",
        };
    },
    methods: {

    },
	mounted(){
		
	}
};
</script>

<style scoped>
div {
    height: 100vh;
    width: 75%;
    position: absolute;
    right: 0;
    bottom: 0;
}

h1{
    color: black;
}
</style>
