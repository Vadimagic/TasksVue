<template>
	<div class="row">
		<div class="col s6 offset-s3">
			<h1 class="bold">Создать задачу</h1>

			<form @submit.prevent="addTask">
				<div class="input-field">
					<input 
						id="title" 
						type="text" 
						class="validate" 
						required
						v-model="title"
					>
					<label for="title">Title</label>
				</div>

				<div class="chips" ref="chips"></div>

				<div class="input-field">
					<textarea v-model="text" id="description" class="materialize-textarea"></textarea>
					<label for="description">Textarea</label>
					<span class="character-counter">{{checkLengthText()}}/{{lengthText}}</span>
				</div>

				<input type="text" class="datepicker" ref="datepicker">

				<button class="btn waves-effect waves-light deep-purple" type="submit" name="action">
					Создать задание
					<i class="material-icons right">send</i>
				</button>
			</form>
		</div>
	</div>
</template>

<script>

export default {
	name: 'Home',
	data() {
		return {
			title: '',
			tags: null,
			text: '',
			date: null,
			lengthText: 1024
		}
	},
	methods: {
		checkLengthText() {
			if (this.text.length > this.lengthText) {
				this.text = this.text.slice(0, this.lengthText)
			}
			return this.text.length
		},
		addTask() {
			const task = {
				id: Date.now(),
				title: this.title,
				tags: this.tags.chipsData,
				text: this.text,
				date: this.date.date,
				status: 'в работе'
			}

			this.$store.dispatch('addTask', task);
			this.$router.push('/list')
		}
	},
	mounted() {
		this.tags = M.Chips.init(this.$refs.chips, {
			placeholder: 'Теги заданий'
		});
		this.date = M.Datepicker.init(this.$refs.datepicker, {
			format: 'dd.mm.yyyy',
			defaultDate: new Date(),
			setDefaultDate: true
		});
	},
	destroyed() {
		if (this.date && this.date.destroy) {
			this.date.destroy()
		}
		if (this.tags && this.tags.destroy) {
			this.tags.destroy()
		}
	}
}
</script>

<style lang="scss" scoped>
	.character-counter {
		float: right;
		font-size: 12px;
	}
</style>