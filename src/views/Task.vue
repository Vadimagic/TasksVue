<template>
	<div class="row">
		<div v-if="task" class="col s6 offset-s3">
			<h1>{{task.title}}</h1>
			<form @submit.prevent="updateTask">
				<div class="chips" ref="chips"></div>

				<div class="input-field">
					<textarea v-model="text" id="description" class="materialize-textarea"></textarea>
					<label for="description" class="active">Текст</label>
				</div>

				<input type="text" class="datepicker" ref="datepicker">

				<button style="margin-right: 2rem" class="btn waves-effect waves-light deep-purple darken-1" type="submit">
					Изменить задание
					<i class="material-icons right">send</i>
				</button>
				<button @click="completeTask" class="btn waves-effect waves-light purple accent-3" type="button">
					Завершить задание
					<i class="material-icons right">sentiment_very_satisfied</i>
				</button>
			</form>
		</div>
		<p v-else>Такой задачи нет</p>
	</div>
</template>

<script>

export default {
	computed: {
		task() {
			return this.$store.getters.taskById(+this.$route.params.id)
		}
	},
	data() {
		return {
			tags: null,
			text: '',
			date: null
		}
	},
	methods: {
		updateTask() {
			this.$store.dispatch('updateTask', {
				id: this.task.id,
				tags: this.tags.chipsData,
				text: this.text,
				date: this.date.date
			});
			this.$router.push('/list')
		},
		completeTask() {
			this.$store.dispathc('completeTask', this.task.id)
			this.$router.push('/list')
		}
	},
	mounted() {
		this.text = this.task.text;
		this.tags = M.Chips.init(this.$refs.chips, {
			placeholder: 'Теги заданий',
			data: this.task.tags
		});
		this.date = M.Datepicker.init(this.$refs.datepicker, {
			format: 'dd.mm.yyyy',
			defaultDate: new Date(this.task.date),
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
