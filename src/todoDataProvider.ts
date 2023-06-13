import * as vscode from 'vscode'
import { getTodoEntries, prettifyPath } from './utils'

const treeDataProvider: vscode.TreeDataProvider<TodoEntry> = {
	getChildren(element) {
		return element
			? undefined
			: getTodoEntries()
	},
	async getTreeItem(element) {
		const treeItem = new vscode.TreeItem(element.todo)
		const fileUri = vscode.Uri.file(element.fileUrl)

		const openSettings: vscode.TextDocumentShowOptions = {
			selection: new vscode.Range(
				new vscode.Position(element.line, 0),
				new vscode.Position(element.line, element.fullLine.length)
			)
		}

		treeItem.tooltip = prettifyPath(element.fileUrl, '\\')
		treeItem.command = {
			command: 'vscode.open',
			title: '',
			arguments: [ fileUri, openSettings ]
		}

		return treeItem
	}
}

export default treeDataProvider