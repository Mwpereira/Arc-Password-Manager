<template>
	<div class="settings">
            <span class ="salt">
                <h3>Salt Level:</h3>
                <input class="input-bar" id="salt" type="text" placeholder="10" v-model="saltLevel"/>
                <p style="margin-left: 3rem; margin-top: 1rem;">- Scale: 1-20 <br>- Default/Recommended: 10 <br>- Higher Salt Level = Greater Security & Longer Encryption Time</p>
            </span>
		<input class="action-btn" id="save" type="submit" value="Save"/>
	</div>
</template>

<script>
export default {
    name: "Settings",
    data: () => {
        return{
            n: 1,
        }
	},
	methods: {
    }
};


</script>

<style scoped>

div{
    overflow: hidden;  
}

h3{
    font-size: 22px;
    margin: 3rem;
    cursor: default;
}

p{
    font-size: 20px;
    text-align: center;
}

.salt{
    display: flex;
    flex-direction: row;
}

#salt{
    height: rem;
    align-self: center;
    width: 2rem;
    color: black;
}

#save{
    float: right;
    margin: 5rem;
}

</style>