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
					<textarea id="description" class="materialize-textarea" v-model="text"></textarea>
					<label for="description">Textarea</label>
					<span class="character-counter" style="float: right; font-size: 12px;">{{checkLengthText()}}/{{lengthText}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'Home',
	data() {
		return {
			title: '',
			text: '',
			lengthText: 1024
		}
	},
	methods: {
		checkLengthText() {
			if (this.text.length > this.lengthText) {
				this.text = this.text.slice(0, this.lengthText)
			}
			return this.text.length
		}
	},
	mounted() {
		M.Chips.init(this.$refs.chips, {
			placeholder: 'Теги заданий'
		});
	}
}
</script>
