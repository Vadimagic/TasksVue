<template>
	<div class="row">
		<div v-if="task" class="col s6 offset-s3">
			<h1>{{task.title}}</h1>
			<form @submit.prevent="updateTask">
				<div class="chips" ref="chips"></div>

				<div class="input-field">
					<textarea v-model="text" id="description" class="materialize-textarea"></textarea>
					<label for="description" class="active">Текст</label>
					<span class="character-counter" style="float: right">{{checkLengthText()}}/{{lengthText}}</span>
				</div>

				<input type="text" class="datepicker" ref="datepicker">

				<div v-if="task.status !== 'выполнено'">
					<button style="margin-right: 2rem" class="btn waves-effect waves-light deep-purple darken-1" type="submit">
					Изменить задание
					<i class="material-icons right">send</i>
					</button>
					<button v-if="task.status !== 'время вышло'" @click="completeTask" class="btn waves-effect waves-light purple accent-3" type="button">
						Завершить задание
						<i class="material-icons right">sentiment_very_satisfied</i>
					</button>
				</div>
				<button v-if="task.status === 'выполнено' || task.status === 'время вышло'" @click="deleteTask" style="margin-top: 30px" class="btn waves-effect waves-light red darken-4" type="button">
					Удалить {{task.status === 'выполнено' ? 'выполненное' :  ''}} задание
					<i class="material-icons right">delete_forever</i>
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
			this.$store.dispatch('completeTask', this.task.id)
			this.$router.push('/list')
		},
		deleteTask() {
			this.$store.dispatch('deleteTask', this.task.id)
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
