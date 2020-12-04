<template>
	<div class="row">
		<div class="col s6 offset-s3">
			<h1>Список задач</h1>
		</div>
		<table v-if="tasks.length">
			<thead>
				<tr>
					<th>#</th>
					<th>Заголовок</th>
					<th>Текст</th>
					<th>Дата</th>
					<th>Статус</th>
					<th>Открыть</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(task, index) of tasks" :key="task.id">
					<td>{{index}}</td>
					<td>{{task.title}}</td>
					<td><div>{{task.text}}</div></td>
					<td>{{task.date}}</td>
					<td>{{task.status}}</td>
					<td>
						<router-link tag="button" class="btn btn-small deep-purple" :to="'/task/' + task.id">
							Открыть
						</router-link>
					</td>
				</tr>
			</tbody>
		</table>
		<p v-else>Задач нету</p>
	</div>
</template>

<script>

export default {
	name: 'list',
	computed: {
		tasks() {
			return this.$store.getters.tasks
		}
	}
}
</script>
