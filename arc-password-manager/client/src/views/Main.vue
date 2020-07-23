<template>
	<div class="main">
		<keep-alive>
			<Header />
		</keep-alive>
		<router-view />
	</div>
</template>

<script>
import Header from '@/components/Header';

export default {
	name: 'Main',
	components: { Header },
	data: () => {
		return {};
	},
};
</script>

<style scoped>
.main {
	background: white;
}
.validation-form {
	width: 22.5rem;
	border-radius: 15px;
	padding: 0.25rem 0.25rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.action-btn {
	color: white;
	justify-content: center;
	border: none;
	border-radius: 100px;
	width: 150px;
	height: 50px;
	outline: none;
	font-size: large;
	font-weight: 550;
	margin: 10px;
	cursor: pointer;
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

.input-bar:hover,
:focus {
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	border-bottom: none;
}
</style>
