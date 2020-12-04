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
		}
	},
	actions: {
		addTask({commit}, task) {
			commit('addTask', task)
		}
	},
	getters: {
		tasks: state => state.tasks
	}
})
