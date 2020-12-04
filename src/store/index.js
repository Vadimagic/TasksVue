import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		tasks: JSON.parse(localStorage.getItem('tasks') || '[]')
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
		}
	},
	getters: {
		tasks: state => state.tasks,
		taskById: state => id => state.tasks.find(task => task.id === id)
	}
})
