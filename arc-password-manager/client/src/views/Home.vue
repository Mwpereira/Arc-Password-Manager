<template>
    <div class="home">
        <Accounts @clearComponent="clearComponent" @loadForm="loadForm"/>
        <span class="components">
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
            <component id="form" @editForm="editForm" @clearComponent="clearComponent" :is="component"></component>
        </span>
        <span class="userClass">
        <h1 id="header">Computer Details</h1>
            <span class="userData">
                <h2>Arc Username:</h2>
                <h2>{{user}}</h2>
            </span>
            <span class="userData">
                <h2>Public IPv4:</h2>
                <h2>{{userIP}}</h2>
            </span>
            <span class="userData">
                <h2>Location:</h2>
                <h2>{{userLocation}}</h2>
            </span>
            <span>
                <br>
                <br>
                <br>
                <h2>Recommended VPNs Include</h2>
                <h2>ExpressVPN</h2>
                <h2>NordVPN</h2>
                <h2>CyberGhost</h2>
                <h2>ProtonVPN</h2>
                <h2>VyprVPN</h2>
                <br>
                <h3>Protect Yourself. Get a VPN.</h3>
            </span>
        </span>
    </div>
</template>

<script>
import Accounts from "@/components/Accounts";
import AddForm from "@/components/AddForm";
import AutoGenPass from "@/components/AutoGeneratePassword";
import EditForm from "@/components/EditForm";
import LoadForm from "@/components/LoadForm";
import store from "@/store";

import axios from 'axios';

export default {
    name: "Home",
    components: { Accounts, AddForm, AutoGenPass, EditForm, LoadForm},
    data: () => {
        return {
            component: "",
            user: "",
            userIP: "",
            userLocation: "",
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
        },
        location(){
            try
            {
            var ip = '99.227.56.175'
            var access_key = '9c8a0ad01218d47df2c7ac36e8c38421';

            axios.get('http://api.ipstack.com/' + ip + '?access_key=' + access_key)
                .then((response) => {
                    this.userLocation = response.data.city + ", " + response.data.country_name;
                })
                .catch(function (error) {
                console.log(error);
                })
            }
            catch(e){
                console.log(e);
            }       
        },
        publicIPv4() {
            try
            {
                var http = require('http');

                http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, (resp) => {
                resp.on('data', (ip) => {
                    this.userIP = ip.toString();
                });
                });
            }
            catch(e){
                console.log(e);
            }
        }
    },
    mounted() {
        console.log(store.getters.user);
        this.user = store.getters.user;
        this.user = "Mwp";
        this.publicIPv4();
        this.location();
    },
};
</script>   

<style scoped>
div {
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
}

span {
    justify-content: flex-start;
}

h1{
    font-size: 26px;
}

h2 {
    font-family: "Varela Round", sans-serif;
    font-size: 20px;
    color: black;
    text-align: center;
    margin-top: 1rem;
    margin-left: 1rem;
}

h3{
    text-align: center;
    margin-top: 2rem;
    font-style: italic;
}

.home{
    background-color: whitesmoke;
    width: auto;
}

.components{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.userClass{
    width: 90vh;
    background: rgba(119, 119, 119, 0.05);
}

.userData{
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.buttons{
    align-items: left;
    margin-left: -1rem;
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

#header{
    margin-top: 1rem;
    margin-bottom: 1rem;
    text-align: center;
}

@media only screen and (max-width: 1200px) {
    .userClass {
        display: none;
    }
}

@media only screen and (min-height: 900px) {
    #form{
        margin-top: 5rem;
    }
}
</style>
