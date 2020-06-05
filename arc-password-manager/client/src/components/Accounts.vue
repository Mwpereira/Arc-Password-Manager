<template>
	<div class="accounts">
        <li class="list-accounts">
        <h2>Accounts</h2>
        </li>
	</div>
</template>

<script>
export default {
	name: 'Accounts',
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

div{
    width: 15rem;
    height: 100%;
    z-index: 99;
}

h2{
    color: black;
    text-align: center;
    margin-top: 1rem;
}

.list-accounts{
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0;
    height: 100%;
    background-color: red;
}

</style>
