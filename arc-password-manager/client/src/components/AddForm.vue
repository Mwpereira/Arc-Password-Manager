<template>
	<div class="addForm">
        <form @submit.prevent="saveAccount">
            <span>
            <label>Email:</label>
            <input autofocus class="input-bar" type="text" v-model="email"/>
            </span>
            <span>
            <label>Username:</label>
            <input class="input-bar" type="text" v-model="username" />
            </span>
            <span>
            <label>Password:</label>
            <input class="input-bar" type="text" v-model="password" />
            </span>
            <span>
            <input class="action-btn" type="submit" value="Save" @click="saveAccount"/>
            <input class="action-btn" type="submit" value="Cancel" @click="completeAccount"/>
            </span>
        </form>
	</div>
</template>

<script>
export default {
	name: 'AddForm',
	props: ['component'],
	data: () => {
        return {
            email: "",
            username: "",
            password: ""
        };
    },
    methods: {
        completeAccount(){
            this.$emit('eventname');
        },
        saveAccount() {
            let form = document.getElementsByTagName("form")[0];
            this.completeAccount();
           
                let email = form.children[0].value;
                let username = form.children[1].value;
                let password = form.children[2].value;

                let account = {
                    email: email,
                    username: username,
                    password: password
                };

                sessionStorage.setItem('account', account);
        }        
    },
	mounted(){
		
	}
};
</script>

<style scoped>
div {
    height: 75%;
    width: 60%;
    margin-top: 8rem;
    margin-left: 2rem;
    display: flex;
    flex-direction: column;
}

span{
    margin-top: 2rem;
    display: flex;
    flex-direction: row;
    margin-bottom: 2rem;
    align-items: center;
    justify-content: flex-end;
}

h1{
    color: black;
}

label {
    font-size: 24px;
    cursor: default;
}

input{
    background-color: white;
    color: black;
}

.addForm{
    display: flex;
    flex-direction: column;
    
    align-items: center;
    height: auto;
    width: 100%;
    background-color: rgb(229,229,229);
}
</style>
