import * as vscode from 'vscode'
import TodoDataProvider from './todoDataProvider'

const checkedFiles = ['ts', 'js']
const todoDataProvider = new TodoDataProvider()

function activate() {
	vscode.window.registerTreeDataProvider('m-todo-explorer', todoDataProvider)
	vscode.window.createTreeView('m-todo-explorer', {
		treeDataProvider: todoDataProvider
	})

	vscode.workspace.onDidSaveTextDocument(() => todoDataProvider.refresh())
	vscode.workspace.onDidDeleteFiles(() => todoDataProvider.refresh())
}

export {
	checkedFiles,
	activate
}