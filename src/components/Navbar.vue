<template>
	<nav class="deep-purple">
		<div class="container">
			<div class="nav-wrapper">
				<router-link to="/" class="brand-logo">Задачник</router-link>
				<ul class="right hide-on-med-and-down">
					<router-link tag="li" to="/" exact active-class="active">
						<a href="#">Добавить</a>
					</router-link>
					<router-link tag="li" to="/list" active-class="active">
						<a href="#">Список</a>
					</router-link>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script>
export default {
	
}
</script>

<style lang="scss" scoped>

</style>