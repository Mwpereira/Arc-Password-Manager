<template>
    <div class="home">
        <Accounts @clearComponent="clearComponent" @loadForm="loadForm"/>
        <span>
            <span class="buttons">
                <input
                    @click="component = 'AddForm'"
                    id="addAccount"
                    class="main-btn"
                    type="submit"
                    value="+ Add Account"
                />
                <input
                    @click="component = 'AutoGenPass'"
                    id="autoGenPass"
                    class="main-btn"
                    type="submit"
                    value="+ Auto Generate Password"
                />
            </span>
            <component @editForm="editForm" @clearComponent="clearComponent" :is="component"></component>
        </span>
    </div>
</template>

<script>
import Accounts from "@/components/Accounts";
import AddForm from "@/components/AddForm";
import AutoGenPass from "@/components/AutoGeneratePassword";
import EditForm from "@/components/EditForm";
import LoadForm from "@/components/LoadForm";

export default {
    name: "Home",
    components: { Accounts, AddForm, AutoGenPass, EditForm, LoadForm },
    data: () => {
        return {
            component: "",
        };
    },
    methods: {
        clearComponent() {
            this.component = "";
        },
        editForm(){
            this.component = "EditForm";  
        },
        loadForm(){
            this.component = "LoadForm";  
        }
    },
    mounted() {},
};
</script>   

<style scoped>
div {
    display: flex;
    flex-direction: row;
    height: 100%;
}

span {
    justify-content: flex-start;
}

h2{
    color: black;
    font-size: 30px;
}

.home{
    background-color: whitesmoke;
}

.buttons {
    display: flex;
    flex-direction: row;
}

.main-btn{
	color: black;
	justify-content: center;
	border: none;
	border-radius: 100px;
	width: 250px;
	height: 50px;
	outline: none;
	font-size: large;
	font-weight: 550;
	margin: 10px;
	cursor: pointer;
    background-color: white;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.input-bar {
	outline: none;
	border: none;
    border-bottom: 2px solid black;
	background-color: rgba(255, 255, 255, 0);
	margin: 10px;
	font-size: 22px;
	font-family: 'Bitter';
	color: black;
	padding: 5px 5px;
	cursor: text;
    width: 20rem;
}

.input-bar:hover,:focus{
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-bottom: none;
}

#addAccount {
    cursor: pointer;
    margin-top: 1.5rem;
    margin-left: 1.5rem;
}

#autoGenPass {
    cursor: pointer;
    margin-top: 1.5rem;
    margin-left: 1rem;
}
</style>
