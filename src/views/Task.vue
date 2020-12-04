<template>
	<div class="row">
		<div v-if="task" class="col s6 offset-s3">
			<h1>{{task.title}}</h1>
			<form @submit.prevent="addTask">
				<div class="chips" ref="chips"></div>

				<div class="input-field">
					<textarea v-model="text" id="description" class="materialize-textarea"></textarea>
					<label for="description">Textarea</label>
				</div>

				<input type="text" class="datepicker" ref="datepicker">

				<button class="btn waves-effect waves-light deep-purple" type="submit" name="action">
					Создать задание
					<i class="material-icons right">send</i>
				</button>
			</form>
		</div>
		<p v-else>Такой задачи нет</p>
	</div>
</template>

<script>

export default {
	data() {
		return {
			tags: null,
			text: '',
			date: null
		}
	},
	methods: {
		addTask() {

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
	},
	computed: {
		task() {
			return this.$store.getters.taskById(+this.$route.params.id)
		}
	}
}
</script>
