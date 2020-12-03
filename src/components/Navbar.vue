<template>
	<nav>
		<div class="nav-wrapper">
			<router-link href="#!" to="/" class="brand-logo">Задания</router-link>
			<ul class="right hide-on-med-and-down">
				<router-link tag="li" to="/" exact active-class="active">
					<a href="sass.html">Добавить</a>
				</router-link>
				<router-link tag="li" to="/" active-class="active">
					<a href="sass.html">Список</a>
				</router-link>
			</ul>
		</div>
	</nav>
</template>

<script>
export default {
	
}
</script>

<style lang="scss" scoped>

</style>