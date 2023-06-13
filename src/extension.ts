import * as vscode from 'vscode'
import todoDataProvider from './todoDataProvider'

const checkedFiles = ['ts', 'js']

function activate() {
	vscode.window.registerTreeDataProvider('m-todo-explorer', todoDataProvider)
	vscode.window.createTreeView('m-todo-explorer', {
		treeDataProvider: todoDataProvider
	})
}

export {
	checkedFiles,
	activate
}