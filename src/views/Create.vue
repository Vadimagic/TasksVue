<template>
	<div>
		<div class="row">
			<div class="col s6 offset-s3">
				<h1 class="bold">Создать задачу</h1>
				<div class="input-field">
					<input id="title" type="text" class="validate" required>
					<label for="title">Title</label>
				</div>
				<div class="chips" ref="chips"></div>
				<div class="input-field">
					<textarea id="textarea1" class="materialize-textarea"></textarea>
					<label for="textarea1">Textarea</label>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'Home',
	mounted() {
		M.Chips.init(this.$refs.chips, {
			placeholder: 'Теги заданий'
		});
	}
}
</script>
