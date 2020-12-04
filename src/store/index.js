import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		tasks: JSON.parse(localStorage.getItem('tasks') || '[]').map(task => {
			if (new Date(task.date) < new Date()) {
				task.status = 'время вышло'
			}
			return task
		})
	},
	mutations: {
		addTask(state, task) {
			state.tasks.push(task)
			localStorage.setItem('tasks', JSON.stringify(state.tasks))
		},
		updateTask(state, {id, tags, text, date}) {
			state.tasks = state.tasks.map(task => {
				if (task.id === id) {
					return {
						...task,
						tags,
						text,
						date,
						status: ( new Date(date) > new Date() ) 
							? 'в работе' 
							: 'время вышло'
					}
				}
				return task
			})
			localStorage.setItem('tasks', JSON.stringify(state.tasks))
		},
		completeTask(state, id) {
			state.tasks = state.tasks.map(task => {
				if (task.id === id) {
					return {
						...task,
						status: 'выполнено'
					}
				}
				return task
			})
			localStorage.setItem('tasks', JSON.stringify(state.tasks))
		},
		deleteTask(state, id) {
			state.tasks = state.tasks.filter(task => task.id !== id)
			localStorage.setItem('tasks', JSON.stringify(state.tasks))
		}
	},
	actions: {
		addTask({commit}, task) {
			commit('addTask', task)
		},
		updateTask({commit}, task) {
			commit('updateTask', task)
		},
		completeTask({commit}, id) {
			commit('completeTask', id)
		},
		deleteTask({commit}, id) {
			commit('deleteTask', id)
		}
	},
	getters: {
		tasks: state => state.tasks,
		taskById: state => id => state.tasks.find(task => task.id === id)
	}
})
