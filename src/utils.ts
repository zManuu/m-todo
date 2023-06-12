import * as vscode from 'vscode'
import * as fs from 'fs'
import * as path from 'path'
import { checkedFiles } from './extension'

function getWorkspaceType(): WorkspaceType {
	return vscode.workspace.workspaceFile
		? 'file'
		: vscode.workspace.workspaceFolders
			? 'folder'
			: 'empty'
}

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
	const files = fs.readdirSync(dirPath)

	for (const file of files) {
		if (fs.statSync(dirPath + '/' + file).isDirectory()) {
			if (file === 'node_modules')
				continue

			arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles)
		} else {
			arrayOfFiles.push(path.join(dirPath, '/', file))
		}
	}

	return arrayOfFiles
}

function getWorkspaceFiles(): string[] {
	return vscode.workspace.workspaceFile
		? [ vscode.workspace.workspaceFile.fsPath ]
		: vscode.workspace.workspaceFolders
			? getAllFiles(vscode.workspace.workspaceFolders[0].uri.fsPath)
			: []
}

function getFilteredWorkspaceFiles(): string[] {
	const workspaceFiles = getWorkspaceFiles()
	const res: string[] = []

	for (const fileUrl of workspaceFiles) {
		if (!fileUrl.includes('.'))
			continue

		const fileEnding = fileUrl.split('.')[fileUrl.split('.').length - 1]

		if (!checkedFiles.includes(fileEnding))
			continue
		
		res.push(fileUrl)
	}

	return res
}

function getTodoEntries(): TodoEntry[] {
	const filteredWorkspaceFiles = getFilteredWorkspaceFiles()
	const res: TodoEntry[] = []

	for (const fileUrl of filteredWorkspaceFiles) {
		const fileContent = fs.readFileSync(fileUrl).toString()
		const fileLines = fileContent.split('\n')

		for (let i=0; i<fileLines.length; i++) {
			const fileLine = fileLines[i]

			if (!fileLine.includes('// todo:'))
				continue

			res.push({
				fileUrl,
				fullLine: fileLine,
				line: i + 1,
				todo: fileLine.substring(9)
			})
		}
	}

	return res
}

export {
	getTodoEntries
}