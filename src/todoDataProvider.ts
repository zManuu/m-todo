import * as vscode from 'vscode'
import { getTodoEntries, getFilePath } from './utils'
import path from 'path'

export default class TreeDataProvider implements vscode.TreeDataProvider<TodoEntry> {

	getChildren(element: Nullable<TodoEntry>) {
		return element
			? undefined
			: getTodoEntries()
	}

	getTreeItem(element: TodoEntry) {
		const treeItem = new vscode.TreeItem(element.todo)
		const fileUri = vscode.Uri.file(element.fileUrl)
	
		const openSettings: vscode.TextDocumentShowOptions = {
			selection: new vscode.Range(
				new vscode.Position(element.line, 0),
				new vscode.Position(element.line, element.fullLine.length)
			)
		}
	
		treeItem.tooltip = getFilePath(element.fileUrl)
		treeItem.iconPath = path.join(__filename, '..', '..', 'resources', 'icon.png')
		treeItem.command = {
			command: 'vscode.open',
			title: '',
			arguments: [ fileUri, openSettings ]
		}
	
		return treeItem
	}

	private changeEvent = new vscode.EventEmitter<void>()

	public get onDidChangeTreeData(): vscode.Event<void> {
		return this.changeEvent.event
	}

	public refresh() {
		this.changeEvent.fire()
	}

}