// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

import { newGetxGetBuilderCommonPage } from "./commands/getx-common-page.command";
import { newGetxGetBuilderCommonBasePage } from "./commands/getx-common-base-page.command";

// import { commands, ExtensionContext, languages, workspace } from "vscode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  // console.log('Congratulations, your extension "getx-template" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  // let disposable = vscode.commands.registerCommand('getx-template.helloWorld', () => {
  // 	// The code you place here will be executed every time your command is executed

  // 	// Display a message box to the user
  // 	vscode.window.showInformationMessage('Hello World from getx template!');
  // });
  // context.subscriptions.push(disposable);

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "extension.getx-common-page",
      newGetxGetBuilderCommonPage
    ),
    vscode.commands.registerCommand(
      "extension.getx-common-base-page",
      newGetxGetBuilderCommonBasePage
    )
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
