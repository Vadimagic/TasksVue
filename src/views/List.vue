<template>
	<div class="row" v-if="tasks.length">
		<div class="col s6 offset-s3">
			<h1>Список задач</h1>

			<select ref="select" v-model="filter">
				<option value="" class="" disabled selected>Выберите опцию по статусу</option>
				<option value="">Все</option>
				<option value="в работе">В работе</option>
				<option value="время вышло">Время вышло</option>
				<option value="выполнено">Выполнено</option>
			</select>

		</div>
		<table>
			<thead>
				<tr>
					<th>#</th>
					<th>Заголовок</th>
					<th>Текст</th>
					<th>Дата</th>
					<th>Статус</th>
					<th>Открыть</th>
					<th>Удалить</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(task, index) of displayTasks" :key="task.id">
					<td>{{index + 1}}</td>
					<td>{{task.title}}</td>
					<td class="td-text"><div class="text">{{task.text}}</div></td>
					<td>{{new Date(task.date).toLocaleDateString()}}</td>
					<td>{{task.status}}</td>
					<td>
						<router-link tag="button" class="btn btn-small deep-purple" :to="'/task/' + task.id">
							Открыть
						</router-link>
					</td>
					<td>
						<button class="btn btn-small red darken-2" @click="deleteTask(task.id)">
							Удалить
						</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	<div v-else class="row">
		<div class="col s6 offset-s3">
			<h1>Задач нет</h1>
		</div>
	</div>
</template>

<script>

export default {
	name: 'list',
	data() {
		return {
			filter: null,
		}
	},
	methods: {
		deleteTask(id) {
			this.$store.dispatch('deleteTask', id)
		}
	},
	computed: {
		tasks() {
			return this.$store.getters.tasks
		},
		displayTasks() {
			this.tasks.sort((a, b) => new Date(a.date) > new Date(b.date) ? 1 : -1)
			return this.tasks.filter(task => {
				if (!this.filter) {
					return true
				}
				return task.status === this.filter
			})
		}
	},
	mounted() {
		M.FormSelect.init(this.$refs.select);
	}
}
</script>

<style lang="scss" scoped>
	.td-text {
		max-width: 400px;
	}
	.text {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
</style>
