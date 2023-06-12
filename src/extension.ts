import * as vscode from 'vscode'
import * as utils from './utils'

const checkedFiles = ['ts', 'js']

function activate(context: vscode.ExtensionContext) {
	const commandDisposable = vscode.commands.registerCommand('todo', () => {
		vscode.window.showInformationMessage(JSON.stringify(utils.getTodoEntries()))
	})

	context.subscriptions.push(commandDisposable)
}

export {
	checkedFiles,
	activate
}