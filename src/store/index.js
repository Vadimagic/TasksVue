import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		tasks: JSON.parse(localStorage.getItem('tasks') || '[]')
	},
	mutations: {
		addTask(state, task) {
			localStorage.setItem('tasks', JSON.stringify(task))
			state.tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
		}
	},
	actions: {
		addTask({commit}, task) {
			commit('addTask', task)
		}
	},
	modules: {
	}
})
